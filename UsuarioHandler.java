package mx.aura.eventos.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Solicitud {

    public enum Estado { pendiente, aprobado, rechazado }

    private String id;
    private Usuario cliente;
    private LocalDate fechaEvento;
    private LocalDate fechaFin;
    private BigDecimal subtotal;
    private BigDecimal iva;
    private BigDecimal flete;
    private BigDecimal total;
    private Estado estado = Estado.pendiente;
    private String direccion;
    private String notas;
    private String motivoRechazo;
    private LocalDateTime creadoEn;
    private LocalDateTime aprobadoEn;
    private final List<SolicitudArticulo> articulos = new ArrayList<>();

    public Solicitud() { }

    public void agregarArticulo(SolicitudArticulo renglon) {
        articulos.add(renglon);
    }

    public Map<String, Object> toMap() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", id);
        m.put("cliente", cliente != null ? cliente.toMap() : null);
        m.put("fechaEvento", fechaEvento != null ? fechaEvento.toString() : null);
        m.put("fechaFin", fechaFin != null ? fechaFin.toString() : null);
        m.put("subtotal", subtotal);
        m.put("iva", iva);
        m.put("flete", flete);
        m.put("total", total);
        m.put("estado", estado);
        m.put("direccion", direccion);
        m.put("notas", notas);
        m.put("motivoRechazo", motivoRechazo);
        m.put("creadoEn", creadoEn != null ? creadoEn.toString() : null);
        m.put("aprobadoEn", aprobadoEn != null ? aprobadoEn.toString() : null);
        List<Object> arts = new ArrayList<>();
        for (SolicitudArticulo r : articulos) arts.add(r.toMap());
        m.put("articulos", arts);
        return m;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Usuario getCliente() { return cliente; }
    public void setCliente(Usuario cliente) { this.cliente = cliente; }

    public LocalDate getFechaEvento() { return fechaEvento; }
    public void setFechaEvento(LocalDate fechaEvento) { this.fechaEvento = fechaEvento; }

    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getIva() { return iva; }
    public void setIva(BigDecimal iva) { this.iva = iva; }

    public BigDecimal getFlete() { return flete; }
    public void setFlete(BigDecimal flete) { this.flete = flete; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }

    public String getMotivoRechazo() { return motivoRechazo; }
    public void setMotivoRechazo(String motivoRechazo) { this.motivoRechazo = motivoRechazo; }

    public LocalDateTime getCreadoEn() { return creadoEn; }
    public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }

    public LocalDateTime getAprobadoEn() { return aprobadoEn; }
    public void setAprobadoEn(LocalDateTime aprobadoEn) { this.aprobadoEn = aprobadoEn; }

    public List<SolicitudArticulo> getArticulos() { return articulos; }
}
