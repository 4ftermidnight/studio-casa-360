package br.com.aftermidnight.studiocasa360.model.validation;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.spi.group.DefaultGroupSequenceProvider;

import br.com.aftermidnight.studiocasa360.model.Cliente;

public class ClienteGroupSequenceProvider implements DefaultGroupSequenceProvider<Cliente>{

	@Override
	public List<Class<?>> getValidationGroups(Cliente cliente) {
		List<Class<?>> gruposParaValidar = new ArrayList<>();
	
		//para validar os atributos sem grupos especificados
		gruposParaValidar.add(Cliente.class);

		if(isPessoaSelecionada(cliente)){
			gruposParaValidar.add(cliente.getTipoPessoa().getGrupoValidacao());
		}

		return gruposParaValidar;
	}

	private boolean isPessoaSelecionada(Cliente cliente) {
		return cliente != null && cliente.getTipoPessoa() != null;
	}

}
