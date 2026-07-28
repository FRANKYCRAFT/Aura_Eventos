package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.service.AuthService;
import mx.aura.eventos.service.UsuarioService;

public class UsuarioHandler extends BaseHandler {

    private final UsuarioService usuarioService;
    private final AuthService authService;

    public UsuarioHandler(UsuarioService usuarioService, AuthService authService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
    }

    @Override
    protected void process(HttpExchange ex) throws Exception {
        // 1. Validar Token JWT (Punto 4 de la tarea)
        String authHeader = ex.getRequestHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            sendError(ex, 401, "No estás autenticado (falta el token JWT).");
            return;
        }

        String token = authHeader.substring(7);
        boolean tokenValido = authService.validarToken(token);
        if (!tokenValido) {
            sendError(ex, 401, "Token inválido o expirado.");
            return;
        }

        // 2. Lógica normal si el token es válido
        String metodo = ex.getRequestMethod();
        if ("GET".equalsIgnoreCase(metodo)) {
            sendJson(ex, 200, usuarioService.listarTodos());
        } else {
            metodoNoPermitido(ex);
        }
    }
}
