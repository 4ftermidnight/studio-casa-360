package br.com.aftermidnight.studiocasa360.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.aftermidnight.studiocasa360.model.Evento;
import br.com.aftermidnight.studiocasa360.service.CadastroEventoService;


@Controller
@RequestMapping("/evento")
public class EventoController {

	
	private CadastroEventoService eventoService;
	
	public List<Evento> carregarEventos(){
		List<Evento> eventos = new ArrayList<>();
		return eventos;
	}
	
}
