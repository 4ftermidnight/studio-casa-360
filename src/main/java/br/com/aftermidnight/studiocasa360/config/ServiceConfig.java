package br.com.aftermidnight.studiocasa360.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import br.com.aftermidnight.studiocasa360.service.CadastroClienteService;


@Configuration
@ComponentScan(basePackageClasses = { CadastroClienteService.class  })
public class ServiceConfig {

	
}
