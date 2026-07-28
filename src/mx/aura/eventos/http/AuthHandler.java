package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.service.AuthService;

import java.util.Map;

public class AuthHandler extends BaseHandler {

    private final AuthService authService;

    public AuthHandler(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void process(HttpExchange ex) throws Exception {
        String metodo = ex.getRequestMethod();

        if ("POST".equalsIgnoreCase(metodo)) {
            Map<String, Object> body = readJsonBody(ex);

            String email = str(body, "email");
            if (email == null) {
                email = str(body, "username");
            }
            String password = str(body, "password");

            if (email == null || email.isBlank() || password == null || password.isBlank()) {
                sendError(ex, 400, "Debes proporcionar email/usuario y contraseña.");
                return;
            }

            // Llamada al servicio para verificar usuario/password y generar token
            Map<String, Object> respuesta = authService.login(email, password);

            sendJson(ex, 200, exito("Inicio de sesión exitoso", respuesta));
        } else {
            metodoNoPermitido(ex);
        }
    }
}
