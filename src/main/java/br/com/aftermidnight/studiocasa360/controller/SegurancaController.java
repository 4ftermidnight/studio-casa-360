package br.com.aftermidnight.studiocasa360.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SegurancaController {

	@GetMapping("/login")
	public String login(@AuthenticationPrincipal User user){ //@AuthenticationPrincipal injeta o usuário logado
		if (user != null){
			return "redirect:/dashboard";
		}
		return "Login";
	}
	

}
