package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import mx.aura.eventos.exception.NegocioException;
import mx.aura.eventos.exception.RecursoNoEncontradoException;
import mx.aura.eventos.json.Json;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

public abstract class BaseHandler implements HttpHandler {

    private static final String CORS_ORIGINS = System.getenv().getOrDefault(
            "AURA_CORS_ORIGINS", "*");

    @Override
    public final void handle(HttpExchange ex) throws IOException {
        try {
            aplicarCors(ex);
            if ("OPTIONS".equalsIgnoreCase(ex.getRequestMethod())) {
                ex.sendResponseHeaders(204, -1);
                return;
            }
            process(ex);
        } catch (NegocioException e) {
            sendError(ex, 400, e.getMessage());
        } catch (RecursoNoEncontradoException e) {
            sendError(ex, 404, e.getMessage());
        } catch (IllegalArgumentException e) {
            sendError(ex, 400, "Petición inválida: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            sendError(ex, 500, "Ocurrió un error interno. Intenta de nuevo más tarde.");
        } finally {
            ex.close();
        }
    }

    protected abstract void process(HttpExchange ex) throws Exception;

    private void aplicarCors(HttpExchange ex) {
        ex.getResponseHeaders().set("Access-Control-Allow-Origin", CORS_ORIGINS);
        ex.getResponseHeaders().set("Access-Control-Allow-Methods",
                "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        ex.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
    }

    protected String[] subPath(HttpExchange ex, String contexto) {
        String path = ex.getRequestURI().getPath();
        String resto = path.substring(contexto.length());
        if (resto.startsWith("/")) resto = resto.substring(1);
        return resto.isEmpty() ? new String[0] : resto.split("/");
    }

    protected Map<String, String> queryParams(HttpExchange ex) {
        Map<String, String> map = new LinkedHashMap<>();
        String q = ex.getRequestURI().getQuery();
        if (q == null) return map;
        for (String par : q.split("&")) {
            int eq = par.indexOf('=');
            if (eq > 0) {
                String k = java.net.URLDecoder.decode(par.substring(0, eq), StandardCharsets.UTF_8);
                String v = java.net.URLDecoder.decode(par.substring(eq + 1), StandardCharsets.UTF_8);
                map.put(k, v);
            }
        }
        return map;
    }

    protected Map<String, Object> readJsonBody(HttpExchange ex) throws IOException {
        try (InputStream in = ex.getRequestBody()) {
            String body = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            if (body.isBlank()) return new LinkedHashMap<>();
            return Json.parseObject(body);
        }
    }

    protected void sendJson(HttpExchange ex, int status, Object payload) throws IOException {
        byte[] bytes = Json.write(payload).getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        ex.sendResponseHeaders(status, bytes.length);
        try (OutputStream out = ex.getResponseBody()) {
            out.write(bytes);
        }
    }

    protected void sendError(HttpExchange ex, int status, String mensaje) throws IOException {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("ok", false);
        body.put("error", mensaje);
        sendJson(ex, status, body);
    }

    protected Map<String, Object> exito(String mensaje, Object dato) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("ok", true);
        body.put("mensaje", mensaje);
        if (dato != null) body.put("dato", dato);
        return body;
    }

    protected void metodoNoPermitido(HttpExchange ex) throws IOException {
        sendError(ex, 405, "Método no permitido para esta ruta.");
    }

    protected String str(Map<String, Object> body, String key) {
        Object v = body.get(key);
        return v == null ? null : v.toString();
    }
}
