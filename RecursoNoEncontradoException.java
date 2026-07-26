package mx.aura.eventos.model;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

public class Articulo {

    public enum Estado { activo, deshabilitado }

    private String id;
    private String sku;
    private String nombre;
    private Categoria categoria;
    private String descripcion;
    private BigDecimal precio;
    private int stockTotal;
    private Estado estado = Estado.activo;
    private String dimensiones;
    private String material;
    private String incluye;
    private String pesoMax;
    private BigDecimal rating = new BigDecimal("5.0");
    private int reviews;
    private String imagenUrl;

    private Integer stockDisponible;
    private Integer rentados;
    private Boolean stockBajo;

    public Articulo() { }

    public Map<String, Object> toMap() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", id);
        m.put("sku", sku);
        m.put("nombre", nombre);
        m.put("categoria", categoria != null ? categoria.toMap() : null);
        m.put("descripcion", descripcion);
        m.put("precio", precio);
        m.put("stockTotal", stockTotal);
        m.put("estado", estado);
        m.put("dimensiones", dimensiones);
        m.put("material", material);
        m.put("incluye", incluye);
        m.put("pesoMax", pesoMax);
        m.put("rating", rating);
        m.put("reviews", reviews);
        m.put("imagenUrl", imagenUrl);
        m.put("stockDisponible", stockDisponible);
        m.put("rentados", rentados);
        m.put("stockBajo", stockBajo);
        return m;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public int getStockTotal() { return stockTotal; }
    public void setStockTotal(int stockTotal) { this.stockTotal = stockTotal; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }

    public String getDimensiones() { return dimensiones; }
    public void setDimensiones(String dimensiones) { this.dimensiones = dimensiones; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public String getIncluye() { return incluye; }
    public void setIncluye(String incluye) { this.incluye = incluye; }

    public String getPesoMax() { return pesoMax; }
    public void setPesoMax(String pesoMax) { this.pesoMax = pesoMax; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public int getReviews() { return reviews; }
    public void setReviews(int reviews) { this.reviews = reviews; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Integer getStockDisponible() { return stockDisponible; }
    public void setStockDisponible(Integer stockDisponible) { this.stockDisponible = stockDisponible; }

    public Integer getRentados() { return rentados; }
    public void setRentados(Integer rentados) { this.rentados = rentados; }

    public Boolean getStockBajo() { return stockBajo; }
    public void setStockBajo(Boolean stockBajo) { this.stockBajo = stockBajo; }
}
