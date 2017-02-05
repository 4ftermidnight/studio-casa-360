package br.com.aftermidnight.studiocasa360.repository;


import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aftermidnight.studiocasa360.model.Cidade;
import br.com.aftermidnight.studiocasa360.repository.helper.cidade.CidadesQueries;


@Repository
public interface Cidades extends Serializable, JpaRepository<Cidade, Long>, CidadesQueries {

	public List<Cidade> findByEstadoCodigo(Long codigoEstado);

}
