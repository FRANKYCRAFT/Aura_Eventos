package mx.aura.eventos.service;

import mx.aura.eventos.model.Usuario;

public interface AuthService {

    Usuario login(String email, String password);

    Usuario registrar(String nombre, String apellidos, String email,
                      String password, String telefono);

    String solicitarRecuperacion(String email);

    void verificarCodigo(String email, String codigo);

    void restablecerPassword(String email, String codigo, String nuevaPassword);

    String resetPorAdmin(String usuarioId);
}
