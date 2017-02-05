package br.com.aftermidnight.studiocasa360.repository;


import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aftermidnight.studiocasa360.model.Evento;


@Repository
public interface Eventos extends Serializable, JpaRepository<Evento, Long> {

}
