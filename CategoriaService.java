package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.exception.NegocioException;
import mx.aura.eventos.model.Articulo;
import mx.aura.eventos.service.ArticuloService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ArticuloHandler extends BaseHandler {

    private final ArticuloService articuloService;

    public ArticuloHandler(ArticuloService articuloService) {
        this.articuloService = articuloService;
    }

    @Override
    protected void process(HttpExchange ex) throws Exception {
        String[] p = subPath(ex, "/api/articulos");
        String metodo = ex.getRequestMethod();
        Map<String, String> q = queryParams(ex);

        if ("GET".equals(metodo) && p.length == 0) {
            sendJson(ex, 200, aLista(articuloService.listar(true)));
            return;
        }

        if ("GET".equals(metodo) && p.length == 1 && "admin".equals(p[0])) {
            sendJson(ex, 200, aLista(articuloService.listar(false)));
            return;
        }

        if ("GET".equals(metodo) && p.length == 2 && "disponibilidad".equals(p[1])) {
            LocalDate fecha    = LocalDate.parse(q.get("fecha"));
            LocalDate fechaFin = q.containsKey("fechaFin") ? LocalDate.parse(q.get("fechaFin")) : null;
            int cantidad       = Integer.parseInt(q.getOrDefault("cantidad", "1"));
            boolean disp = articuloService.disponibleParaFecha(p[0], fecha, fechaFin, cantidad);
            sendJson(ex, 200, Map.of("disponible", disp));
            return;
        }

        if ("GET".equals(metodo) && p.length == 1) {
            sendJson(ex, 200, articuloService.porId(p[0]).toMap());
            return;
        }

        if ("POST".equals(metodo) && p.length == 0) {
            int categoriaId = requiereCategoria(q);
            Articulo a = articuloService.crear(readJsonBody(ex), categoriaId);
            sendJson(ex, 201, a.toMap());
            return;
        }

        if ("PUT".equals(metodo) && p.length == 1) {
            Integer categoriaId = q.containsKey("categoriaId")
                    ? Integer.parseInt(q.get("categoriaId")) : null;
            Articulo a = articuloService.actualizar(p[0], readJsonBody(ex), categoriaId);
            sendJson(ex, 200, a.toMap());
            return;
        }

        if ("PATCH".equals(metodo) && p.length == 2) {
            switch (p[1]) {
                case "habilitar" -> {
                    articuloService.habilitar(p[0]);
                    sendJson(ex, 200, exito("Artículo habilitado.", null));
                }
                case "deshabilitar" -> {
                    articuloService.deshabilitar(p[0]);
                    sendJson(ex, 200, exito("Artículo deshabilitado.", null));
                }
                default -> sendError(ex, 404, "Ruta no encontrada.");
            }
            return;
        }

        if ("DELETE".equals(metodo) && p.length == 1) {
            articuloService.eliminar(p[0]);
            sendJson(ex, 200, exito("Artículo eliminado.", null));
            return;
        }

        metodoNoPermitido(ex);
    }

    private int requiereCategoria(Map<String, String> q) {
        String v = q.get("categoriaId");
        if (v == null) throw new NegocioException("Falta el parámetro categoriaId.");
        return Integer.parseInt(v);
    }

    private List<Object> aLista(List<Articulo> articulos) {
        List<Object> lista = new ArrayList<>();
        for (Articulo a : articulos) lista.add(a.toMap());
        return lista;
    }
}
