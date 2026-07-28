package mx.aura.eventos.service;

import mx.aura.eventos.dao.Database;
import mx.aura.eventos.dao.UsuarioDao;
import mx.aura.eventos.exception.NegocioException;
import mx.aura.eventos.model.Usuario;
import mx.aura.eventos.util.PasswordHasher;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

public class AuthServiceImpl implements AuthService {

    private final UsuarioDao usuarioDao;

    public AuthServiceImpl(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    @Override
    public Map<String, Object> login(String email, String password) throws Exception {
        try (Connection con = Database.getConnection()) {
            // 1. Buscar usuario en la BD
            Usuario usuario = usuarioDao.porEmail(con, email)
                    .orElseThrow(() -> new NegocioException("Credenciales inválidas."));

            // 2. Validar contraseña hash
            boolean valida = PasswordHasher.verify(password, usuario.getPasswordHash());
            if (!valida) {
                throw new NegocioException("Credenciales inválidas.");
            }

            // 3. Generar token con datos del usuario
            String token = GeneradorToken.generarToken(usuario);

            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            data.put("usuario", Map.of(
                    "id", usuario.getId(),
                    "nombre", usuario.getNombre(),
                    "email", usuario.getEmail(),
                    "rol", usuario.getRol().name()
            ));

            return data;
        }
    }
}
