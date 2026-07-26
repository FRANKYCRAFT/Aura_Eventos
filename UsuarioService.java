package mx.aura.eventos.dao;

import mx.aura.eventos.model.PasswordReset;

import java.sql.*;
import java.util.Optional;

public class PasswordResetDao {

    public void insertar(Connection con, PasswordReset pr) throws SQLException {
        String sql = "INSERT INTO password_resets (usuario_id, codigo, expira_en) VALUES (?, ?, ?)";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, pr.getUsuarioId());
            ps.setString(2, pr.getCodigo());
            ps.setTimestamp(3, Timestamp.valueOf(pr.getExpiraEn()));
            ps.executeUpdate();
        }
    }

    public Optional<PasswordReset> ultimo(Connection con, String usuarioId, String codigo) throws SQLException {
        String sql = """
            SELECT * FROM password_resets
            WHERE usuario_id = ? AND codigo = ?
            ORDER BY creado_en DESC LIMIT 1""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, usuarioId);
            ps.setString(2, codigo);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) return Optional.empty();
                PasswordReset pr = new PasswordReset();
                pr.setId(rs.getInt("id"));
                pr.setUsuarioId(rs.getString("usuario_id"));
                pr.setCodigo(rs.getString("codigo"));
                pr.setExpiraEn(rs.getTimestamp("expira_en").toLocalDateTime());
                pr.setUsado(rs.getBoolean("usado"));
                return Optional.of(pr);
            }
        }
    }

    public void marcarUsado(Connection con, int id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "UPDATE password_resets SET usado = 1 WHERE id = ?")) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}
