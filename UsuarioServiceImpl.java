package mx.aura.eventos.dao;

import mx.aura.eventos.model.Categoria;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CategoriaDao {

    private Categoria map(ResultSet rs) throws SQLException {
        return new Categoria(rs.getInt("id"), rs.getString("nombre"));
    }

    public List<Categoria> todas(Connection con) throws SQLException {
        List<Categoria> lista = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM categorias ORDER BY nombre");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(map(rs));
        }
        return lista;
    }

    public Optional<Categoria> porId(Connection con, int id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM categorias WHERE id = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(map(rs)) : Optional.empty();
            }
        }
    }

    public boolean existeNombre(Connection con, String nombre) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT 1 FROM categorias WHERE LOWER(nombre) = LOWER(?)")) {
            ps.setString(1, nombre);
            try (ResultSet rs = ps.executeQuery()) { return rs.next(); }
        }
    }

    public Categoria insertar(Connection con, String nombre) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "INSERT INTO categorias (nombre) VALUES (?)", Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, nombre);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                keys.next();
                return new Categoria(keys.getInt(1), nombre);
            }
        }
    }

    public void eliminar(Connection con, int id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("DELETE FROM categorias WHERE id = ?")) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }

    public long articulosQueLaUsan(Connection con, int id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT COUNT(*) FROM articulos WHERE categoria_id = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return rs.getLong(1);
            }
        }
    }
}
