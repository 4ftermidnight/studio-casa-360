package br.com.aftermidnight.studiocasa360.repository;


import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aftermidnight.studiocasa360.model.Usuario;
import br.com.aftermidnight.studiocasa360.repository.helper.usuario.UsuariosQueries;

public interface Usuarios extends Serializable, JpaRepository<Usuario, Long>, UsuariosQueries {

	public Optional<Usuario> findByEmailIgnoreCase(String email);

	public List<Usuario> findByCodigoIn(Long[] codigos);

}
