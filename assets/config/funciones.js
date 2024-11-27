var unidadActiva=1;
var totalUnidades='';
var seccion=1;
var subSeccion=1;

$(document).ready(function(){ 

	$(".franjaGrisHeader").html(nombreCurso);


	$(window).on('resize', function() { 
        if(screen.width>800){
			$("#botonMenuLateralIndex").hide();
			$("#botonMenuLateralPracticas").hide();
    		$("#botonMenuLateralActividades").hide();
        	$("#botonMenuLateralDevolverIndex").hide();
        	$("#botonMenuLateralIndex").hide();
			$(".botonMenuLateralIndex").hide();
			$("#menu-container").css("left","0%");
				
		}else{
			var activeState = $("#menu-container .menu-list").hasClass("active");
    
    		if(!activeState){
    			$("#menu-container").css("left","-100%");			
    			$("#botonMenuLateralIndex").show();			
				$("#botonMenuLateralPracticas").hide();
    			$("#botonMenuLateralActividades").hide();        		    			
        		$("#botonMenuLateralDevolverIndex").hide();
    		}else{
    			$("#menu-container").css("left","0%");			
				$("#botonMenuLateralIndex").hide();			
    			$("#botonMenuLateralPracticas").show();
    			$("#botonMenuLateralActividades").show();        	
        		$("#botonMenuLateralDevolverIndex").show();        		
			}
		}
	});

	if(indexPag==2){
		//Aquí se crean todas las pantallas en los li por id del opcionesMenu
		for(i=0;i<opcionesMenu.length;i++){
			for(j=2;j<opcionesMenu[i].length;j++)
				$("#pantallasListaIndividual").append('<li id="'+opcionesMenu[i][j].id+'" style="'+((i==0 && j==2)?'':'display:none')+'"></li>');
		}

		if(getParameterByName('seccion')!=""){
			seccion = getParameterByName('seccion');
			audioSeccionActual=opcionesMenu[seccion-1][parseInt(subSeccion)+1].audio;
			idSeccionActual=opcionesMenu[seccion-1][parseInt(subSeccion)+1].id;
			habilitarPantalla(idSeccionActual,audioSeccionActual);
		}

		$(".textoFranjaHeader").html(nombreUnidad);
		totalUnidades=opcionesMenu[seccion-1].length-2; 
		barraProgreso(1);
		var audio = document.getElementById("audioLabs");
		audio.onended = function() { 
			/*$("#playFooter").removeClass("conectado");
        	$("#playFooter").addClass("noconectado");
		    $("#playFooter").css({"background-image":"url(assets/img/play.svg)"});    */
		    $("#playFooter").removeClass("conectado");
   			$("#playFooter").addClass("noconectado");
        	$("#playFooter").css({"background-image":"url(assets/img/play.svg)"})    
        	
        	
		};
	}

	$("#izquierdaFooter").hide();			
	$("#nombreCurso").html(nombreCurso);
	crearMenu((indexPag==1)?'':'Unidad');
	crearContenidoUnidad(1,1);
	crearGlosario();
 	$("#botonActividades").addClass("buttonUnidadAmarillo");
    $("#botonObjetivos").addClass("buttonUnidadAmarillo");
    $("#topUnidad").html(nombreUnidad);

    $("#botonObjetivos").click(function(){
    	$("#botonObjetivos").addClass("buttonUnidadAmarillo");
    	$("#botonContenido").removeClass("buttonUnidadAmarillo");
    	$("#botonMetodologia").removeClass("buttonUnidadAmarillo");
    	crearContenidoUnidad(1);
	});

	$("#botonContenido").click(function(){
    	$("#botonObjetivos").removeClass("buttonUnidadAmarillo");
    	$("#botonContenido").addClass("buttonUnidadAmarillo");
    	$("#botonMetodologia").removeClass("buttonUnidadAmarillo");
		crearContenidoUnidad(2);
	});

	$("#botonMetodologia").click(function(){
    	$("#botonObjetivos").removeClass("buttonUnidadAmarillo");
    	$("#botonContenido").removeClass("buttonUnidadAmarillo");
    	$("#botonMetodologia").addClass("buttonUnidadAmarillo");
		crearContenidoUnidad(3);
	});

    $("#glosarioFooter").click(function(){
     	$('#modalGlosario').modal('show');     	  
	});
		    
   $("#botonMenuLateral,#botonMenuLateralDevolver").click(function(event) {
		event.stopPropagation();
		$("#botonMenuLateral").fadeOut("slow",function() {
		    $("#hamburger-menu").toggleClass("open");
		    $("#menu-container-unidad .menu-list-unidad").toggleClass("active");
		    slideMenu();
    		$("body").toggleClass("overflow-hidden");
    	});
	});
    	

//   if((screen.width<=800)) {
    $("#botonPracticas").removeClass("buttonUnidadAmarillo");
	    
	    $("#botonMenuLateralIndex").click(function(event) {
	    	event.stopPropagation();
			$("#botonMenuLateralIndex").fadeOut("slow",function() {

				$("#botonActividades").addClass("buttonUnidadAmarillo");
	    		$("#botonPracticas").removeClass("buttonUnidadAmarillo");


			    $("#hamburger-menu").toggleClass("open");
			    $("#menu-container .menu-list").toggleClass("active");
			    slideMenuIndex();
	    		$("body").toggleClass("overflow-hidden");
	    	});
		});

		$("#botonMenuLateralActividades").removeClass("botonMenuLateralDevolver");
		$("#botonMenuLateralActividades").addClass("capaBack");
		   	   	
	    $("#botonMenuLateralActividades").click(function(){
	    	$("#botonActividades").addClass("buttonUnidadAmarillo");
	    	$("#botonPracticas").removeClass("buttonUnidadAmarillo");
	    	$("#botonMenuLateralActividades").removeClass("botonMenuLateralDevolver");
		   	$("#botonMenuLateralActividades").addClass("capaBack");
		   	$("#botonMenuLateralPracticas").removeClass("capaBack");
		   	$("#botonMenuLateralPracticas").addClass("botonMenuLateralDevolver");
	    	
	    	

	       	$("li").each(function(){
		        if($(this).data("letra")=="A")
		        	$(this).show();
		        else
	       			$(this).hide();
		    });


		    if($("#botonObjetivos").hasClass("buttonUnidadAmarillo"))
		    	crearContenidoUnidad(1);
		    if($("#botonContenido").hasClass("buttonUnidadAmarillo"))
		    	crearContenidoUnidad(2);
		    if($("#botonMetodologia").hasClass("buttonUnidadAmarillo"))
		    	crearContenidoUnidad(3);
	    });

	    $("#botonMenuLateralPracticas").click(function(){

	    	$("#botonActividades").removeClass("buttonUnidadAmarillo");
	    	$("#botonPracticas").addClass("buttonUnidadAmarillo");
	    	$("#botonMenuLateralActividades").removeClass("capaBack");
	    	$("#botonMenuLateralActividades").addClass("botonMenuLateralDevolver");
		   	$("#botonMenuLateralPracticas").removeClass("botonMenuLateralDevolver");
	    	$("#botonMenuLateralPracticas").addClass("capaBack");
		   	
	    	

	       	$("li").each(function(){
		        if($(this).data("letra")=="P")
		        	$(this).show();
		        else
	       			$(this).hide();
		    });

		    if($("#botonObjetivos").hasClass("buttonUnidadAmarillo"))
		    	crearContenidoUnidad(1);
		    if($("#botonContenido").hasClass("buttonUnidadAmarillo"))
		    	crearContenidoUnidad(2);
		    if($("#botonMetodologia").hasClass("buttonUnidadAmarillo"))
		    	crearContenidoUnidad(3);
		    
	    });

 //   }


    $("#volumenFooter").click(function(){
       
        if($("#volumenFooter").hasClass("conectado")){ 
        	$("#volumenFooter").removeClass("conectado");
        	$("#volumenFooter").addClass("noconectado");
		    $("#volumenFooter").css({"background-image":"url(assets/img/mute.svg)"})    
  		    $("#audioLabs")[0].volume = 0;
        }	
        else{
        	$("#volumenFooter").removeClass("noconectado");
		    $("#volumenFooter").addClass("conectado");
        	$("#volumenFooter").css({"background-image":"url(assets/img/sonido.svg)"})    
  		    $("#audioLabs")[0].volume = 1;
        }
    });

    $("#playFooter").click(function(){
       
        if($("#playFooter").hasClass("noconectado")){ 
        	$("#playFooter").removeClass("noconectado");
   			$("#playFooter").addClass("conectado");
   			$("#playFooter").css({"background-image":"url(assets/img/pause.svg)"});
		    $("#audioLabs")[0].play();
        }	
        else{
        	$("#playFooter").removeClass("conectado");
        	$("#playFooter").addClass("noconectado");
		    $("#playFooter").css({"background-image":"url(assets/img/play.svg)"})    
        	$("#audioLabs")[0].pause();
        }
    });

	$("#botonActividades").click(function(){
    	$("#botonActividades").addClass("buttonUnidadAmarillo");
    	$("#botonPracticas").removeClass("buttonUnidadAmarillo");
		$("li").each(function(){
	        if($(this).data("letra")=="A")
	        	$(this).show();
	        else
       			$(this).hide();
	    });

	    if($("#botonObjetivos").hasClass("buttonUnidadAmarillo"))
	    	crearContenidoUnidad(1);
	    if($("#botonContenido").hasClass("buttonUnidadAmarillo"))
	    	crearContenidoUnidad(2);
	    if($("#botonMetodologia").hasClass("buttonUnidadAmarillo"))
	    	crearContenidoUnidad(3);
    });

    $("#botonPracticas").click(function(){
    	$("#botonActividades").removeClass("buttonUnidadAmarillo");
    	$("#botonPracticas").addClass("buttonUnidadAmarillo");
    	$("li").each(function(){
	        if($(this).data("letra")=="P")
	        	$(this).show();
	        else
       			$(this).hide();
	    });	   

	    if($("#botonObjetivos").hasClass("buttonUnidadAmarillo"))
	    	crearContenidoUnidad(1);
	    if($("#botonContenido").hasClass("buttonUnidadAmarillo"))
	    	crearContenidoUnidad(2);
	    if($("#botonMetodologia").hasClass("buttonUnidadAmarillo"))
	    	crearContenidoUnidad(3);	
    });

    $(".liSubmenu").click(function(){ 
   		$("#playFooter").removeClass("noconectado");
   		$("#playFooter").addClass("conectado");
        $("#playFooter").css({"background-image":"url(assets/img/play.svg)"});        		
   		$("#audioLabs")[0].pause();
    	$(".liSubmenu a").removeClass("activado");
    	$(".textoFranjaHeader").html(nombreUnidad);
    	$(this).find("a").addClass("activado");
    	var idPadre=$(this).parent().attr("id");
    	seccion=idPadre.split("subnav")[1];
		totalUnidades=opcionesMenu[seccion-1].length-2;
		var seccionActual=Array();
		seccionActual=this.id.split('-');
		subSeccion=seccionActual[1];
	});	

	$(".navOpcionUnidad").click(function(){
    	$(".liSubmenu a").removeClass("activado");
    	$(".textoFranjaHeader").html(nombreUnidad);
    	$("#subnav"+this.id.split("unidad")[1]+" #li-"+subSeccion+" a").addClass("activado");
		seccion=this.id.split("unidad")[1];
		totalUnidades=opcionesMenu[seccion-1].length-2;
		subSeccion=1;
	});	

	$("#izquierdaFooter").click(function(){

		if(subSeccion>1){
            $(this).prop('disabled', true);
	    	$("#izquierdaFooter").show();
			$("#playFooter").removeClass("noconectado");
	   		$("#playFooter").addClass("conectado");
	        $("#playFooter").css({"background-image":"url(assets/img/play.svg)"});        		
	   		$(".liSubmenu a").removeClass("activado");
    		subSeccion=subSeccion-1;
    		$("#li-"+subSeccion+" a").addClass("activado");
			//audioSeccionActual=$("#"+$("#li-"+subSeccion+" a").attr("id")).data("audiosec");
			//idSeccionActual=$("#li-"+subSeccion+" a").attr("id").split("opMenu")[1];
			audioSeccionActual=opcionesMenu[seccion-1][parseInt(subSeccion)+1].audio;
		 	idSeccionActual=opcionesMenu[seccion-1][parseInt(subSeccion)+1].id;
			telon(idSeccionActual,audioSeccionActual,subSeccion);
		}
	});
    
	$("#derechaFooter").click(function(){
		if(subSeccion<totalUnidades){
            $(this).prop('disabled', true);
			$("#playFooter").removeClass("noconectado");
	   		$("#playFooter").addClass("conectado");
	        $("#playFooter").css({"background-image":"url(assets/img/play.svg)"});        		   		
			$("#audioLabs")[0].pause();
			$(".liSubmenu a").removeClass("activado");
    		
    		subSeccion=parseInt(subSeccion)+1;
    		$("#li-"+subSeccion+" a").addClass("activado");
    		//audioSeccionActual=$("#"+$("#li-"+subSeccion+" a").attr("id")).data("audiosec");
		 	//idSeccionActual=$("#li-"+subSeccion+" a").attr("id").split("opMenu")[1];
		 	//idSeccionActual=$("#li-"+subSeccion+" a").attr("id");//$("#li-"+subSeccion+" a").attr("id").split("opMenu")[1];
		 	audioSeccionActual=opcionesMenu[seccion-1][parseInt(subSeccion)+1].audio;
		 	idSeccionActual=opcionesMenu[seccion-1][parseInt(subSeccion)+1].id;
			telon(idSeccionActual,audioSeccionActual,subSeccion);

		}else{
			location.href="index.html";
		}
	});
    
    $("#menu-wrapper").click(function(event) {
	    event.stopPropagation();
	    $("#hamburger-menu").toggleClass("open");
	    $("#menu-container .menu-list").toggleClass("active");
	
	    if((screen.width<=800)) {
    	    slideMenuIndex();
    	}
	    $("body").toggleClass("overflow-hidden");
	});

	$(".menu-list-unidad").find(".accordion-toggle").click(function() {
	    $(this).next().toggleClass("open").slideToggle("fast");
	    $(this).toggleClass("active-tab").find(".menu-link").toggleClass("active");

	    $(".menu-list-unidad .accordion-content")
		    .not($(this).next())
		    .slideUp("fast")
		    .removeClass("open");
		$(".menu-list-unidad .accordion-toggle")
		    .not(jQuery(this))
		    .removeClass("active-tab")
		    .find(".menu-link")
		    .removeClass("active");
	});

	$("#homeButton").click(function() {
		location.href="index.html";
	});

	if((screen.width<=500)) {
		$(".contenidoAmarilloUnidad").css("margin-left","-20px");
		$(".contenidoAmarilloUnidad").css("width","100%");
		$(".lateralAmarilloDerecho").css("margin-left","-20px");
		$("div.imagenAmarilloUnidad2").css("margin-left","-20px");
		$("div.imagenAmarilloUnidad2").css("width","100%");
	}
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function crearContenidoUnidad(seccion){

    var texto=opcionesTextoUnidad[seccion-1];
	$("#regionTextoUnidad").hide();
    $("#regionTextoUnidad").html(texto);
    $("#regionTextoUnidad").slideDown("slow");
}

function habilitarPantalla(idPantalla,audio){

    $("#pantallasListaIndividual li").each(function(){
	    if(this.id==idPantalla){ 
	      	$(this).show();
	      	
	      	$("#audioLabs").data("numero",-1);
	      	$("#audioLabs").attr("src",audio);					
	       	$("#playFooter").removeClass("noconectado");
   			$("#playFooter").addClass("conectado");
   			$("#playFooter").css({"background-image":"url(assets/img/pause.svg)"});
   			$("#audioLabs")[0].pause();
		    $("#audioLabs")[0].play();

	   		if (typeof idPantalla+"TextoIntroduccion" !== "undefined"){
    		    $("#"+idPantalla+" .mainContentUnidadDerechaSmall .lateralDerecho").hide();	
				$("#"+idPantalla+" .mainContentUnidadDerecha .tituloAmarilloPunteado .slideImagenes button").each(function(){ 
					$(this).removeClass("buttonSeccionAmarillo");	
				});
				$("#"+idPantalla+" .mainContentUnidadIzquierda .lateralAmarillo .contenidoAmarilloUnidad").html($("#"+idPantalla+"TextoIntroduccion").val());
				$("#"+idPantalla+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").attr("src",$("#"+idPantalla+"ImagenIntroduccion").val());
				/****************/
			  	$("#"+idPantalla+" .contenidoBotones center button").each(function(){ 
					$(this).removeClass("botonAmarillo");	
				});
						
				$("#"+idPantalla+" .mainContentUnidadDerecha .contenidoAmarilloUnidad").html($("#"+idPantalla+"TextoIntroduccion").val());
				$("#"+idPantalla+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").attr("src",$("#"+idPantalla+"ImagenIntroduccion").val());
					

				/************/
				$("#"+idPantalla+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .contenidoAmarilloUnidad").show();
				$("#"+idPantalla+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .lateralAmarilloDerecho img").attr("src",$("#"+idPantalla+"ImagenIntroduccion").val());

				$("#"+idPantalla+" .mainContentUnidadDerechaSmall .lateralDerecho div").each(function(){ 
				    if($(this).data("secuencia")=="conv1")
				      	$(this).show();
				    else
				  		$(this).hide();
				});
				/*****************/
		    } 
		}
        else{
   			//$(this).hide();
   			$("#"+this.id).hide();
        }
	});
}

/* Función para creación menú acordeón principal con sub menu*/
function crearMenu(tipo) {
 
    for(i=0;i<opcionesMenu.length;i++){ 
		
    	if(tipo=='Unidad')	    
    		$("#ok").append('<li id="unidad'+(i+1)+'" class="toggle accordion-toggle navOpcion'+tipo+'" data-letra="'+(opcionesMenu[i][0])+'"><a class="menu-link" href="'+((tipo=='')?'unidad.html?seccion='+(i+1):'javascript:;')+'">'+(opcionesMenu[i][1])+'</a></li>');
    	else
    		$("#ok").append('<li id="unidad'+(i+1)+'" class="toggle accordion-toggle navOpcion'+tipo+'" data-letra="'+(opcionesMenu[i][0])+'" onclick="location.href=\''+((tipo=='')?'unidad.html?seccion='+(i+1):'')+'\'"><a class="menu-link" href="'+((tipo=='')?'unidad.html?seccion='+(i+1):'javascript:;')+'">'+(opcionesMenu[i][1])+'</a></li>');
    	
    	if(tipo=='Unidad'){
	    	$('<ul class="menu-submenu accordion-content" id="subnav'+(i+1)+'"">').insertAfter("#unidad"+(i+1));
	    	
	    	for(j=2;j<opcionesMenu[i].length;j++){ 
	    		crearPantalla(opcionesMenu[i][j],opcionesMenu[i][j].tipo); 
	    		/*if(i==0 && j==2){	
	    			$("#audioLabs").attr("src",opcionesMenu[i][].audio);					
					$("#playFooter i").removeClass("fa fa-play");
       				$("#playFooter i").addClass("fa fa-pause");
		    		$("#audioLabs")[0].play();
	    		}*/
				$("#subnav"+(i+1)).append('<li class="liSubmenu" id="li-'+(j-1)+'"><a class="head" href="javascript:;" onclick="telon(\''+opcionesMenu[i][j].id+'\',\''+opcionesMenu[i][j].audio+'\',\'subSeccion+1\')" id="opMenu'+opcionesMenu[i][j].id+'" data-audiosec="'+opcionesMenu[i][j].audio+'">'+opcionesMenu[i][j].titulo+'</a></li>'+((j<(opcionesMenu[i].length-1)?'':'</ul>')));
	    	}	
    	}	
    }

    if(tipo!='Unidad'){    	
		$("li").each(function(){
		        if($(this).data("letra")=="A")
		        	$(this).show();
		        else
	       			$(this).hide();
	    });
    }
}


function slideMenu() {
	var activeState = $("#menu-container-unidad .menu-list-unidad").hasClass("active");
    $("#menu-container-unidad").animate({left: activeState ? "0%" : "-100%"},400);

    if(!activeState){
    	$("#botonMenuLateral").fadeIn();
    }
}

function slideMenuIndex() {
	
	var activeState = $("#menu-container .menu-list").hasClass("active");
    $("#menu-container").animate({left: activeState ? "0%" : "-100%"},400);

    $("#botonMenuLateralActividades").show();
	$("#botonMenuLateralPracticas").show();
	$("#botonMenuLateralDevolverIndex").show();
	
    if(!activeState){
    	$("#botonMenuLateralIndex").fadeIn();    
    }
}

function crearGlosario(){

	var tablaCompleta='';

	for(i=0;i<opcionesGlosario.length;i++){ 
	    tablaCompleta+='<table><tr><th colspan="2"><a id="ancla'+opcionesGlosario[i][0]+'">'+opcionesGlosario[i][0]+'</a></th></tr>';
	
	    for(j=1;j<opcionesGlosario[i].length;j++){ 
	    	significado= opcionesGlosario[i][j].split("##");
    		tablaCompleta+='<tr><td>'+significado[0]+'</td><td>'+significado[1]+'</td></tr>';
    	}	

  		tablaCompleta+='</table>';
	}

	$("#contenidoGlosario").append(tablaCompleta);
}

function barraProgreso(pagina){

    var cienPorCiento=(pagina*100)/totalUnidades; 
	$(".progress-bar").css("width",cienPorCiento+"%");
    $(".textoPags").html("Pág"+" "+pagina+"/"+totalUnidades);
}

function verRespuestasCorrectasTipo1(idPantalla,correctasEntrada){
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;

	$("input:radio").next("label").removeClass("misRespuestas");	
	$("input:radio").next("label").removeClass("aciertoPregunta");
	$("input:radio").next("label").removeClass("errorPregunta");
    
    totalCalificadas=0;

    for(i=1;i<=totalPreguntas;i++){
		respuestaPregunta=$("input:radio[name="+idPantalla+"r"+i+"]:checked").val();
		if (typeof respuestaPregunta !== "undefined")
        	totalCalificadas++;
	}

	terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
	if(totalCalificadas==totalPreguntas && terminado=='OK'){
	    for(i=1;i<=totalPreguntas;i++){
	    	$("#"+idPantalla+" #"+idPantalla+"r"+i+correctas[i-1]).next("label").addClass("aciertoPregunta");
		}

	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verMisRespuestasTipo1(idPantalla,correctasEntrada){
	
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	$("input:radio").next("label").removeClass("misRespuestas");
	$("input:radio").next("label").removeClass("aciertoPregunta");
	$("input:radio").next("label").removeClass("errorPregunta");
    
    totalCalificadas=0;

    for(i=1;i<=totalPreguntas;i++){
		respuestaPregunta=$("input:radio[name="+idPantalla+"r"+i+"]:checked").val();
		if (typeof respuestaPregunta !== "undefined")
        	totalCalificadas++;
	}

    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
	if(totalCalificadas==totalPreguntas && terminado=='OK'){
	 
	    for(i=1;i<=totalPreguntas;i++){
	    	respuestaPregunta=$("input:radio[name="+idPantalla+"r"+i+"]:checked").val();
			$("#"+idPantalla+" #"+idPantalla+"r"+i+(respuestaPregunta)).next("label").addClass("misRespuestas");
		}
	}else{
    	$("#modalCalificacion").modal("show");
    }

}

function verificarRespuestasTipo1(idPantalla,correctasEntrada){
	
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	$("input:radio").next("label").removeClass("misRespuestas");
    $("input:radio").next("label").removeClass("aciertoPregunta");
	$("input:radio").next("label").removeClass("errorPregunta");
	
    calificacion=0;
    totalCalificadas=0;

    for(i=1;i<=totalPreguntas;i++){
		respuestaPregunta=$("input:radio[name="+idPantalla+"r"+i+"]:checked").val();
		if (typeof respuestaPregunta !== "undefined")
        	totalCalificadas++;
	}

	if(totalCalificadas==totalPreguntas){
      $("#"+idPantalla+" .mainContentUnidadTotal").data("terminado","OK"); 
  	}
	
	terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
    if(totalCalificadas==totalPreguntas && terminado=='OK'){
	    for(i=1;i<=totalPreguntas;i++){
			respuestaPregunta=$("input:radio[name="+idPantalla+"r"+i+"]:checked").val();
			
	        if(respuestaPregunta==correctas[i-1]){
	    		$("#"+idPantalla+" #"+idPantalla+"r"+i+(respuestaPregunta)).next("label").addClass("aciertoPregunta");
	    		calificacion++;
	        }
	    	else
	    		$("#"+idPantalla+" #"+idPantalla+"r"+i+(respuestaPregunta)).next("label").addClass("errorPregunta");
		}

		porcentajeCalificacion=calificacion*100/totalPreguntas;		
        calificacion=(calificacion*100/totalPreguntas)/10;
        
		$("#calificacion"+idPantalla+" span").html("Calificación: "+Math.round(calificacion)+"/10 Porcentaje Prueba: "+Math.round(porcentajeCalificacion)+" %");

	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verificarRespuestasTipo2(idPantalla,correctasEntrada){
    
   	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
    totalCalificadas=0;
	calificacion=0;
    
	for(i=1;i<=totalPreguntas;i++){
		$("#"+idPantalla+"s"+i+"p").removeClass("misRespuestas");	
		$("#"+idPantalla+"s"+i+"p").removeClass("aciertoPregunta");
		$("#"+idPantalla+"s"+i+"p").removeClass("errorPregunta");
		cadena=$("#"+idPantalla+"s"+i+"p").html().split(" - ");
		$("#"+idPantalla+"s"+i+"p").html(cadena[1]);
		cadena='';

	    if(!$("#"+idPantalla+"s"+i+"p").find("#"+idPantalla+"s"+i).length)
			totalCalificadas++;	    	
	}

	if(totalCalificadas==totalPreguntas){
      $("#"+idPantalla+" .mainContentUnidadTotal").data("terminado","OK"); 
  	}

	terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
	if(totalCalificadas==totalPreguntas && terminado=='OK'){
		for(i=1;i<=totalPreguntas;i++){
            idPadre=$("#"+idPantalla+"s"+i).parent().attr("id");
            idPadre=idPadre.substring(idPadre.length-1,idPadre.length);
			$("#"+idPantalla+"s"+i+"p").html(idPadre+" - "+$("#"+idPantalla+"s"+i+"p").html());
	    		
	   	    if(idPadre==correctas[i-1]){
	   	    	$("#"+idPantalla+"s"+i+"p").addClass("aciertoPregunta");		
	   	    	calificacion++;
	   	    }	
	   		else{
				$("#"+idPantalla+"s"+i+"p").addClass("errorPregunta");			    	    
	   		}
    		idPadre='';
		}

		porcentajeCalificacion=calificacion*100/totalPreguntas;		
        calificacion=(calificacion*100/totalPreguntas)/10;
        
		$("#calificacion"+idPantalla+" span").html("Calificación: "+Math.round(calificacion)+"/10 Porcentaje Prueba: "+Math.round(porcentajeCalificacion)+" %");

	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verMisRespuestasTipo2(idPantalla,correctasEntrada){

	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;
	
	for(i=1;i<=totalPreguntas;i++){
		$("#"+idPantalla+"s"+i+"p").removeClass("misRespuestas");	
		$("#"+idPantalla+"s"+i+"p").removeClass("aciertoPregunta");
		$("#"+idPantalla+"s"+i+"p").removeClass("errorPregunta");
		cadena=$("#"+idPantalla+"s"+i+"p").html().split(" - ");
		$("#"+idPantalla+"s"+i+"p").html(cadena[1]);
		cadena='';

	    if(!$("#"+idPantalla+"s"+i+"p").find("#"+idPantalla+"s"+i).length)
			totalCalificadas++;	    	
	}

    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
	if(totalCalificadas==totalPreguntas && terminado=='OK'){
		for(i=1;i<=totalPreguntas;i++){
            idPadre=$("#"+idPantalla+"s"+i).parent().attr("id");
            idPadre=idPadre.substring(idPadre.length-1,idPadre.length);
			$("#"+idPantalla+"s"+i+"p").html(idPadre+" - "+$("#"+idPantalla+"s"+i+"p").html());
	    	$("#"+idPantalla+"s"+i+"p").addClass("misRespuestas");		
	    	idPadre='';
		}
	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verRespuestasCorrectasTipo2(idPantalla,correctasEntrada){

	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;
	
	for(i=1;i<=totalPreguntas;i++){
		$("#"+idPantalla+"s"+i+"p").removeClass("misRespuestas");	
		$("#"+idPantalla+"s"+i+"p").removeClass("aciertoPregunta");
		$("#"+idPantalla+"s"+i+"p").removeClass("errorPregunta");
		cadena=$("#"+idPantalla+"s"+i+"p").html().split(" - ");
		$("#"+idPantalla+"s"+i+"p").html(cadena[1]);
		cadena='';

	    if(!$("#"+idPantalla+"s"+i+"p").find("#"+idPantalla+"s"+i).length)
			totalCalificadas++;	    	
	}

	terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
	if(totalCalificadas==totalPreguntas && terminado=='OK'){
		for(i=1;i<=totalPreguntas;i++){
    		$("#"+idPantalla+"s"+correctas[i-1]+"p").html(i+" - "+$("#"+idPantalla+"s"+correctas[i-1]+"p").html());
    		$("#"+idPantalla+"s"+i+"p").addClass("aciertoPregunta");		
		}
	}else{
    	$("#modalCalificacion").modal("show");
    }	
}

function verificarRespuestasTipo3(idPantalla,correctasEntrada){ 
				  
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;
	calificacion=0;
	$(".aciertoPreguntaLinea").hide();
	for(i=1;i<=totalPreguntas;i++){
    	if($("#"+idPantalla+"linep"+i).data("respuesta")!='')
    		totalCalificadas++;
    }	
    
    if(totalCalificadas==totalPreguntas){
      $("#"+idPantalla+" .mainContentUnidadTotal").data("terminado","OK"); 
  	}

  	terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    

    if(totalCalificadas==totalPreguntas && terminado=='OK'){
		for(i=1;i<=totalPreguntas;i++){
	    	$("#"+idPantalla+"linep"+i).removeClass("lineError");
	    	$("#"+idPantalla+"linep"+i).removeClass("lineAcierto");
	    	$("#"+idPantalla+"linep"+i).removeClass("lineMia");
	    	$("#"+idPantalla+"linep"+i+"Acierto").removeClass("lineAcierto");
    	}

	    for(i=1;i<=totalPreguntas;i++){
			respuestaOK=$("#"+idPantalla+"linep"+i).data("respuesta").substring($("#"+idPantalla+"linep"+i).data("respuesta").lastIndexOf("o")+1,$("#"+idPantalla+"linep"+i).data("respuesta").length);

            if(correctas[i-1]==respuestaOK){
	    		calificacion++;
	    		$("#"+idPantalla+"linep"+i).addClass("lineAcierto");
	    	}
	    	else{
	    		$("#"+idPantalla+"linep"+i).addClass("lineError");
	    	}

	    }

	    porcentajeCalificacion=calificacion*100/totalPreguntas;
	    calificacion=(calificacion*100/totalPreguntas)/10;
	    $("#calificacion"+idPantalla+" span").html("Calificación: "+Math.round(calificacion)+"/10 Porcentaje Prueba: "+Math.round(porcentajeCalificacion)+" %");
	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verMisRespuestasTipo3(idPantalla,correctasEntrada){
	
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	
	totalCalificadas=0;	
    $(".aciertoPreguntaLinea").hide();
    
    for(i=1;i<=totalPreguntas;i++){
    	if($("#"+idPantalla+"linep"+i).data("respuesta")!='')
    		totalCalificadas++;
    }	

    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
    if(totalCalificadas==totalPreguntas && terminado=='OK'){

		for(i=1;i<=totalPreguntas;i++){
			$("#"+idPantalla+"linep"+i).removeClass("lineError");
	    	$("#"+idPantalla+"linep"+i).removeClass("lineAcierto");
	    	$("#"+idPantalla+"linep"+i).removeClass("lineMia");
	    	$("#"+idPantalla+"linep"+i+"Acierto").removeClass("lineAcierto");
		}	

	    for(i=1;i<=totalPreguntas;i++){
	    	$("#"+idPantalla+"linep"+i).addClass("lineMia");
        }
	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verRespuestasCorrectasTipo3(idPantalla,correctasEntrada){
	
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;

    for(i=1;i<=totalPreguntas;i++){

		//$("#"+idPantalla+"o"+i+" .aciertoPreguntaLinea").html(correctas[i-1]);
		$("#"+idPantalla+"o"+(correctas[i-1])+" .aciertoPreguntaLinea").html(i);
		

    	if($("#"+idPantalla+"linep"+i).data("respuesta")!='')
    		totalCalificadas++;
    }	
   
    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
   
    if(totalCalificadas==totalPreguntas && terminado=='OK'){
        
		for(i=1;i<=totalPreguntas;i++){
			$("#"+idPantalla+"linep"+i).removeClass("lineError");
	    	$("#"+idPantalla+"linep"+i).removeClass("lineAcierto");
	    	$("#"+idPantalla+"linep"+i).removeClass("lineMia");
	    	$("#"+idPantalla+"linep"+i+"Acierto").removeClass("lineAcierto");
	    }	
        
        $(".aciertoPreguntaLinea").show();
	}else{
    	$("#modalCalificacion").modal("show");
    }
}

function verificarRespuestasTipo4(idPantalla,correctasEntrada){
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;
	calificacion=0;
	for(i=1;i<=totalPreguntas;i++){
	    $("#"+idPantalla+"Et4r"+i).removeClass("cuerpoPreguntaDosError");
	    $("#"+idPantalla+"Et4r"+i).removeClass("cuerpoPreguntaDosAcierto");
	    if($("#"+idPantalla+"Et4p"+i+" div").hasClass("numero"))
    		totalCalificadas++;
		if (typeof $("#"+idPantalla+"Et4r"+correctas[i-1]).html().split(" - ")[1] !== "undefined")
			$("#"+idPantalla+"Et4r"+correctas[i-1]).html($("#"+idPantalla+"Et4r"+correctas[i-1]).html().split(" - ")[1]);

    }

    if(totalCalificadas==totalPreguntas){
      $("#"+idPantalla+" .mainContentUnidadTotal").data("terminado","OK"); 
  	}

    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
    
    if(totalCalificadas==totalPreguntas && terminado=='OK'){
    	for(i=1;i<=totalPreguntas;i++){
	    	if(correctas[i-1]==$("#"+idPantalla+"t4r"+i+" img").attr("id").split(idPantalla+"t4p")[1]){
    			$("#"+idPantalla+"Et4r"+correctas[i-1]).addClass("cuerpoPreguntaDosAcierto");	    
	    		$("#"+idPantalla+"Et4r"+correctas[i-1]).html($("#"+idPantalla+"t4r"+i+" img").attr("id").split(idPantalla+"t4p")[1]+" - "+$("#"+idPantalla+"Et4r"+correctas[i-1]).html());
	    		calificacion++;
	    	}else{
	    		$("#"+idPantalla+"Et4r"+correctas[i-1]).addClass("cuerpoPreguntaDosError");	    
	    		$("#"+idPantalla+"Et4r"+correctas[i-1]).html($("#"+idPantalla+"t4r"+i+" img").attr("id").split(idPantalla+"t4p")[1]+" - "+$("#"+idPantalla+"Et4r"+correctas[i-1]).html());
		   	}
		}

		porcentajeCalificacion=calificacion*100/totalPreguntas;		
        calificacion=(calificacion*100/totalPreguntas)/10;
        
		$("#calificacion"+idPantalla+" span").html("Calificación: "+Math.round(calificacion)+"/10 Porcentaje Prueba: "+Math.round(porcentajeCalificacion)+" %");

    }else{
    	$("#modalCalificacion").modal("show");
    }
}

function verRespuestasCorrectasTipo4(idPantalla,correctasEntrada){
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;
	for(i=1;i<=totalPreguntas;i++){
	    $("#"+idPantalla+"Et4r"+i).removeClass("cuerpoPreguntaDosError");
	    $("#"+idPantalla+"Et4r"+i).removeClass("cuerpoPreguntaDosAcierto");
	    if($("#"+idPantalla+"Et4p"+i+" div").hasClass("numero"))
    		totalCalificadas++;
		if (typeof $("#"+idPantalla+"Et4r"+correctas[i-1]).html().split(" - ")[1] !== "undefined")
			$("#"+idPantalla+"Et4r"+correctas[i-1]).html($("#"+idPantalla+"Et4r"+correctas[i-1]).html().split(" - ")[1]);
    }
    
    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
    if(totalCalificadas==totalPreguntas && terminado=='OK'){
    	for(i=1;i<=totalPreguntas;i++){
	    	$("#"+idPantalla+"Et4r"+correctas[i-1]).addClass("cuerpoPreguntaDosAcierto");	    
	    	$("#"+idPantalla+"Et4r"+correctas[i-1]).html(i+" - "+$("#"+idPantalla+"Et4r"+correctas[i-1]).html());
		}
    }else{
    	$("#modalCalificacion").modal("show");
    }
}

function verMisRespuestasTipo4(idPantalla,correctasEntrada){
	var correctas=correctasEntrada.split(",");
	var totalPreguntas=correctas.length;
	totalCalificadas=0;
	for(i=1;i<=totalPreguntas;i++){
	    $("#"+idPantalla+"Et4r"+i).removeClass("cuerpoPreguntaDosError");
	    $("#"+idPantalla+"Et4r"+i).removeClass("cuerpoPreguntaDosAcierto");
	    if($("#"+idPantalla+"Et4p"+i+" div").hasClass("numero"))
    		totalCalificadas++;

		if (typeof $("#"+idPantalla+"Et4r"+correctas[i-1]).html().split(" - ")[1] !== "undefined")
			$("#"+idPantalla+"Et4r"+correctas[i-1]).html($("#"+idPantalla+"Et4r"+correctas[i-1]).html().split(" - ")[1]);
    }
    
    terminado=$("#"+idPantalla+" .mainContentUnidadTotal").data("terminado"); 
    
    if(totalCalificadas==totalPreguntas && terminado=='OK'){
    	for(i=1;i<=totalPreguntas;i++){
	    	$("#"+idPantalla+"Et4r"+correctas[i-1]).html(i+" - "+$("#"+idPantalla+"Et4r"+correctas[i-1]).html());
		}
    }else{
    	$("#modalCalificacion").modal("show");
    }

}

function drawLinea(origen,destino,tipo) {  


	if((screen.width<=800)) {
	    var x1 = $("#"+origen).offset().left + $("#"+origen).width();
		var y1 = $("#"+origen).offset().top + $("#"+origen).height()/2 + 5.5;                    
		var x2 = $("#"+destino).offset().left;                    
		var y2 = $("#"+destino).offset().top + $("#"+destino).height()/2 + 5.5;
	}
    else{
	    var x1 = $("#"+origen).offset().left + $("#"+origen).width() + 40;
		var y1 = $("#"+origen).offset().top + $("#"+origen).height()/2 + 5.5;                    
		var x2 = $("#"+destino).offset().left;                    
		var y2 = $("#"+destino).offset().top + $("#"+destino).height()/2 + 5.5;
	}
	var hypotenuse = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
	var angle = Math.atan2((y1-y2), (x1-x2)) *  (180/Math.PI);
	if(angle >= 90 && angle < 180){
		y1 = y1 - (y1-y2);
	}
	if(angle > 0 && angle < 90){
		x1 = x1 - (x1-x2);
		y1 = y1 - (y1-y2);
	}
	if(angle <= 0 && angle > -90){
		x1 = x1 - (x1-x2);
	}

    lineaNueva=origen.substring(0,origen.lastIndexOf("p"))+"line"+origen.substring(origen.lastIndexOf("p"),origen.length);
	if(tipo===""){ 
		$("#"+lineaNueva).data("respuesta",destino);
	}	

	$("#"+lineaNueva).queue(function(){
		$(this).offset({top: y1, left: x1});
		$(this).dequeue();
		}).queue(function(){
		$(this).width(hypotenuse);
		$(this).dequeue();
		}).queue(function(){
		$(this).rotate(angle);
		$(this).dequeue();
		});
	$("#"+lineaNueva).show();
}

function telon(idSeccionActual,audioSeccionActual){ 
	$('#cortinaDerecha').show();
    $('#cortinaIzquierda').show();
	$('#cortinaIzquierda').animate({right:"-=100%"},0);
	$('#cortinaDerecha').animate({left:"-=100%"},0);	
	$('#cortinaIzquierda').animate({right:"+=100%"},2000);
  	$('#cortinaDerecha').animate({left:"+=100%"},2000);	
	
	setTimeout(function() {
		$('#cortinaIzquierda').animate({right:"-=100%"},2000);
		$('#cortinaDerecha').animate({left:"-=100%"},2000);
		$("#menu-container-unidad .menu-list-unidad").removeClass("active");
	    slideMenu();
   		$("body").removeClass("overflow-hidden");
	    habilitarPantalla(idSeccionActual,audioSeccionActual);
		$("#izquierdaFooter").prop('disabled', false);
		$("#derechaFooter").prop('disabled', false);
		setTimeout(function() {
		   	$("#main-content-unidad").show();
		   	$("#logocontainer").hide();

		   	setTimeout(function() {
		   	   $('#cortinaIzquierda').animate({right:"+=100%"},0);
			   $('#cortinaDerecha').animate({left:"+=100%"},0);	
	
			   $('#cortinaDerecha').hide();
			   $('#cortinaIzquierda').hide();
			   barraProgreso(subSeccion);
			   if(subSeccion==1)
					$("#izquierdaFooter").hide();
			    else
			    	$("#izquierdaFooter").show();

		    },500);
	   	},500);
	},3000);		
}

function modalGenerica(contenido){ 

	$('#modalGenerica #contenidoGeneral').html(contenido);
	$('#modalGenerica').modal('show');     	  
}

//cambiar conversacion para la pantalla 2
function cambiarConversacion(numeroConversacion,imagenConversacion,idPantallaConversacion){
	
	$("#"+idPantallaConversacion+" .mainContentUnidadDerechaSmall .lateralDerecho").show();
	conversacion=numeroConversacion.split("conversacionNumero")[1];

	if(conversacion==0)
		$("#"+idPantallaConversacion+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .contenidoAmarilloUnidad").show();
	else
		$("#"+idPantallaConversacion+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .contenidoAmarilloUnidad").hide();

	$("#"+idPantallaConversacion+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .lateralAmarilloDerecho img").attr("src",imagenConversacion);
    
    var secuenciaAudios=[]; 
    i=0;

	$("#"+idPantallaConversacion+" .mainContentUnidadDerechaSmall .lateralDerecho div").each(function(){ 
	    if($(this).data("secuencia")=="conv"+conversacion){
			secuenciaAudios[i]=$(this).data("audioglobo");	      	
			i++;
	      	$(this).show();
	    }
	    else
	  		$(this).hide();
	});
	
	$("#audioLabs").data("numero",0);
	$("#audioLabs").attr("src",secuenciaAudios[0]);					
	$("#audioLabs")[0].pause();
	$("#playFooter").removeClass("noconectado");
   	$("#playFooter").addClass("conectado");
   	$("#playFooter").css({"background-image":"url(assets/img/pause.svg)"});		           			   		
	$("#audioLabs")[0].play();	
	
	var audioSin = document.getElementById("audioLabs");
	audioSin.onended = function() { 

		numero=parseInt($("#audioLabs").data("numero"))+1;		
		
		if(numero>0){
	        if(numero<secuenciaAudios.length){
	        	$("#audioLabs").data("numero",numero);
				$("#audioLabs").attr("src",secuenciaAudios[numero]);							    
				$("#playFooter").removeClass("noconectado");
	   			$("#playFooter").addClass("conectado");
	   			$("#playFooter").css({"background-image":"url(assets/img/pause.svg)"});		    
			 	$("#audioLabs")[0].play();		
		    }
		    else{        
		    	$("#audioLabs").data("numero",-1);
		    	$("#playFooter").removeClass("conectado");
   				$("#playFooter").addClass("noconectado");
   				$("#playFooter").css({"background-image":"url(assets/img/play.svg)"});		    
		  	}
	  	}else{        
		    	$("#audioLabs").data("numero",-1);
		   		$("#playFooter").removeClass("conectado");
   				$("#playFooter").addClass("noconectado");
   				$("#playFooter").css({"background-image":"url(assets/img/play.svg)"});
		}
	  	
	}	
}

//función para alimentar pantallas
function crearPantalla(infoPantalla,tipo){ 
	
	switch(tipo){
    	case 1:  
    			$("#"+infoPantalla.id).html('<div class="mainContentUnidadIzquierdaGrande">'+
    				'<div class="tituloAmarilloPunteado" style="margin-top: 30px;text-align:left;"><span></span>'+
					'<div class="barraAmarilla" style="float:left;margin-left:-60px;width:50%"></div>'+
					'<div class="barraAmarilla" style="float:left;width:2%"></div>'+
					'<div class="barraAmarilla" style="float:left;width:2%"></div>'+
					'<div class="barraAmarilla" style="float:left;width:2%"></div>'+
					'<div class="contenidoAmarilloUnidad" style="margin-top: 50px;width: 80%;height: 300px;">'+               
					'</div>'+ 
					'</div>'+
					'</div>'+
					'<div class="mainContentUnidadDerechaGrande">'+
					'<center>'+
					'<img src="" class="imagenAmarilloUnidad1" style="width:100%">'+
					'</center>'+  
					'</div>'+
					'<div class="franjaBotones" style="bottom:0; clear:both;margin-bottom: 10px;">'+         
					'<center>'+
					'</center>'+    
					'</div>');

    			setTimeout(function() {
	        		$("#"+infoPantalla.id+" .mainContentUnidadIzquierdaGrande .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadIzquierdaGrande .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					$("#"+infoPantalla.id+" .mainContentUnidadDerechaGrande .imagenAmarilloUnidad1").attr("src",infoPantalla.imagen);
					for(i=1;i<=infoPantalla.botones.length;i++){
						$("#"+infoPantalla.id+" .franjaBotones center").append('<button class="botonAmarilloSmall" type="button" data-posicion="'+i+'" id="'+infoPantalla.id+'Boton'+i+'">'+infoPantalla.botones[i-1]+'</button>');	   
						$("#"+infoPantalla.id+"Boton"+i).click(function(){ 
							$('#modalGenerica #contenidoGeneral').html(infoPantalla.contenidoModal[$(this).data("posicion")-1]);
							$('#modalGenerica').modal('show');     	  
						});
					}
                  },1);
		break;

		case 2: 
				$("#"+infoPantalla.id).html('<div class="mainContentUnidadIzquierdaSmall">'+
					'<div class="lateralAmarilloPelicula">'+
					'</div>'+
					'</div>'+
					'<div class="mainContentUnidadDerechaSmall">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<div class="contenidoAmarilloUnidad" style="margin-top: 20px;height: 150px;">'+
					'</div>'+
					'<div class="lateralAmarilloDerecho">'+
					'<img src="" class="imagenAmarilloUnidad2" style="width:70%;height: auto;">'+
					'</div>'+
					'<div class="lateralDerecho">'+
					'</div>'+
					'</div>'+
					'</div>'+
					'<input type="hidden" id="'+infoPantalla.id+'TextoIntroduccion">'+
					'<input type="hidden" id="'+infoPantalla.id+'ImagenIntroduccion">');

				if((screen.width<=500)) {
					$(".imagenAmarilloUnidad2").css("width","100%");
				}

    			setTimeout(function() {

					$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .tituloAmarilloPunteado .lateralAmarilloDerecho img").attr("src",infoPantalla.imagenesGeneral[0]);
					
					$("#"+infoPantalla.id+"TextoIntroduccion").val(infoPantalla.texto);
					$("#"+infoPantalla.id+"ImagenIntroduccion").val(infoPantalla.imagenesGeneral[0]);

					
					for(i=1;i<=infoPantalla.conversacion1.length;i++){
						
						var datoConversacion=infoPantalla.conversacion1[i-1].split("##");
						$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .lateralDerecho").append('<div class="bocadillo'+datoConversacion[0]+'" data-secuencia="conv1" data-audioglobo="'+datoConversacion[2]+'">'+datoConversacion[1]+'</div>');
					}	

					for(i=1;i<=infoPantalla.conversacion2.length;i++){
						
						var datoConversacion=infoPantalla.conversacion2[i-1].split("##");
						$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .lateralDerecho").append('<div class="bocadillo'+datoConversacion[0]+'" data-secuencia="conv2" data-audioglobo="'+datoConversacion[2]+'">'+datoConversacion[1]+'</div>');
					}	

					for(i=1;i<=infoPantalla.conversacion3.length;i++){
						
						var datoConversacion=infoPantalla.conversacion3[i-1].split("##");
						$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .lateralDerecho").append('<div class="bocadillo'+datoConversacion[0]+'" data-secuencia="conv3" data-audioglobo="'+datoConversacion[2]+'">'+datoConversacion[1]+'</div>');
					}	

					for(i=1;i<=infoPantalla.conversacion4.length;i++){
						
						var datoConversacion=infoPantalla.conversacion4[i-1].split("##");
						$("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .lateralDerecho").append('<div class="bocadillo'+datoConversacion[0]+'" data-secuencia="conv4" data-audioglobo="'+datoConversacion[2]+'">'+datoConversacion[1]+'</div>');
					}	
                    
                    $("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .lateralDerecho div").each(function(){ 
					    if($(this).data("secuencia")=="conv1")
					      	$(this).show();
					    else
				    		$(this).hide();
				    });

					for(i=1;i<=infoPantalla.imagenes.length;i++){
						$("#"+infoPantalla.id+" .mainContentUnidadIzquierdaSmall .lateralAmarilloPelicula").append('<div class="pelicula"><div class="barraPelicula" style="top:10%"></div><div class="barraPelicula" style="top:30%"></div><div class="barraPelicula" style="top:50%"></div><div class="barraPelicula" style="top:70%"></div><div class="barraPelicula" style="top:90%"></div><div class="centroPelicula"><a href="javascript:;" id="conversacionNumero'+i+'" onclick="cambiarConversacion(this.id,\''+infoPantalla.imagenesGeneral[i]+'\',\''+infoPantalla.id+'\')"><img src="'+infoPantalla.imagenes[i-1]+'"></a></div><div class="barraPelicula" style="top:10%;right:4%;"></div><div class="barraPelicula" style="top:30%;right:4%;"></div><div class="barraPelicula" style="top:50%;right:4%;"></div><div class="barraPelicula" style="top:70%;right:4%;"></div><div class="barraPelicula" style="top:90%;right:4%;"></div></div>');
						
					}

                    $("#"+infoPantalla.id+" .mainContentUnidadDerechaSmall .lateralDerecho").hide();

                },1);
		break;
		case 3: 
				$("#"+infoPantalla.id).html('<div class="mainContentUnidadDerecha">'+
				  	'<div class="tituloAmarilloPunteado"><span></span>'+
				    '<center>'+
				    '<div class="barraAmarilla" style="width:2%"></div>'+
				    '<div class="barraAmarilla" style="width:2%"></div>'+
				    '<div class="barraAmarilla" style="width:2%"></div>'+
				    '<div class="barraAmarilla" style="width:20%"></div>'+
				    '<div class="barraAmarilla" style="width:2%"></div>'+
				    '<div class="barraAmarilla" style="width:2%"></div>'+
				    '<div class="barraAmarilla" style="width:2%"></div>'+
				    '</center>'+
				    '<div class="contenidoAmarilloUnidad" style="margin-top: 20px;height: 200px;">'+
				    '</div>'+
				    '<center>'+ 
				    '<div class="imagenAmarilloUnidad2" style="width:90%;auto;">'+
				    '<img src="" style="width:100%;height:auto;border-radius: 10px;">'+
				    '</div>'+  
				    '</center>'+
				  	'</div>'+
					'</div>'+
					'<div class="mainContentUnidadIzquierda">'+
				  	'<div class="lateralAmarillo">'+
				    '<div class="contenidoBotones">'+
				    '<center>'+
				    '</center>'+  
				    '</div>'+  
				  	'</div>'+  
					'</div>'+
					'<input type="hidden" id="'+infoPantalla.id+'TextoIntroduccion">'+
					'<input type="hidden" id="'+infoPantalla.id+'ImagenIntroduccion">');

				setTimeout(function() {

					$("#"+infoPantalla.id+" .mainContentUnidadDerecha .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadDerecha .contenidoAmarilloUnidad").html(infoPantalla.texto[0]);
					$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").attr("src",infoPantalla.imagen[0]);
					
					$("#"+infoPantalla.id+"TextoIntroduccion").val(infoPantalla.texto[0]);
					$("#"+infoPantalla.id+"ImagenIntroduccion").val(infoPantalla.imagen[0]);

					for(i=1;i<=infoPantalla.botones.length;i++){
						$("#"+infoPantalla.id+" .contenidoBotones center").append('<button class="botonSeccionGris" data-posicion="'+i+'" data-audio="'+infoPantalla.audios[i-1]+'"  id="'+infoPantalla.id+'Boton'+i+'" type="button">'+infoPantalla.botones[i-1]+'</button>');
					    $("#"+infoPantalla.id+"Boton"+i).click(function(){ 
					    	$("#"+infoPantalla.id+" .contenidoBotones center button").each(function(){ 
								$(this).removeClass("botonAmarillo");	
						    });

							$(this).addClass("botonAmarillo");
							
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .contenidoAmarilloUnidad").html("<span>"+infoPantalla.texto[$(this).data("posicion")]+"</span>");
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .contenidoAmarilloUnidad span").hide();
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .contenidoAmarilloUnidad span").animate({
					            width: "toggle",
					            opacity: "toggle"
					        });
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").attr("src",infoPantalla.imagen[$(this).data("posicion")]);
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").hide();
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").fadeIn(1000);

							$("#audioLabs").attr("src",$(this).data("audio"));
							$("#playFooter").removeClass("noconectado");
	   						$("#playFooter").addClass("conectado");
	   						$("#playFooter").css({"background-image":"url(assets/img/pause.svg)"});		    			 	
							$("#audioLabs")[0].play();
							
						});					
					}
				},1);
		break;
		case 4: 
				$("#"+infoPantalla.id).html('<div class="mainContentUnidadDerecha">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:30%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<div class="imagenAmarilloUnidad2" style="width:90%;margin-top: 20px;">'+
					'<img src="" class="" style="width:100%;border-radius: 10px;border:0px;">'+
					'</div>'+
					'<div class="slideImagenes" style="float: left;margin-left:5%;bottom:0; clear:both;">'+         
					'</div>'+
					'</div>'+
					'</div>'+
					'<div class="mainContentUnidadIzquierda">'+
					'<div class="lateralAmarillo">'+
					'<div class="contenidoAmarilloUnidad">'+
					'</div>'+          
					'</div>'+    
					'</div>'+
					'<input type="hidden" id="'+infoPantalla.id+'TextoIntroduccion">'+
					'<input type="hidden" id="'+infoPantalla.id+'ImagenIntroduccion">');

				setTimeout(function() {

					$("#"+infoPantalla.id+" .mainContentUnidadDerecha .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadIzquierda .lateralAmarillo .contenidoAmarilloUnidad").html(infoPantalla.texto[0]);
					$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").attr("src",infoPantalla.imagen[0]);
					
					$("#"+infoPantalla.id+"TextoIntroduccion").val(infoPantalla.texto[0]);
					$("#"+infoPantalla.id+"ImagenIntroduccion").val(infoPantalla.imagen[0]);
					
					for(i=1;i<=infoPantalla.botones.length;i++){
				    	$("#"+infoPantalla.id+" .mainContentUnidadDerecha .tituloAmarilloPunteado .slideImagenes").append('<button class="buttonSeccionGris" data-posicion="'+i+'" id="'+infoPantalla.id+'Boton'+i+'" data-audio="'+infoPantalla.audios[i-1]+'" type="button">'+i+'</button>');
					    $("#"+infoPantalla.id+"Boton"+i).click(function(){ 
					    	$("#"+infoPantalla.id+" .mainContentUnidadDerecha .tituloAmarilloPunteado .slideImagenes button").each(function(){ 
								$(this).removeClass("buttonSeccionAmarillo");	
						    });

							$(this).addClass("buttonSeccionAmarillo");
							$("#"+infoPantalla.id+" .mainContentUnidadIzquierda .lateralAmarillo .contenidoAmarilloUnidad").html("<span>"+infoPantalla.texto[$(this).data("posicion")]+"</span>");
							$("#"+infoPantalla.id+" .mainContentUnidadIzquierda .lateralAmarillo .contenidoAmarilloUnidad span").hide();
							$("#"+infoPantalla.id+" .mainContentUnidadIzquierda .lateralAmarillo .contenidoAmarilloUnidad span").animate({
					            width: "toggle",
					            opacity: "toggle"
					        });	
					        $("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").attr("src",infoPantalla.imagen[$(this).data("posicion")]);
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").hide();
							$("#"+infoPantalla.id+" .mainContentUnidadDerecha .imagenAmarilloUnidad2 img").fadeIn(1000);
							
							$("#audioLabs").attr("src",$(this).data("audio"));
							$("#playFooter").removeClass("noconectado");
	   						$("#playFooter").addClass("conectado");
	   						$("#playFooter").css({"background-image":"url(assets/img/pause.svg)"});		    			 	
		    				$("#audioLabs")[0].play();

						});					
					}
		    	},1);
		break;
		case 5: 
				$("#"+infoPantalla.id).html('<div class="mainContentUnidadTotal">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<img src="" class="imagenAmarilloUnidad" style="width:100%;height: auto;max-height:100%;min-height:auto;">'+  
					'<div class="contenidoAmarilloUnidad" style="height:auto;">'+
					'</div>'+          
					'<div class="franjaBotones" style="bottom:0; clear:both;">'+         
					'</div>'+
					'</div>'+
					'</div>');

     			setTimeout(function() {
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .imagenAmarilloUnidad").attr("src",infoPantalla.imagen);
					for(i=1;i<=infoPantalla.botones.length;i++){
						$("#"+infoPantalla.id+" .mainContentUnidadTotal .franjaBotones").append('<button class="botonAmarilloSmall" type="button" data-posicion="'+i+'" id="'+infoPantalla.id+'Boton'+i+'">'+infoPantalla.botones[i-1]+'</button>');	   
						$("#"+infoPantalla.id+"Boton"+i).click(function(){ 
							$('#modalGenerica #contenidoGeneral').html(infoPantalla.contenidoModal[$(this).data("posicion")-1]);
							$('#modalGenerica').modal('show');     	  
						});
					}
		    	},1);
		break;
		case 6: 
     			$("#"+infoPantalla.id).html('<div class="mainContentUnidadTotal">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<video class="contenidoAmarilloUnidad" style="width: 65%;height: 300px;" controls>'+
					'<source src="" type="video/mp4">'+
					'Your browser does not support HTML5 video.'+
					'</video>'+
					'</center>'+ 
					'<div class="contenidoAmarilloUnidad" style="height: 200px;">'+
					'</div>'+          
					'</div>'+
					'</div>');	
				
				setTimeout(function() {
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal video").attr("src",infoPantalla.video);
		    	},1);
		break;
		case 7: 
     			$("#"+infoPantalla.id).html('<div class="mainContentUnidadTotal" data-terminado="">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<div class="contenidoAmarilloUnidad" style="height: 100px;">'+
					'</div>'+
					'</div>'+
					'<center>'+
					'<div id="preguntasIzquierda">'+
					'</div>'+
					'<div id="opcionesDerecha">'+
					'</div>'+
					'</center>'+
					'<center>'+               
					'<div class="respuestasPreguntas" style="bottom:0; clear:both;margin-top:20px;margin-bottom: 20px;">'+
					'</div>'+
					'</center>'+
					'</div>');

     			setTimeout(function() {	

					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					for(i=1;i<=infoPantalla.botonesPregunta.length;i++){
						
						if(i==1){
							$("#"+infoPantalla.id+" .mainContentUnidadTotal #preguntasIzquierda").append('<div class="buttonOpcionCalificacion">'+infoPantalla.botonesPregunta[0]+'</div>');
						}
						else{
							$("#"+infoPantalla.id+" .mainContentUnidadTotal #preguntasIzquierda").append('<div style="width:100%" id="'+infoPantalla.id+'p'+(i-1)+'" class="botonSeccionGris">'+(infoPantalla.botonesPregunta[i-1])+'<div class="aciertoPreguntaLinea" style="display: none">'+(i-1)+'</div></div><div id="'+infoPantalla.id+'linep'+(i-1)+'" class="lineMia" data-respuesta="" style="display: none"></div>');	   
							
							
							$("#"+infoPantalla.id+"p"+(i-1)).draggable({
								revert: "invalid",
								helper: "clone",
								cursor: "move",								
								start: function(e, ui){
									$(ui.helper).addClass("ui-draggable-helper");
									/*$(ui.helper).css("margin-left", e.clientX - $(e.target).offset().left);
                					$(ui.helper).css("margin-top", e.clientY - $(e.target).offset().top);*/
									$(ui.helper).html("-");
									
								}
        				 	});	
						}
					}

	            	for(i=1;i<=infoPantalla.botonesRespuesta.length;i++){
						
						if(i==1){
							$("#"+infoPantalla.id+" .mainContentUnidadTotal #opcionesDerecha").append('<div  class="buttonOpcionCalificacion">'+infoPantalla.botonesRespuesta[0]+'</div>');
						}
						else{
							$("#"+infoPantalla.id+" .mainContentUnidadTotal #opcionesDerecha").append('<div style="width:100%" id="'+infoPantalla.id+'o'+(i-1)+'" class="botonSeccionGris">'+(infoPantalla.botonesRespuesta[i-1])+'<div class="aciertoPreguntaLinea" style="display: none"></div></div>');	   
							
							$("#"+infoPantalla.id+"o"+(i-1)).droppable({
        							drop: function( event, ui ) { 
	    								dataId=ui.draggable.attr("id");			
										preguntaNum=dataId.substring(dataId.lastIndexOf("p")+1,dataId.length);            
										$("#"+infoPantalla.id+'linep'+preguntaNum).css("top","0");
										$("#"+infoPantalla.id+'linep'+preguntaNum).css("left","0");
										drawLinea(dataId,this.id,"");
										drawLinea(dataId,this.id,"");
										$(ui.helper).remove();
										event.preventDefault();
										$("#"+this.id).droppable("disable");
										$("#"+dataId).draggable("disable");
    		        			}
			      			});
						}
	            	}

	            	$("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<div id="calificacion'+infoPantalla.id+'"><span style="font-size: 16px;font-weight: bold;">Calificación:</span></div>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="verificar" onclick="verificarRespuestasTipo3(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Verificar</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="misRespuestas" onclick="verMisRespuestasTipo3(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver mis respuestas</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="correctas" onclick="verRespuestasCorrectasTipo3(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver respuestas correctas</button>');
		    	},1);	
		break;
		case 8: 
     			$("#"+infoPantalla.id).html('<div class="mainContentUnidadTotal" data-terminado="">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<div class="contenidoAmarilloUnidad" style="height: 100px;">'+
					'</div>'+
					'</div>'+
					'<center class="imagenesPreguntasLista">'+
					'</center>'+  
					'<center class="primeraPreguntasLista">'+  
					'</center>'+  
					'<center>'+  
					'<div class="respuestasPreguntas" style="bottom:0; clear:both;margin-top:20px;margin-bottom: 20px;">'+
					'</div>'+
					'</center>'+
					'</div>');
   
     			setTimeout(function() {	

					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					for(i=1;i<=infoPantalla.imagenesPregunta.length;i++){
					 	$("#"+infoPantalla.id+" .mainContentUnidadTotal .imagenesPreguntasLista").append('<div class="cuadroPregunta" id="'+infoPantalla.id+'Et4p'+i+'"><img src="'+infoPantalla.imagenesPregunta[i-1]+'" width="100%;" id="'+infoPantalla.id+'t4p'+i+'"></div>');
					 	$("#"+infoPantalla.id+"t4p"+i).draggable({ revert: "invalid" });
					}

					for(i=1;i<=infoPantalla.botonesPregunta.length;i++){
						$("#"+infoPantalla.id+" .mainContentUnidadTotal .primeraPreguntasLista").append('<div class="preguntaDos"><div class="headerPreguntaDos" id="'+infoPantalla.id+'t4r'+i+'"></div><div class="cuerpoPreguntaDos" id="'+infoPantalla.id+'Et4r'+i+'">'+infoPantalla.botonesPregunta[i-1]+'</div></div>');
						$("#"+infoPantalla.id+"t4r"+i).droppable({
        					drop: function( event, ui ) { 
		          				dataId=ui.draggable.attr("id");
	          					$("#"+dataId.split("t4p")[0]+"Et4p"+dataId.split("t4p")[1]).html("<div class='numero'>"+dataId.split("t4p")[1]+"</div>");
	          					$(ui.draggable).css("top","0");
	          					$(ui.draggable).css("left","0");
								$("#"+this.id).html(ui.draggable);
								event.preventDefault();
								$("#"+this.id).droppable("disable");
		        			}
		      			});
	              	}

	          	    $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<div id="calificacion'+infoPantalla.id+'"><span style="font-size: 16px;font-weight: bold;">Calificación:</span></div>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="verificar" onclick="verificarRespuestasTipo4(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Verificar</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="misRespuestas" onclick="verMisRespuestasTipo4(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver  mis respuestas</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal center .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="correctas" onclick="verRespuestasCorrectasTipo4(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver  respuestas correctas</button>');
		    	},1);	
		break;
		case 9: 
     			$("#"+infoPantalla.id).html('<div class="mainContentUnidadTotal" data-terminado="">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<div class="contenidoAmarilloUnidad" style="height: 300px;">'+
					'</div>'+
					'<center>'+
					'<div class="pruebasExamen" id="pantallaPreguntas1">'+
					'</div>'+
					'</center>'+  
					'<div class="respuestasPreguntas" style="bottom:0; clear:both;">'+
					'</div>'+
					'</div>'+
					'</div>');

     			setTimeout(function() {	

					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					htmlPreguntas='';
					for(i=1;i<=infoPantalla.botonesPregunta.length;i++){
						var opcionesRespuesta=infoPantalla.botonesPregunta[i-1];
						opcionesRespuesta=opcionesRespuesta.split("##");
						htmlPreguntas+='<div class="pregunta"><div class="headerPregunta">'+opcionesRespuesta[0]+'</div><div class="cuerpoPregunta">';
						for(j=1;j<opcionesRespuesta.length;j++){
				        	htmlPreguntas+='<input type="radio" id="'+infoPantalla.id+'r'+i+j+'" name="'+infoPantalla.id+'r'+i+'" value="'+j+'"><label for="'+infoPantalla.id+'r'+i+j+'"><span></span>'+opcionesRespuesta[j]+'</label>';
				        }
				        htmlPreguntas+='</div></div>';		
					}
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado	center .pruebasExamen").append(htmlPreguntas);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<div id="calificacion'+infoPantalla.id+'"><span style="font-size: 16px;font-weight: bold;">Calificación:</span></div>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="verificar'+infoPantalla.id+'" onclick="verificarRespuestasTipo1(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Verificar</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="misRespuestas'+infoPantalla.id+'" onclick="verMisRespuestasTipo1(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver  mis respuestas</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="correctas'+infoPantalla.id+'" onclick="verRespuestasCorrectasTipo1(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver  respuestas correctas</button>');
		    	},1);	
		break;
		case 10:
				$("#"+infoPantalla.id).html('<div class="mainContentUnidadTotal" data-terminado="">'+
					'<div class="tituloAmarilloPunteado"><span></span>'+
					'<center>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:20%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'<div class="barraAmarilla" style="width:2%"></div>'+
					'</center>'+
					'<div class="contenidoAmarilloUnidad" style="height: 100px;">'+
					'</div>'+
					'</div>'+
					'<center class="terceraPreguntaLista">'+
					'</center>'+
					'<div class="lateralDerecho" style="width:30%;">'+
					'</div>'+  
					'<center>'+  
					'<div class="respuestasPreguntas" style="bottom:0; clear:both;margin-top:20px;margin-bottom: 20px;">'+
					'</div>'+
					'</center>'+
					'</div>');

     			setTimeout(function() {	

					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado span").html(infoPantalla.titulo);
					$("#"+infoPantalla.id+" .mainContentUnidadTotal .tituloAmarilloPunteado .contenidoAmarilloUnidad").html(infoPantalla.texto);
					
	            	for(i=1;i<=infoPantalla.botonesPregunta.length;i++){
						infoPantalla.botonesPregunta[i-1]=infoPantalla.botonesPregunta[i-1].replace('*****', '<div id="'+infoPantalla.id+'r'+i+'" class="preguntaDragLLenar"></div>');
						$("#"+infoPantalla.id+" .mainContentUnidadTotal center.terceraPreguntaLista").append('<div class="pruebasExamen" id="'+infoPantalla.id+'pantallaPreguntas'+i+'"><div class="preguntaDrag">'+infoPantalla.botonesPregunta[i-1]+'</div></div>');
						$("#"+infoPantalla.id+"r"+i).droppable({
        					drop: function( event, ui ) { 
							    dataId=ui.draggable.attr("id");
   							    var texto=$("#"+dataId).text();
								$("#"+dataId).removeClass("botonAmarillo");							    
								destinoObj = document.getElementById(this.id);
								destinoObj.appendChild(document.getElementById(dataId))
								$(ui.draggable).css("top","0");
	          					$(ui.draggable).css("left","0");
								$("#"+dataId+"p").html(texto);
		        			}
		      			});
					}

					for(i=1;i<=infoPantalla.botonesRespuesta.length;i++){
					 	$("#"+infoPantalla.id+" .mainContentUnidadTotal .lateralDerecho").append('<div class="preguntaDragPunteada" id="'+infoPantalla.id+'s'+i+'p"><div id="'+infoPantalla.id+'s'+i+'" class="botonAmarillo" style="z-index:99">'+infoPantalla.botonesRespuesta[i-1]+'</div></div>');				
					   	$("#"+infoPantalla.id+"s"+i).draggable({ revert: "invalid" });					
	            	}

	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<div id="calificacion'+infoPantalla.id+'"><span style="font-size: 16px;font-weight: bold;">Calificación:</span></div>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="verificar'+infoPantalla.id+'" onclick="verificarRespuestasTipo2(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Verificar</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="misRespuestas'+infoPantalla.id+'" onclick="verMisRespuestasTipo2(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver  mis respuestas</button>');
	                $("#"+infoPantalla.id+" .mainContentUnidadTotal .respuestasPreguntas").append('<button class="botonAmarilloSmall" type="button" id="correctas'+infoPantalla.id+'" onclick="verRespuestasCorrectasTipo2(\''+infoPantalla.id+'\',\''+infoPantalla.respuestasCorrectas+'\')">Ver  respuestas correctas</button>');
		    	},1);		
		break;

	}	
}