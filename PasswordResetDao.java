package mx.aura.eventos.model;

import java.time.LocalDateTime;

public class PasswordReset {

    private Integer id;
    private String usuarioId;
    private String codigo;
    private LocalDateTime expiraEn;
    private boolean usado;

    public PasswordReset() { }

    public PasswordReset(String usuarioId, String codigo, LocalDateTime expiraEn) {
        this.usuarioId = usuarioId;
        this.codigo = codigo;
        this.expiraEn = expiraEn;
    }

    public boolean esValido() {
        return !usado && LocalDateTime.now().isBefore(expiraEn);
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getUsuarioId() { return usuarioId; }
    public void setUsuarioId(String usuarioId) { this.usuarioId = usuarioId; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public LocalDateTime getExpiraEn() { return expiraEn; }
    public void setExpiraEn(LocalDateTime expiraEn) { this.expiraEn = expiraEn; }

    public boolean isUsado() { return usado; }
    public void setUsado(boolean usado) { this.usado = usado; }
}
