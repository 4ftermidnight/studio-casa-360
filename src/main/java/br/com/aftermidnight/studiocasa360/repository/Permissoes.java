package br.com.aftermidnight.studiocasa360.repository;


import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aftermidnight.studiocasa360.model.Permissao;


@Repository
public interface Permissoes extends Serializable, JpaRepository<Permissao, Long> {

}
