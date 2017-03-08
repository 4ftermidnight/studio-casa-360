AfterMidnight = AfterMidnight || {}


AfterMidnight.Scroller = (function (){
	
	function Scroller(){
		this.ativadores = $(".js-scroll-animate");
		this.__SCROLL_ID_TARGET_PARAM = 'stargetp';
		
		this.paramIdTarget = getUrlParameter(this.__SCROLL_ID_TARGET_PARAM);
		
	}
	
	Scroller.prototype.iniciar = function(event){
		this.ativadores.on('click', onAtivadorClicado.bind(this));
		
		if(this.paramIdTarget){
			console.log('existe paramIdTarget:' + this.paramIdTarget);
			var currentPathname = window.location.pathname;
			handleAction.call(this,currentPathname, currentPathname, this.paramIdTarget);
		}
	}
	
	function onAtivadorClicado(event){
		event.preventDefault();
		var target = $(event.currentTarget);
		
		var idTarget = target.data('scroll-idtarget');
		var linkTo = target.attr('href');
		
		//http://stackoverflow.com/questions/406192/get-current-url-in-javascript
		
		var currentUrl = window.location.href; // /ebook?teste=1 (exemplo.com/ebook?teste=1)
		var currentPathname = window.location.pathname; // /ebook (exemplo.com/ebook?teste=1)
		
		console.log('currentUrl: ',currentUrl);
		console.log('linkTo: ',linkTo);
		console.log('currentPathname: ',currentPathname);
		console.log('paramIdTarget: ',this.paramIdTarget);
		console.log('paramIdTarget==null: ',this.paramIdTarget==null);
		
		handleAction.call(this,linkTo, currentPathname, idTarget);
		
	}
	
	function handleAction(linkTo, currentPathname, idTarget){
		if(linkTo === currentPathname){
//			console.log('estou no mesmo lugar (linkTo === currentPathname)',currentPathname);
			goToById('#'+idTarget);
		} else {
			//Enviar para o local certo com o parametro informando
			linkTo = putParamsOnLinkTo.call(this, linkTo, idTarget);
			window.location.replace(linkTo);// navegar para link correto
		}
	}
	
	function goToById(idTarget){
		$('html,body').animate({scrollTop: $(idTarget).offset().top -69}, 1000);
	}
	
	function putParamsOnLinkTo(linkTo,idTarget){
		return addUrlParam(linkTo,this.__SCROLL_ID_TARGET_PARAM, idTarget.replace('#',''));
	}

	function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	}
	
	/**
	* Add a URL parameter (or changing it if it already exists)
	* @param {search} string  this is typically document.location.search
	* @param {key}    string  the key to set
	* @param {val}    string  value 
	*/
	function addUrlParam(search, key, val){
	  var newParam = key + '=' + val,
	      params = '?' + newParam;

	  // If the "search" string exists, then build params from it
	  if (search) {
	    // Try to replace an existance instance
		  
//		var key = getUrlParameter(key);
//		if(key){
//			return;
//		}else{
//			
//		}
		
		
		
		console.log(search);

	    params = search.replace(new RegExp('([?&])' + key + '[^&]*'), '$1' + newParam);

	    // If nothing was replaced, then add the new param to the end
	    if (params === search) {
	    	params += '?' + newParam;
	    }else{
	    	
	    }
	    	console.log('params: ', params)
	  }

	  return params;
	}
	
	return Scroller;
	
}());


$(function(){
	var scroller = new AfterMidnight.Scroller();
	scroller.iniciar();
	
});