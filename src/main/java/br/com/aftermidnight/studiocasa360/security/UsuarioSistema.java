package br.com.aftermidnight.studiocasa360.security;


import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import br.com.aftermidnight.studiocasa360.model.Usuario;


public class UsuarioSistema extends org.springframework.security.core.userdetails.User {
	private static final long serialVersionUID = 1L;

	private Usuario usuario;
	
	public UsuarioSistema(Usuario usuario, Collection<? extends GrantedAuthority> authorities) {
		super(usuario.getNome(), usuario.getSenha(), authorities);
		this.usuario = usuario;
	}

	public Usuario getUsuario() {
		return usuario;
	}
	
	

	

}
