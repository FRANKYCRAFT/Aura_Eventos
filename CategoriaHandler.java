package mx.aura.eventos.dao;

import mx.aura.eventos.model.*;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SolicitudDao {

    private final UsuarioDao usuarioDao = new UsuarioDao();
    private final ArticuloDao articuloDao = new ArticuloDao();

    private Solicitud mapCabecera(Connection con, ResultSet rs) throws SQLException {
        Solicitud s = new Solicitud();
        s.setId(rs.getString("id"));
        s.setFechaEvento(rs.getDate("fecha_evento").toLocalDate());
        s.setFechaFin(rs.getDate("fecha_fin").toLocalDate());
        s.setSubtotal(rs.getBigDecimal("subtotal"));
        s.setIva(rs.getBigDecimal("iva"));
        s.setFlete(rs.getBigDecimal("flete"));
        s.setTotal(rs.getBigDecimal("total"));
        s.setEstado(Solicitud.Estado.valueOf(rs.getString("estado")));
        s.setDireccion(rs.getString("direccion"));
        s.setNotas(rs.getString("notas"));
        s.setMotivoRechazo(rs.getString("motivo_rechazo"));
        Timestamp c = rs.getTimestamp("creado_en");
        if (c != null) s.setCreadoEn(c.toLocalDateTime());
        Timestamp a = rs.getTimestamp("aprobado_en");
        if (a != null) s.setAprobadoEn(a.toLocalDateTime());

        usuarioDao.porId(con, rs.getString("cliente_id")).ifPresent(s::setCliente);
        cargarRenglones(con, s);
        return s;
    }

    private void cargarRenglones(Connection con, Solicitud s) throws SQLException {
        String sql = "SELECT * FROM solicitud_articulos WHERE solicitud_id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, s.getId());
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    SolicitudArticulo r = new SolicitudArticulo();
                    r.setId(rs.getInt("id"));
                    r.setCantidad(rs.getInt("cantidad"));
                    r.setPrecioUnitario(rs.getBigDecimal("precio_unitario"));
                    articuloDao.porId(con, rs.getString("articulo_id")).ifPresent(r::setArticulo);
                    s.agregarArticulo(r);
                }
            }
        }
    }

    public List<Solicitud> todas(Connection con) throws SQLException {
        List<Solicitud> lista = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM solicitudes ORDER BY creado_en DESC");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapCabecera(con, rs));
        }
        return lista;
    }

    public List<Solicitud> porCliente(Connection con, String clienteId) throws SQLException {
        List<Solicitud> lista = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM solicitudes WHERE cliente_id = ? ORDER BY creado_en DESC")) {
            ps.setString(1, clienteId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) lista.add(mapCabecera(con, rs));
            }
        }
        return lista;
    }

    public Optional<Solicitud> porId(Connection con, String id) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM solicitudes WHERE id = ?")) {
            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(mapCabecera(con, rs)) : Optional.empty();
            }
        }
    }

    public boolean existeFolio(Connection con, String folio) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("SELECT 1 FROM solicitudes WHERE id = ?")) {
            ps.setString(1, folio);
            try (ResultSet rs = ps.executeQuery()) { return rs.next(); }
        }
    }

    public int unidadesOcupadas(Connection con, String articuloId,
                                LocalDate fecha, LocalDate fechaFin) throws SQLException {
        String sql = """
            SELECT COALESCE(SUM(sa.cantidad), 0)
            FROM solicitud_articulos sa
            JOIN solicitudes s ON s.id = sa.solicitud_id
            WHERE sa.articulo_id = ?
              AND s.estado = 'aprobado'
              AND s.fecha_evento <= ?
              AND s.fecha_fin    >= ?""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, articuloId);
            ps.setDate(2, Date.valueOf(fechaFin));
            ps.setDate(3, Date.valueOf(fecha));
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return rs.getInt(1);
            }
        }
    }

    public void insertarCabecera(Connection con, Solicitud s) throws SQLException {
        String sql = """
            INSERT INTO solicitudes
              (id, cliente_id, fecha_evento, fecha_fin, subtotal, iva, flete, total,
               estado, direccion, notas)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, s.getId());
            ps.setString(2, s.getCliente().getId());
            ps.setDate(3, Date.valueOf(s.getFechaEvento()));
            ps.setDate(4, Date.valueOf(s.getFechaFin()));
            ps.setBigDecimal(5, s.getSubtotal());
            ps.setBigDecimal(6, s.getIva());
            ps.setBigDecimal(7, s.getFlete());
            ps.setBigDecimal(8, s.getTotal());
            ps.setString(9, s.getEstado().name());
            ps.setString(10, s.getDireccion());
            ps.setString(11, s.getNotas());
            ps.executeUpdate();
        }
    }

    public void insertarRenglon(Connection con, String solicitudId, SolicitudArticulo r) throws SQLException {
        String sql = """
            INSERT INTO solicitud_articulos (solicitud_id, articulo_id, cantidad, precio_unitario)
            VALUES (?, ?, ?, ?)""";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, solicitudId);
            ps.setString(2, r.getArticulo().getId());
            ps.setInt(3, r.getCantidad());
            ps.setBigDecimal(4, r.getPrecioUnitario());
            ps.executeUpdate();
        }
    }

    public void aprobar(Connection con, Solicitud s) throws SQLException {
        String sql = "UPDATE solicitudes SET estado = 'aprobado', flete = ?, total = ?, aprobado_en = NOW() WHERE id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setBigDecimal(1, s.getFlete());
            ps.setBigDecimal(2, s.getTotal());
            ps.setString(3, s.getId());
            ps.executeUpdate();
        }
    }

    public void rechazar(Connection con, String id, String motivo) throws SQLException {
        String sql = "UPDATE solicitudes SET estado = 'rechazado', motivo_rechazo = ? WHERE id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, motivo);
            ps.setString(2, id);
            ps.executeUpdate();
        }
    }
}
