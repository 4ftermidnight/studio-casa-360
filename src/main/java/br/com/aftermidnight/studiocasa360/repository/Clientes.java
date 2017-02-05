package br.com.aftermidnight.studiocasa360.repository;


import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aftermidnight.studiocasa360.model.Cliente;
import br.com.aftermidnight.studiocasa360.repository.helper.cliente.ClientesQueries;


@Repository
public interface Clientes extends Serializable, JpaRepository<Cliente, Long>, ClientesQueries {
	
	public Optional<Cliente> findByCpfOuCnpj(String cpfOuCnpj); //o framework já vai criar a consulta para buscar pelo atributo CPFOuCNPJ

	public List<Cliente> findByNomeStartingWithIgnoreCase(String nome);

}
