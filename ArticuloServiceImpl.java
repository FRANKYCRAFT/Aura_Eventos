package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.model.Solicitud;
import mx.aura.eventos.service.SolicitudService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SolicitudHandler extends BaseHandler {

    private final SolicitudService solicitudService;

    public SolicitudHandler(SolicitudService solicitudService) {
        this.solicitudService = solicitudService;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void process(HttpExchange ex) throws Exception {
        String[] p = subPath(ex, "/api/solicitudes");
        String metodo = ex.getRequestMethod();

        if ("GET".equals(metodo) && p.length == 0) {
            sendJson(ex, 200, aLista(solicitudService.listarTodas()));
            return;
        }

        if ("GET".equals(metodo) && p.length == 2 && "cliente".equals(p[0])) {
            sendJson(ex, 200, aLista(solicitudService.listarPorCliente(p[1])));
            return;
        }

        if ("GET".equals(metodo) && p.length == 1) {
            sendJson(ex, 200, solicitudService.porId(p[0]).toMap());
            return;
        }

        if ("POST".equals(metodo) && p.length == 0) {
            Map<String, Object> body = readJsonBody(ex);
            LocalDate fecha    = body.get("fecha") != null ? LocalDate.parse(str(body, "fecha")) : null;
            LocalDate fechaFin = body.get("fechaFin") != null ? LocalDate.parse(str(body, "fechaFin")) : null;
            List<Map<String, Object>> renglones =
                    (List<Map<String, Object>>) (List<?>) body.get("articulos");

            Solicitud s = solicitudService.crear(
                    str(body, "clienteId"), fecha, fechaFin,
                    str(body, "direccion"), str(body, "notas"), renglones);
            sendJson(ex, 201, s.toMap());
            return;
        }

        if ("PATCH".equals(metodo) && p.length == 2 && "aprobar".equals(p[1])) {
            Map<String, Object> body = readJsonBody(ex);
            BigDecimal flete = body.get("flete") != null
                    ? new BigDecimal(str(body, "flete")) : null;
            sendJson(ex, 200, solicitudService.aprobar(p[0], flete).toMap());
            return;
        }

        if ("PATCH".equals(metodo) && p.length == 2 && "rechazar".equals(p[1])) {
            Map<String, Object> body = readJsonBody(ex);
            sendJson(ex, 200, solicitudService.rechazar(p[0], str(body, "motivo")).toMap());
            return;
        }

        metodoNoPermitido(ex);
    }

    private List<Object> aLista(List<Solicitud> sols) {
        List<Object> lista = new ArrayList<>();
        for (Solicitud s : sols) lista.add(s.toMap());
        return lista;
    }
}
