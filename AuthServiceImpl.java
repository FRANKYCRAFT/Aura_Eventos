package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.model.Usuario;
import mx.aura.eventos.service.AuthService;
import mx.aura.eventos.service.UsuarioService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UsuarioHandler extends BaseHandler {

    private final UsuarioService usuarioService;
    private final AuthService authService;

    public UsuarioHandler(UsuarioService usuarioService, AuthService authService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
    }

    @Override
    protected void process(HttpExchange ex) throws Exception {
        String[] p = subPath(ex, "/api/usuarios");
        String metodo = ex.getRequestMethod();

        if ("GET".equals(metodo) && p.length == 1 && "clientes".equals(p[0])) {
            List<Object> lista = new ArrayList<>();
            for (Usuario u : usuarioService.clientes()) lista.add(u.toMap());
            sendJson(ex, 200, lista);
            return;
        }

        if ("PUT".equals(metodo) && p.length == 1) {
            Map<String, Object> body = readJsonBody(ex);
            Usuario u = usuarioService.actualizarPerfil(
                    p[0], str(body, "nombre"), str(body, "apellidos"), str(body, "telefono"));
            sendJson(ex, 200, u.toMap());
            return;
        }

        if ("POST".equals(metodo) && p.length == 2 && "change-password".equals(p[1])) {
            Map<String, Object> body = readJsonBody(ex);
            usuarioService.cambiarPassword(p[0], str(body, "actual"), str(body, "nueva"));
            sendJson(ex, 200, exito("Contraseña actualizada correctamente.", null));
            return;
        }

        if ("POST".equals(metodo) && p.length == 2 && "reset-password".equals(p[1])) {
            String temporal = authService.resetPorAdmin(p[0]);
            sendJson(ex, 200, exito("Contraseña temporal generada.",
                    Map.of("tempPassword", temporal)));
            return;
        }

        metodoNoPermitido(ex);
    }
}
