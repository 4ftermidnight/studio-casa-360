package br.com.aftermidnight.studiocasa360.repository.helper.cidade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.aftermidnight.studiocasa360.model.Cidade;
import br.com.aftermidnight.studiocasa360.repository.filter.CidadeFilter;


public interface CidadesQueries {

	public Page<Cidade> filtrar(CidadeFilter filtro, Pageable pageable);
	
	public Cidade buscarComEstado(Long codigo);
}
