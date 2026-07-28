package mx.aura.eventos.dao;

import mx.aura.eventos.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UsuarioDao {

    private Usuario map(ResultSet rs) throws SQLException {
        Usuario u = new Usuario();
        u.setId(rs.getString("id"));
        u.setNombre(rs.getString("nombre"));
        u.setApellidos(rs.getString("apellidos"));
        u.setEmail(rs.getString("email"));
        u.setPasswordHash(rs.getString("password_hash"));
        u.setRol(Usuario.Rol.valueOf(rs.getString("rol")));
        u.setAvatar(rs.getString("avatar"));
        u.setTelefono(rs.getString("telefono"));
        return u;
    }

    public Optional<Usuario> porEmail(Connection con, String email) throws SQLException {
        String sql = "SELECT * FROM usuarios WHERE LOWER(email) = LOWER(?)";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(map(rs)) : Optional.empty();
            }
        }
    }

    public Optional<Usuario> porId(Connection con, String id) throws SQLException {
        String sql = "SELECT * FROM usuarios WHERE id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(map(rs)) : Optional.empty();
            }
        }
    }

    public boolean existeEmail(Connection con, String email) throws SQLException {
        String sql = "SELECT 1 FROM usuarios WHERE LOWER(email) = LOWER(?)";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) { return rs.next(); }
        }
    }

    public List<Usuario> clientes(Connection con) throws SQLException {
        String sql = "SELECT * FROM usuarios WHERE rol = 'cliente' ORDER BY nombre";
        List<Usuario> lista = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(map(rs));
        }
        return lista;
    }

    public void insertar(Connection con, Usuario u) throws SQLException {
        String sql = """
            INSERT INTO usuarios (id, nombre, apellidos, email, password_hash, rol, avatar, telefono)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, u.getId());
            ps.setString(2, u.getNombre());
            ps.setString(3, u.getApellidos());
            ps.setString(4, u.getEmail());
            ps.setString(5, u.getPasswordHash());
            ps.setString(6, u.getRol().name());
            ps.setString(7, u.getAvatar());
            ps.setString(8, u.getTelefono());
            ps.executeUpdate();
        }
    }

    public void actualizarPerfil(Connection con, Usuario u) throws SQLException {
        String sql = "UPDATE usuarios SET nombre = ?, apellidos = ?, telefono = ?, avatar = ? WHERE id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, u.getNombre());
            ps.setString(2, u.getApellidos());
            ps.setString(3, u.getTelefono());
            ps.setString(4, u.getAvatar());
            ps.setString(5, u.getId());
            ps.executeUpdate();
        }
    }

    public void actualizarPassword(Connection con, String usuarioId, String nuevoHash) throws SQLException {
        String sql = "UPDATE usuarios SET password_hash = ? WHERE id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, nuevoHash);
            ps.setString(2, usuarioId);
            ps.executeUpdate();
        }
    }
}
