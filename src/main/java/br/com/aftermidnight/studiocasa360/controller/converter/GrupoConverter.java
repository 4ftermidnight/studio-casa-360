package br.com.aftermidnight.studiocasa360.controller.converter;


import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

import br.com.aftermidnight.studiocasa360.model.Grupo;


public class GrupoConverter implements Converter<String, Grupo> {

	@Override
	public Grupo convert(String source) {
		Grupo obj = new Grupo();
		
		if(StringUtils.isEmpty(source)) return null;
		
		obj.setCodigo(Long.valueOf(source));
		return obj;
	}



}
