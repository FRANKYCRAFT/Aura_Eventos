package mx.aura.eventos.dao;

import mx.aura.eventos.model.Articulo;
import mx.aura.eventos.model.Categoria;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ArticuloDao {

    private static final String SELECT_BASE = """
        SELECT a.*, c.id AS cat_id, c.nombre AS cat_nombre
        FROM articulos a
        JOIN categorias c ON c.id = a.categoria_id""";

    private Articulo map(ResultSet rs) throws SQLException {
        Articulo a = new Articulo();
        a.setId(rs.getString("id"));
        a.setSku(rs.getString("sku"));
        a.setNombre(rs.getString("nombre"));
        a.setCategoria(new Categoria(rs.getInt("cat_id"), rs.getString("cat_nombre")));
        a.setDescripcion(rs.getString("descripcion"));
        a.setPrecio(rs.getBigDecimal("precio"));
        a.setStockTotal(rs.getInt("stock_total"));
        a.setEstado(Articulo.Estado.valueOf(rs.getString("estado")));
        a.setDimensiones(rs.getString("dimensiones"));
        a.setMaterial(rs.getString("material"));
        a.setIncluye(rs.getString("incluye"));
        a.setPesoMax(rs.getString("peso_max"));
        a.setRating(rs.getBigDecimal("rating"));
        a.setReviews(rs.getInt("reviews"));
        a.setImagenUrl(rs.getString("imagen_url"));
        return a;
    }

    public List<Articulo> todos(Connection con, boolean soloActivos) throws SQLException {
        String sql = SELECT_BASE + (soloActivos ? " WHERE a.estado = 'activo'" : "") + " ORDER BY a.nombre";
        List<Articulo> lista = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(map(rs));
        }
        return lista;
    }

    public Optional<Articulo> porId(Connection con, String id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(SELECT_BASE + " WHERE a.id = ?")) {
            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(map(rs)) : Optional.empty();
            }
        }
    }

    public boolean existeSku(Connection con, String sku) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT 1 FROM articulos WHERE LOWER(sku) = LOWER(?)")) {
            ps.setString(1, sku);
            try (ResultSet rs = ps.executeQuery()) { return rs.next(); }
        }
    }

    public void insertar(Connection con, Articulo a) throws SQLException {
        String sql = """
            INSERT INTO articulos
              (id, sku, nombre, categoria_id, descripcion, precio, stock_total,
               estado, dimensiones, material, incluye, peso_max, rating, reviews, imagen_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, a.getId());
            ps.setString(2, a.getSku());
            ps.setString(3, a.getNombre());
            ps.setInt(4, a.getCategoria().getId());
            ps.setString(5, a.getDescripcion());
            ps.setBigDecimal(6, a.getPrecio());
            ps.setInt(7, a.getStockTotal());
            ps.setString(8, a.getEstado().name());
            ps.setString(9, a.getDimensiones());
            ps.setString(10, a.getMaterial());
            ps.setString(11, a.getIncluye());
            ps.setString(12, a.getPesoMax());
            ps.setBigDecimal(13, a.getRating());
            ps.setInt(14, a.getReviews());
            ps.setString(15, a.getImagenUrl());
            ps.executeUpdate();
        }
    }

    public void actualizar(Connection con, Articulo a) throws SQLException {
        String sql = """
            UPDATE articulos SET nombre = ?, categoria_id = ?, descripcion = ?, precio = ?,
              stock_total = ?, dimensiones = ?, material = ?, incluye = ?, peso_max = ?, imagen_url = ?
            WHERE id = ?""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, a.getNombre());
            ps.setInt(2, a.getCategoria().getId());
            ps.setString(3, a.getDescripcion());
            ps.setBigDecimal(4, a.getPrecio());
            ps.setInt(5, a.getStockTotal());
            ps.setString(6, a.getDimensiones());
            ps.setString(7, a.getMaterial());
            ps.setString(8, a.getIncluye());
            ps.setString(9, a.getPesoMax());
            ps.setString(10, a.getImagenUrl());
            ps.setString(11, a.getId());
            ps.executeUpdate();
        }
    }

    public void cambiarEstado(Connection con, String id, Articulo.Estado estado) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("UPDATE articulos SET estado = ? WHERE id = ?")) {
            ps.setString(1, estado.name());
            ps.setString(2, id);
            ps.executeUpdate();
        }
    }

    public void eliminar(Connection con, String id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("DELETE FROM articulos WHERE id = ?")) {
            ps.setString(1, id);
            ps.executeUpdate();
        }
    }

    public boolean tieneHistorial(Connection con, String articuloId) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT 1 FROM solicitud_articulos WHERE articulo_id = ? LIMIT 1")) {
            ps.setString(1, articuloId);
            try (ResultSet rs = ps.executeQuery()) { return rs.next(); }
        }
    }
}
