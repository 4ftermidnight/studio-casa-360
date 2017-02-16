AfterMidnight = AfterMidnight || {}


AfterMidnight.Calendar = (function (){
	
	function Calendar(){
		this.calendar = $('#calendar');
			
		this.btnPrev = $('.calendar-prev');
		this.btnNext = $('.calendar-next');
		
		this.formEvent = $('.form-event');
		
		this.modalNewEvent = $('#modal-new-event');
		this.newEventTitle = $('#new-event-title');
		this.newEventHour = $('#new-event-hour')
		this.newEventDataInicio = $('#new-event-start');
		this.newEventDataFim = $('#new-event-end');
		
		this.btnConfirmar = $('#btn-add-event');
		this.eventName = $('#event-name');
		
		this.modalEditEvent = $('#modal-edit-event');
		this.eventEditId = $('.edit-event-id');
		this.eventEditTitle = $('.edit-event-title');
		this.eventEditHour = $('.edit-event-hour');
		
		this.btnUpdateOrDelete = $('[data-calendar]');
		this.btnSwitchView = $('[data-calendar-view]');
		
		this.MAX_EVENTS_A_DAY = 4;
		
		this.modalLogin = $('#modalLogin');
		this.btnModalLogin = $('#barraNavegacaoBtnLogin');
		
	}
	
	Calendar.prototype.iniciar = function(){
			
		this.calendar.fullCalendar({
            header: {
                right: '',
                center: '',
                left: ''
            },

            theme: false,
            selectable: true,
            selectHelper: true,
            editable: true,
            weekends: true,
            displayEventTime : true,
            displayEventEnd : true,
            
            events: carregarEventosJaExistentes(),

            dayClick: onDayClick.bind(this),

            viewRender: onViewRender.bind(this),

            eventClick: onEventClick.bind(this)
            
            //,hiddenDays: [ 2, 4 ]
            
       });
		
		
		this.btnPrev.on('click', onBtnPrevClicado.bind(this));
		this.btnNext.on('click', onBtnNextClicado.bind(this));
		this.btnConfirmar.on('click', onBtnConfirmarClicado.bind(this));
		this.btnUpdateOrDelete.on('click', onBtnUpdateOrDeleteClicado.bind(this));
		this.btnSwitchView.on('click', onBtnSwitchViewClicado.bind(this));
	}
	
	function onEventClick(event, element){
//		console.log(event);
		if(1===2/* TODO: usuario não está logado*/){
			onUsuarioNaoLogado.call(this, 'Gentileza efetue login para cancelar um agendamento');
			return;
		}
		
		if(1===2/* TODO: usuario não dono do evento nem administrador*/){
			swal(
                    'Ação não permitida!',
                    'Você não pode alterar este evento pois não possui permissão',
                    'error'
                );
			return;
		}
		
		this.eventEditId.val(event.id);
        this.eventEditTitle.val(event.title);
        this.eventEditHour.val(event.hour);
        this.modalEditEvent.modal('show');
	}
	
	
	function onViewRender(view){
		 var calendarDate = this.calendar.fullCalendar('getDate');
         var calendarMonth = calendarDate.month();
         var calendarToolbar = $(this.calendar).find('.fc-toolbar');
         
         //Set data attribute for header. This is used to switch header images using css
         calendarToolbar.attr('data-calendar-month', calendarMonth);
         	
         //Set title in page header
         $('.block-header-calendar > h2 > span').html(view.title);
	}
	
	function onDayClick(date){
		
		if(1===2/* TODO: usuario não está logado*/){
			onUsuarioNaoLogado.call(this, 'Gentileza efetue login para efetuar um agendamento');
			return;
		}
		
		 var isoDate = moment(date).toISOString();

         var eventosByDateOnly = getEventsByDateOnly.call(this, date);
         
         if(eventosByDateOnly.length === this.MAX_EVENTS_A_DAY){
        	 swal(
                     'Dia não disponível!',
                     'Infelizmente não há mais horário disponível para este dia. Você pode tentar outro.',
                     'warning'
           		);
         } else {
        	 
        	 this.modalNewEvent.modal('show');
             this.eventName.val('');
             this.newEventDataInicio.val(isoDate);
             this.newEventDataFim.val(isoDate);
             this.newEventHour.focus(); 
         }
         
	}
	
	function onBtnPrevClicado(event){
		event.preventDefault();
		var target = $(event.currentTarget);
		this.calendar.fullCalendar('prev');
	}
	
	function onBtnNextClicado(event){
		event.preventDefault();
		var target = $(event.currentTarget);
		this.calendar.fullCalendar('next');
	}
	
	function onBtnConfirmarClicado(event){
		event.preventDefault();
		var target = $(event.currentTarget);
		
		var eventTitle = $('#new-event-title').val(); //TODO: Usuário Logado
		var eventHour = $('#new-event-hour').val();
		
//		console.log('onBtnConfirmarClicado', eventTitle, eventHour);
		
 
        var GenRandom =  {
             Stored: [],
             Job: function(){
                 var newId = Date.now().toString().substr(6); // or use any method that you want to achieve this string
 
                 if( !this.Check(newId) ){
                     this.Stored.push(newId);
                     return newId;
                 }
                 return this.Job();
             },
	             Check: function(id){
	                 for( var i = 0; i < this.Stored.length; i++ ){
	                     if( this.Stored[i] == id ) return true;
	                 }
	                 return false;
	             }
	         };
 
         if (eventTitle != '') {
        	 
        	var novoEvento = construirEvento.call(this,GenRandom.Job()/*id*/,
					eventTitle /*title*/,
					eventHour/*faixa de hora*/,
					this.newEventDataInicio.val(),
					this.newEventDataFim.val(),
					false /*allDay*/,
					true /*isOwner*/);
        	
        	
        	// verificar se o evento já existe no calendário
    		var evento = getEventsByDateAndTime.call(this, novoEvento.start);
    		
    		if(evento == null){
	         	this.calendar.fullCalendar('renderEvent', novoEvento, true);
	            $(this.formEvent)[0].reset();
	            this.modalNewEvent.modal('hide');
	            $(this.newEventTitle).closest('.form-group').removeClass('has-error');

    		} else{
        		swal(
                  'Horário não disponível!',
                  'Alguem já agendou esse horário',
                  'warning'
        		);
        	}
        }
         
	}
	
	
	function onBtnUpdateOrDeleteClicado(event){
		var botaoClicado = $(event.target);
		var calendarAction = botaoClicado.data('calendar');
		
		var currentId = $('.edit-event-id').val();
		var currentTitle = $('.edit-event-title').val();
		var currentHour = $('.edit-event-hour').val();
		var currentEvent = $(this.calendar).fullCalendar( 'clientEvents', currentId );

		
	      //Update
	      if(calendarAction === 'update') {
	          if (currentTitle != '') {
	              currentEvent[0].title = currentTitle;
	              currentEvent[0].hour = currentHour;
	
	              $(this.calendar).fullCalendar('updateEvent', currentEvent[0]);
	              $(this.modalEditEvent).modal('hide');
	          }
	          else {
	              $(this.eventEditTitle).closest('.form-group').addClass('has-error');
	              $(this.eventEditTitle).focus();
	          }
	      }
	
	      //Delete
	      if(calendarAction === 'delete') {
	          $(this.modalEditEvent).modal('hide');
	
	          setTimeout(function () {
	              swal({
	                  title: 'Tem Certeza que deseja cancelar seu agendamento?',
	                  text: "Não será possível reverter, talvez esse horário não esteja disponível depois.",
	                  type: 'warning',
	                  showCancelButton: true,
	                  confirmButtonColor: '#3085d6',
	                  cancelButtonColor: '#d33',
	                  cancelButtonText: 'Não',
	                  confirmButtonText: 'Sim, tenho certeza!'
	              }).then(function() {
	                  this.calendar.fullCalendar('removeEvents', currentId);
	                  swal(
	                      'Agendamento Cancelado!',
	                      'Seu agendamento foi cancelado com sucesso.',
	                      'success'
	                  );
	              }.bind(this))
	          }.bind(this), 200);
	      }
		
	}
	

	
	function onBtnSwitchViewClicado(event){
		//Calendar views switch
		event.preventDefault();
		
		var botaoClicado = $(event.target);
		
		$(this.btnSwitchView).removeClass('active');
		$(botaoClicado).addClass('active');
		
		var calendarView = $(botaoClicado).attr('data-calendar-view');
		this.calendar.fullCalendar('changeView', calendarView);
	}
	
	
	function onUsuarioNaoLogado(msg){
		swal({
            title:'Não Logado!',
            text: msg,
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Entendi!'
		}).then(function(){
        	this.btnModalLogin.trigger('click');
        }.bind(this)).bind(this);
		return;

	}
	
	/*************
	 * UTIL
	 ***********/
		
	function construirEvento(id, title, hour, start, end, allDay, isOwner){
		
		var h = hour.substring(0,2);
		var m = hour.substring(3,5);
		start = moment(start).hour(h).minute(m);

//		09:00 às 10:00
		h = hour.substring(9,11);
		m = hour.substring(13,15);
		end = moment(end).hour(h).minute(m);
		
		var evento = {
			 id: id,
	         title: title,
	         hour: hour, 
	         start: start,
	         end:  end,
	         allDay: allDay,
	         className: (isOwner)?'bgm-blue' : 'bgm-red' ,
	         editable:false,
	         overlap:false
		};
		
		return evento;

	}
	
	
	function carregarEventosJaExistentes(){
		 var date = new Date();
		 var m = date.getMonth();
		 var y = date.getFullYear();
		 
		 
		 var dados = 
			
		[ //id, title, hour, start, end, allDay, isOwner
		 construirEvento(1,
				 'Não disponível',
				 '08:00 às 11:00',
				 new Date(y, m, 1, 08, 0, 0, 0),
				 new Date(y, m, 1,11,0,0,0,0),
				 false,
				 false
		 ),
		 construirEvento(2,
				 'Não disponível',
				 '16:00 às 18:30',
				 new Date(y, m, 2, 16, 0, 0, 0),
				 new Date(y, m, 2,18,30,0,0,0),
				 false,
				 false
		 ),
		 construirEvento(3,
				 'Não disponível',
				 '16:00 às 18:30',
				 new Date(y, m, 9, 16, 0, 0, 0),
				 new Date(y, m, 9,18,30,0,0,0),
				 false,
				 false
		 ),
		 construirEvento(4,
				 'Não disponível',
				 '16:00 às 18:30',
				 new Date(y, m, 18, 16, 0, 0, 0),
				 new Date(y, m, 18,18,30,0,0,0),
				 false,
				 false
		 ),

		 ];
		
		return dados;
	}
	
	function getEventsByDateAndTime(date){
		var eventosJaCadastrados = this.calendar.fullCalendar( 'clientEvents');
		var evento = null;
		
		eventosJaCadastrados.forEach(function(e){
			if(moment(date).toISOString() === moment(e.start).toISOString()) {
				evento = e;
				return;
			}
		});
		
		return evento;
    }
	
	function getEventsByDateOnly(date){
		var eventosJaCadastrados = this.calendar.fullCalendar( 'clientEvents');
		var eventos = [];
		
		eventosJaCadastrados.forEach(function(e){
			var d1 = moment(date).format("YYYY-MM-DD");
			var d2 = moment(e.start).format("YYYY-MM-DD");
			
			if(d1 == d2) {
				eventos.push(e);
			}
		});
		
		return eventos;
    }
	
	
	
	

	return Calendar;
	
}());


$(function(){
	var calendar = new AfterMidnight.Calendar();
	calendar.iniciar();

	
});