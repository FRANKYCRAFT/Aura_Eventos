package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.model.Categoria;
import mx.aura.eventos.service.CategoriaService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CategoriaHandler extends BaseHandler {

    private final CategoriaService categoriaService;

    public CategoriaHandler(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @Override
    protected void process(HttpExchange ex) throws Exception {
        String[] p = subPath(ex, "/api/categorias");
        String metodo = ex.getRequestMethod();

        if ("GET".equals(metodo) && p.length == 0) {
            List<Object> lista = new ArrayList<>();
            for (Categoria c : categoriaService.listar()) lista.add(c.toMap());
            sendJson(ex, 200, lista);
            return;
        }
        if ("POST".equals(metodo) && p.length == 0) {
            Map<String, Object> body = readJsonBody(ex);
            Categoria c = categoriaService.crear(str(body, "nombre"));
            sendJson(ex, 201, c.toMap());
            return;
        }
        if ("DELETE".equals(metodo) && p.length == 1) {
            categoriaService.eliminar(Integer.parseInt(p[0]));
            sendJson(ex, 200, exito("Categoría eliminada.", null));
            return;
        }

        metodoNoPermitido(ex);
    }
}
