package mx.aura.eventos.model;

import java.util.LinkedHashMap;
import java.util.Map;

public class Usuario {

    public enum Rol { admin, cliente }

    private String id;
    private String nombre;
    private String apellidos;
    private String email;
    private String passwordHash;
    private Rol rol = Rol.cliente;
    private String avatar;
    private String telefono;

    public Usuario() { }

    public Usuario(String id, String nombre, String apellidos, String email,
                   String passwordHash, Rol rol, String avatar, String telefono) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.passwordHash = passwordHash;
        this.rol = rol;
        this.avatar = avatar;
        this.telefono = telefono;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", id);
        m.put("nombre", nombre);
        m.put("apellidos", apellidos);
        m.put("email", email);
        m.put("rol", rol);
        m.put("avatar", avatar);
        m.put("telefono", telefono);
        return m;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}
