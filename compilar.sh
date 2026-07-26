package mx.aura.eventos.service;

import mx.aura.eventos.model.Usuario;
import java.util.List;

public interface UsuarioService {

    List<Usuario> clientes();

    Usuario actualizarPerfil(String usuarioId, String nombre, String apellidos, String telefono);

    void cambiarPassword(String usuarioId, String actual, String nueva);
}
