package br.com.aftermidnight.studiocasa360.controller.converter;


import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

import br.com.aftermidnight.studiocasa360.model.Estado;


public class EstadoConverter implements Converter<String, Estado> {

	@Override
	public Estado convert(String source) {
		Estado estado = new Estado();
		
		if(StringUtils.isEmpty(source)) return null;
		
		estado.setCodigo(Long.valueOf(source));
		return estado;
	}



}
