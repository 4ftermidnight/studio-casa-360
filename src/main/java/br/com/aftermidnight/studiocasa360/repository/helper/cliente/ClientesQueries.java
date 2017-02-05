package br.com.aftermidnight.studiocasa360.repository.helper.cliente;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.aftermidnight.studiocasa360.model.Cliente;
import br.com.aftermidnight.studiocasa360.repository.filter.ClienteFilter;


public interface ClientesQueries {
	
	public Page<Cliente> filtrar(ClienteFilter filtro, Pageable pageable);
	
	public Cliente buscarComCidadeEstado(Long codigo);
}

