package mx.aura.eventos.service;

import mx.aura.eventos.dao.UsuarioDao;
import mx.aura.eventos.db.Database;
import mx.aura.eventos.exception.NegocioException;
import mx.aura.eventos.exception.RecursoNoEncontradoException;
import mx.aura.eventos.model.Usuario;
import mx.aura.eventos.security.PasswordHasher;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioDao usuarioDao = new UsuarioDao();

    @Override
    public List<Usuario> clientes() {
        try (Connection con = Database.getConnection()) {
            return usuarioDao.clientes(con);
        } catch (SQLException e) {
            throw new RuntimeException("Error de base de datos al listar clientes.", e);
        }
    }

    @Override
    public Usuario actualizarPerfil(String usuarioId, String nombre, String apellidos, String telefono) {
        if (nombre == null || nombre.isBlank())
            throw new NegocioException("El nombre es requerido.");

        try (Connection con = Database.getConnection()) {
            Usuario u = usuarioDao.porId(con, usuarioId)
                    .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado."));

            u.setNombre(nombre.trim());
            u.setApellidos(apellidos != null ? apellidos.trim() : null);
            u.setTelefono(telefono);
            String n = u.getNombre().substring(0, 1);
            String a = (u.getApellidos() != null && !u.getApellidos().isBlank())
                    ? u.getApellidos().substring(0, 1) : "";
            u.setAvatar((n + a).toUpperCase());

            usuarioDao.actualizarPerfil(con, u);
            return u;
        } catch (SQLException e) {
            throw new RuntimeException("Error de base de datos al actualizar el perfil.", e);
        }
    }

    @Override
    public void cambiarPassword(String usuarioId, String actual, String nueva) {
        if (nueva == null || nueva.length() < 6)
            throw new NegocioException("La nueva contraseña debe tener al menos 6 caracteres.");

        try (Connection con = Database.getConnection()) {
            Usuario u = usuarioDao.porId(con, usuarioId)
                    .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado."));
            if (!PasswordHasher.verify(actual, u.getPasswordHash()))
                throw new NegocioException("La contraseña actual es incorrecta.");
            usuarioDao.actualizarPassword(con, usuarioId, PasswordHasher.hash(nueva));
        } catch (SQLException e) {
            throw new RuntimeException("Error de base de datos al cambiar la contraseña.", e);
        }
    }
}
