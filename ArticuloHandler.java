package mx.aura.eventos.model;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

public class SolicitudArticulo {

    private Integer id;
    private Articulo articulo;
    private int cantidad = 1;
    private BigDecimal precioUnitario;

    public SolicitudArticulo() { }

    public SolicitudArticulo(Articulo articulo, int cantidad, BigDecimal precioUnitario) {
        this.articulo = articulo;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal importe() {
        return precioUnitario.multiply(BigDecimal.valueOf(cantidad));
    }

    public Map<String, Object> toMap() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("articulo", articulo != null ? articulo.toMap() : null);
        m.put("cantidad", cantidad);
        m.put("precioUnitario", precioUnitario);
        return m;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Articulo getArticulo() { return articulo; }
    public void setArticulo(Articulo articulo) { this.articulo = articulo; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
}
