package mx.aura.eventos.http;

import com.sun.net.httpserver.HttpExchange;
import mx.aura.eventos.model.Usuario;
import mx.aura.eventos.service.AuthService;

import java.util.Map;

public class AuthHandler extends BaseHandler {

    private final AuthService authService;

    public AuthHandler(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void process(HttpExchange ex) throws Exception {
        String[] p = subPath(ex, "/api/auth");
        String metodo = ex.getRequestMethod();

        if (!"POST".equals(metodo) || p.length != 1) { metodoNoPermitido(ex); return; }
        Map<String, Object> body = readJsonBody(ex);

        switch (p[0]) {
            case "login" -> {
                Usuario u = authService.login(str(body, "email"), str(body, "password"));
                sendJson(ex, 200, u.toMap());
            }
            case "registro" -> {
                Usuario u = authService.registrar(
                        str(body, "nombre"), str(body, "apellidos"),
                        str(body, "email"), str(body, "password"), str(body, "telefono"));
                sendJson(ex, 201, u.toMap());
            }
            case "forgot-password" -> {
                String codigo = authService.solicitarRecuperacion(str(body, "email"));
                sendJson(ex, 200, exito("Código de verificación generado. Revisa tu correo.",
                        Map.of("codigoDemo", codigo)));
            }
            case "verify-reset-code" -> {
                authService.verificarCodigo(str(body, "email"), str(body, "codigo"));
                sendJson(ex, 200, exito("Código válido.", null));
            }
            case "reset-password" -> {
                authService.restablecerPassword(
                        str(body, "email"), str(body, "codigo"), str(body, "nuevaPassword"));
                sendJson(ex, 200, exito("Contraseña actualizada correctamente.", null));
            }
            default -> sendError(ex, 404, "Ruta no encontrada.");
        }
    }
}
