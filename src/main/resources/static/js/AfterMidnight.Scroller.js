AfterMidnight = AfterMidnight || {}


AfterMidnight.Scroller = (function (){
	
	function Scroller(){
		this.ativadores = $(".js-scroll-animate");
	}
	
	Scroller.prototype.iniciar = function(event){
		this.ativadores.on('click', onAtivadorClicado.bind(this));
	}
	
	function onAtivadorClicado(event){
		event.preventDefault();
		var target = $(event.currentTarget);
		
		var link = target.data('scroll-target');
		$('html,body').animate({scrollTop: $(link).offset().top -69}, 1000);
	}

	return Scroller;
	
}());


$(function(){
	var scroller = new AfterMidnight.Scroller();
	scroller.iniciar();
	
});