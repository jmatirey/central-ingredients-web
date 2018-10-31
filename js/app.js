
// <-------------------REVEAL----------->
$(window).on('scroll', function(){
  
  let scrollActual = $(window).scrollTop();
  
  $('.reveal').each(function(){
    
    let profundidad = $(this).offset().top - $(window).innerHeight() / 1.2;
    
    if (scrollActual > profundidad) {
      
      $(this).addClass('visible');
    }
    else{
      $(this).removeClass('visible');
    }
  });
  
});


$(document).ready(function(){
  
  //  <-----REFRESCAR PAGINA ARRIBA----->
  // $(window).scrollTop(0);
  
  
  //  <-----TYPED PLUGIN----->
  var typed = new Typed(".frase", options = {
    
    strings: ["", "Contáctanos", "Seremos tu proveedor oficial"],
    typeSpeed: 30,
    backSpeed: 30,
    // shuffle: true,
    loop: true
    
  });
  
  
  //  <-----OWL CAROUSEL PLUGIN----->
  
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:15,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 1000,
    responsive:{
      0:{
        items:3
      },
      370:{
        items:4
      },
      600:{
        items:5
      },
      800:{
        items:6
      }
      
    }
  });
  
  
  // <-------VIVUS SVG ANIMATIONS------->
  new Vivus('svgCow', {
    file: 'img/svg/svgCow.svg',
    duration: 200,
  });
  
  new Vivus('svgStar', {
    file: 'img/svg/svgStar.svg',
    duration: 200,
    animTimingFunction: Vivus.EASE_IN
  });
  
  
  new Vivus('svgMedal', {
    file: 'img/svg/svgMedal.svg',
    duration: 200,
    animTimingFunction: Vivus.EASE_IN
    
  });
  
  new Vivus('svgLogistic', {
    file: 'img/svg/svgLogistic.svg',
    duration: 200,
    animTimingFunction: Vivus.EASE_IN
  });
  
  new Vivus('svgEnvironment', {
    file: 'img/svg/svgEnvironment.svg',
    duration: 200,
    animTimingFunction: Vivus.EASE_IN
  });
  
  new Vivus('svgLocation', {
    file: 'img/svg/svgLocation.svg',
    duration: 60,
  }, function(){
    $('.map').fadeTo(100, 1);
  });
  
  
  //  <-----DESPLAZACMIENTO A SECCION----->
  $('.menu').on('click', function(){
    
    let dataId = $(this).data('id'), objetivoPixels = $(dataId).offset().top;
    
    if (window.innerWidth <= 1160) {
      $('html').animate({
        scrollTop: objetivoPixels
        
      },1000);
      
      $('nav').removeClass('apareceMenu');
      
    } else {
      $('html').animate({
        scrollTop: objetivoPixels - 78
        
      },1000);
    }
  });
  
  //botonBlanco a contacto por serparado
  $('#nosotros .botonBlanco').on('click', function(){
    let objetivoBotonContacto = $('#contacto').offset().top;
    
    $('html').animate({
      scrollTop: objetivoBotonContacto
    },1000);
  });
  
  
  //  <-----VENTANAS MODALES----->
  
  $('.botonModal').on('click', function(){
    
    let ventana = $(this).data('numero');
    
    $('.fondoModal').fadeIn(500, function(){
      
      $(".contenidoModal[data-contenido="+ ventana +"]").fadeIn(400,function(){
        $('div[data-contenido="dos"] img').addClass('reduccion');
      });
      $("nav").css('opacity', '0');
    });
    
  });
  
  $('.cerrarModal').on('click', function(){
    $('.contenidoModal').fadeOut(400,function(){
      $('.fondoModal').fadeOut(1200);
      $("nav").css('opacity', '1');
      
    });
  });
  
  $(document).keyup(function(e){
    if (e.which == 27) {
      $('.contenidoModal').fadeOut(400,function(){
        $('.fondoModal').fadeOut(1200);
      });
    }
  });
  
  
  //   <-----RETARDOS EN IMAGENES----->
  $('.reveal').each(function(){
    $(this).css('transition-delay', $(this).data('delay') + 'ms');
  });
  
  //   <-----MENU RESPONSIVE----->
  $('.hamburgesa').on('click', function() {
    $('nav').toggleClass('apareceMenu');
  });
  
  $(document).on('click', function(e) {
    // Si el elemento que inicio el click no fue el botón, Si no se ha cliqueado en el nav ?? NO SE COMO ES, y nav tiene la clase `apareceMenu`
    if (!$(e.target).hasClass('hamburgesa') && $('nav').hasClass('apareceMenu')) {
      $('nav').removeClass('apareceMenu');
    }
  });
  
  
  //   <-----VALIDAR FORMULARIO----->
  $('form').on('submit', function(e){
    
    let nombre = $('#campoNombre').val();
    let email = $('#campoEmail').val();
    let telefono = $('#campoTelefono').val();
    let mensaje = $('#campoMensaje').val();
    
    if (nombre.length <= 2) {
      alertaError('El nombre es demasiado corto');
      e.preventDefault();
    }
    else if (email.includes('@') == false || email.includes('.') == false || email.indexOf('@') < 1) {
      alertaError('El email no es correcto');
      e.preventDefault();
    }
    else if (telefono.length < 9) {
      alertaError('El telefono debe tener al menos 9 numeros');
      e.preventDefault();
    }
    
    else if (mensaje.length <= 10) {
      alertaError('El mensaje es demasiado corto');
      e.preventDefault();
    }
    else{
      e.preventDefault();
      $.ajax({

        type: "POST",
        url: "contact.php",
        data: $(this).serialize(),
        success: function(datos) {
          let texto = datos.saludo + '<br>' + datos.mensaje;
          msg(texto, 2);
        }
        
      });
      
      //Empty field info except button
      $('input:not(.boton), textarea').each(function(){
        $(this).val('');
      });
    }
    
  });
  
});

//ERROR MSG
function alertaError(texto){
  $('#alerta p').text(texto);
  $('#alerta').addClass('visible');
  
  setTimeout(function(){
    $('#alerta').removeClass('visible');
  },3000);
}

// MSG
function msg(mensajes, tiempo) {
  
  $('#alerta p').html(mensajes);
  
  $('#alerta').addClass('visible');
  
  setTimeout( function(){
    $('#alerta').removeClass('visible');
  },tiempo * 2000);
}
