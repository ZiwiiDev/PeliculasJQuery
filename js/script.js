/*------------------------------------------------------------------*/
/* VARIABLES */
// Filtros de imagen
const filtroInicial = "grayscale(100%)"; // Filtro inicial para las imágenes
const filtroHover = "grayscale(0%)"; // Filtro al pasar el ratón sobre las imágenes

// Estilo del borde para la película seleccionada
const bordeSeleccionado = "2px solid red"; // Estilo del borde para la película seleccionada

// Tiempos de animación
const tiempoFadeInCarrousel = 3000;
const tiempoFadeOutCarrousel = 3000;
const tiempoSlow = "slow";
/*------------------------------------------------------------------*/
// Cargo el JQuery
$(document).ready(function () {
  // Llamadas a las funciones que afectan al HTML al cargar el documento
  cargar_pelicula();
  inicializar();
  personaje();
  imgcirculoSelector();
  circuloSelector();
  habilitarValoraciones();
  datosFormulario();
  configuracion();
  getPeliculaSeleccionada();
});
/*------------------------------------------------------------------*/
//-----------------------------------//
//   FUNCIONES QUE AFECTAN AL HTML   //
//-----------------------------------//

// Función para inicializar la página
function inicializar() {
  // Aplico el filtro inicial para las pelis de la navegación
  $("nav img").css("filter", filtroInicial);

  //Se selecciona la primera pelicula
  peliculaSeleccionada = "./assets/buscandoanemo.webp";
  cambioPeli(peliculaSeleccionada);

  $("nav img:first").addClass("clicked");
  $("nav img:first").css("filter", filtroHover);
  
  $("nav img:first").css("border", "3px inset purple");
  $("nav img:first").css("box-shadow", "0px 0px 10px black");
  
  $(".imagenes_img_img:first").css("filter", filtroHover);
  $(".circulo_selector_img:first").css("background-color", "black");
  $(".circulo_selector_img:first").css("width", "15px");
  $(".circulo_selector_img:first").css("height", "15px");

  $("#z_multimedia_img_img").attr("src", "./assets/img/nemo.jpg");

  // Deshabilitado del formulario
  $(".c_valoraciones input, .c_valoraciones textarea, .c_valoraciones button").attr("disabled", "disabled");

  // Deshabilitado de las valoraciones
  $(".c_usuario input, .casillas input, .casillas select").attr("disabled","disabled");
}
/*------------------------------------------------------------------*/
/*Función para ver qué pelicula se ha seleccionado, tanto clicando en las imágenes del navegador
 o seleccionando la peli en el select de la configuración*/
let peliculaSeleccionada = "";
function getPeliculaSeleccionada() {
  $("nav img").click(function () {
    peliculaSeleccionada = $(this).attr("src");
  }),
    $(".seleccionPeli").change(function () {
      peliculaSeleccionada = $(this).val();
    });
  return peliculaSeleccionada;
}//end function getPeliculaSeleccionada()
/*------------------------------------------------------------------*/
// FUNCION PARA CAMBIAR DE PELICULA
function cambioPeli(rutaImg) {
  let peli = obtenerNombrePuroRutaPelicula(rutaImg);

  // Para poner la carátula en grande
  let imagen = obtenerSrcImgCaratula(peli);
  $("#caratula_ampliada")
    .slideUp(tiempoSlow, function () {
      $("#caratula_ampliada").attr("src", imagen);
    })
    .slideDown(tiempoSlow);

  // Le cambio el filtro de la imagen
  $(".imagenes_img_img").css("filter", filtroInicial);
  
  // Para insertar los personajes de cada peli
  $(".imagenes_img_img").each(function (index) {
    let imgSrc = obtenerSrcImg(peli, index);
    $(this).attr("src", imgSrc);
  });

  // Para poner el nombre de los personajes de cada peli
  $("figcaption").each(function (index) {
    let nombrePersonaje = obtenerNombrePersonaje(peli, index);
    $(this).html(nombrePersonaje);
  });

  // Cambio de título
  let titulo = obtenerTitulo(peli);
  $("header h1").html(titulo);
  
  // Puesta de vídeo
  let video = obtenerSrcVideo(peli);
  $("video").attr("src", video);

  // Reseteo de los otros campos
  $(".circulo_selector_img").css("background-color", "white");
  $(".circulo_selector_img").css("width", "10px");
  $(".circulo_selector_img").css("height", "10px");

  // Selección del primer personaje
  $(".imagenes_img_img:first").css("filter", filtroHover);
  $("#z_multimedia_img_img").attr("src",obtenerSrcImg(peli,0));
  $(".circulo_selector_img:first").css("background-color", "black");
  $(".circulo_selector_img:first").css("width", "15px");
  $(".circulo_selector_img:first").css("height", "15px");

  //Habilitar usuario
  $(".c_usuario input").removeAttr("disabled");
  
  //Habilitar casillas
  $(".casillas input").removeAttr("disabled");
  $(".casillas select").removeAttr("disabled");

  // ACTUALIZACION DE DATOS DE LA PELI
  let datosPelicula = obtenerDatosPelicula(peli);
  if (datosPelicula) {
    let infoPelicula = `${datosPelicula.nacionalidad} - ${datosPelicula.anio} - ${datosPelicula.genero}`;
    $("#infoPelicula").text(infoPelicula);
    $("#sinopsis").text(datosPelicula.sinopsis);
  }//end if
}//end function cambioPeli(rutaImg)
/*------------------------------------------------------------------*/
/* Función que realiza el cambio de los elementos según la peli seleccionada
en el menú de navegación */
function cargar_pelicula() {
  $("nav img").on({
    click: function () {
      //Para obtener el parámetro (la ruta de la img)
      let rutaImg = $(this).attr("src");
      // Llamada a la función para cambiar la peli
      cambioPeli(rutaImg);
      //Filtros de gris y color en el clicado
      $("nav img").removeClass("clicked");
      $(this).addClass("clicked");
      $("nav img").css("filter", filtroInicial);
      $(this).css("filter", "none");
      $("nav img").css("border", "none");
      $(this).css("border", "3px inset purple");
      $("nav img").css("box-shadow", "none");
      $(this).css("box-shadow", "0px 0px 10px black");
    },
    // HOVER de la navegación
    mouseenter: function () {
      $(this).css("filter", filtroHover);
    },
    mouseleave: function () {
      // Si no hago click en la imagen
      if (!$(this).hasClass("clicked")) {
        $(this).css("filter", filtroInicial);
      } //end if
    },
  });
}//end function cargar_pelicula()
/*------------------------------------------------------------------*/
//FUNCION PARA GESTIONAR TODA LA CONFIGURACION
function configuracion() {
  // Para cambiar de película
  $(".seleccionPeli").on({
    change: function () {
      // Obtengo la ruta de la imagen seleccionada
      let rutaImagenSeleccionada = $(this).val();
      cambioPeli(rutaImagenSeleccionada);
      // Por cada imagen realizo lo siguiente
      $("nav img").each(function () {
        // Si el source coincide con la ruta
        if ($(this).attr("src") == rutaImagenSeleccionada) {
          $("nav img").removeClass("clicked");
          $(this).addClass("clicked");
          $("nav img").css("filter", filtroInicial);
          $(this).css("filter", "none");
          $("nav img").css("border", "none");
          $(this).css("border", "3px inset purple");
          $("nav img").css("box-shadow", "none");
          $(this).css("box-shadow", "0px 0px 10px black");
        }//end if
      });
    },
  });
  // Para mostrar/ocultar la sinopsis
  $("#mostrarSinopsisCheckbox").on({
    change: function () {
      // Si está checkeado el checkbox
      if ($(this).is(":checked")) {
        // Hacemos el slideUp
        $(".descripcion").slideUp(tiempoSlow, function () {
          $(".pelicula").css("margin-top", "10rem");
          $(".pelicula img").css("transform", "scaleY(1.2)");
          $(".pelicula").css("border", "none");
        });
      } else {
        $(".descripcion")
          // Hacemos el slideDown
          .slideDown(tiempoSlow, function () {
            $(".pelicula").css("margin-top", "0");
            $(".pelicula img").css("transform", "scaleY(1)");
            $(".pelicula").css("transform", "scaleY(1)");
            $(".pelicula").css("border", "");
          })
          .slideDown(tiempoSlow);
      }//end else
    },
  });
  // Para mostrar/ocultar el vídeo
  $("#mostrarVideoCheckbox").on({
    change: function () {
      // Si está checkeado el checkbox
      if ($(this).is(":checked")) {
        $(".z_multimedia_video").fadeOut(tiempoSlow);
        $(".z_multimedia_img").css("border", "none");
        $("#z_multimedia_img_img").css("transform", "scale(1.5)");
      } else {
        $(".z_multimedia_video").fadeIn(tiempoSlow);
        $("#z_multimedia_img_img").css("transform", "scale(1)");
      }
    },
  });
  // Para cambiar el orden de las películas
  $("#invertirImagenesCheckbox").on({
    change: function () {
      // Si está checkeado el checkbox
      if ($(this).is(":checked")) {
        $("nav").fadeOut(tiempoSlow, function () {
          $("nav").css("flex-direction", "column-reverse").fadeIn(tiempoSlow);
        });
      } else {
        $("nav").fadeOut(tiempoSlow, function () {
          $("nav").css("flex-direction", "column").fadeIn(tiempoSlow);
        });
      }
    },
  });
  // Función recursiva que no dejara de hacer fadeToggle hasta que se le pase el parámetro false
  let esRepetido = false;
  function repetir() {
    if (esRepetido) {
      $(".imagenes_img_img").fadeToggle(tiempoFadeOutCarrousel, repetir);
    }
  }
  // Con la función realizamos el efecto en la imágenes de los personajes
  $("#carruselImagenesCheckbox").on({
    change: function () {
      if ($(this).is(":checked")) {
        esRepetido = true;
        repetir();
      } else {
        esRepetido = false;
        $(".imagenes_img_img").stop(true, true).fadeIn(tiempoFadeInCarrousel);
      }
    },
  });
  // Para parar el efecto de fadeToggle si se clica en alguna imagen o en los botones de los personajes
  $(".imagenes_img_img, .circulo_selector_img").on({
    click: function () {
      if ($("#carruselImagenesCheckbox").is(":checked")) {
        esRepetido = false;
        $(".imagenes_img_img").stop(true, true).fadeIn(2000);
        $("#carruselImagenesCheckbox").prop("checked", false);
      }
    },
  });
  // Para mostrar/ocultar el formulario de los comentarios
  $("#desactivarEdicionCheckbox").on({
    change: function () {
      if ($(this).is(":checked")) {
        $(".z_campos").hide();
        $(".c_valoraciones").hide();
        $(".comentarios-info").css("filter", "blur(0)");
        $(".comentario button").hide();
        if ($(".c_usuario input").val().trim() === "") {
          $(".z_valoraciones p").css("filter", "blur(0)");
        }
      } else {
        $(".z_campos").show();
        $(".c_valoraciones").show();
        $(".comentario button").show();
        if ($(".c_usuario input").val().length > 0) {
          $(".comentario button").css("filter", "blur(0)");
        } else {
          $(".comentario button").css("filter", "blur(5px)");
        }
      }
    },
  });
  // Para establecer el comienzo (segundo en el que comience) del vídeo de la peli
  $("#comienzoVideoCheckbox").on({
    input: function () {
      let empiezaSegundos = $(this).val();
      if (empiezaSegundos >= 0 && empiezaSegundos <= 20) {
        let rutaVideo = $("#video").attr("src");

        // Variable que verifica si ya hay un fragmento
        let fragmentoTiempo = "";
        if (rutaVideo.includes("#t=")) {
          // Compruebo si existe un fragmento de tiempo y lo conservo
          fragmentoTiempo = rutaVideo.split("#t=")[1];

          // Quito el fragmento de tiempo de la ruta original
          rutaVideo = rutaVideo.split("#t=")[0];
        }

        // Creo el nuevo fragmento de vídeo
        let nuevoFragmentoTiempo = "#t=" + empiezaSegundos;

        // Creo la nueva ruta de vídeo
        let nuevaRutaVideo = rutaVideo + nuevoFragmentoTiempo;

        // Actualizo la ruta
        $("#video").attr("src", nuevaRutaVideo);
      }
    },
  });

  // Para cambiar el color de la fuente
  $("#cambioColor").on({
    input: function () {
      let colorSeleccionado = $(this).val();
      $("body").css("color", colorSeleccionado);
    },
  });

  // Para cambiar la fuente
  $("#cambioFuente").on({
    change: function () {
      let fuenteSeleccionada = $(this).val();
      $("body").css("font-family", fuenteSeleccionada);
    },
  });

  // Par que la imagen de la carátula se amplie al hacer doble click
  $("#caratula_ampliada").dblclick(function () {
    let ventanaModal = "<div id='modal' class='modal'>" +
    "<span class='cerrar'>&#10005</span>" +
    "<img class='modal-content' src='" + $(this).attr("src") + "'></div>";

    $("body").append(ventanaModal);
    let alturaBody = $("body").height();
    $(".modal").css("height",alturaBody);

    $(".cerrar").on({
      click: function(){
        $(".modal").remove();
        $(this).remove();
      },
    });
  });
}//end function configuracion()
/*------------------------------------------------------------------*/
//Función para que se ponga el personaje en grande según clickemos
function personaje() {
  $(".imagenes_img_img").on({
    click: function () {
      let ruta = $(this).attr("src");
      $("#z_multimedia_img_img").attr("src", ruta);
      $(".imagenes_img_img").removeClass("clicked");
      $(this).addClass("clicked");
      $(".imagenes_img_img").css("filter", filtroInicial);
      $(this).css("filter", "none");
    },
    // EFECTO HOVER
    mouseenter: function () {
      $(this).css("filter", filtroHover);
    },
    mouseleave: function () {
      // Si no hago click en la imagen
      if (!$(this).hasClass("clicked")) {
        $(this).css("filter", filtroInicial);
      } //end if
    },
  });
}//end function personaje()

/*Función para que los "botones" se pinten de negro según
 el personaje seleccionado */
function imgcirculoSelector() {
  $(".imagenes_img_img").each(function (index) {
    $(".imagenes_img_img")
      .eq(index)
      .on({
        click: function () {
          $(".circulo_selector_img").css("background-color", "white");
          $(".circulo_selector_img").css("width", "10px");
          $(".circulo_selector_img").css("height", "10px");
          $(".circulo_selector_img").eq(index).css("background-color", "black");
          $(".circulo_selector_img").eq(index).css("width", "15px");
          $(".circulo_selector_img").eq(index).css("height", "15px");
        },
      });
  });
}//end function imgcirculoSelector()

/* Función para que según la peli seleccionada y el botón clickado,
se actualice la imagen del personaje en grande seleccionada */
function circuloSelector() {
  //Ahora si clicamos en algún botón
  $(".circulo_selector_img").on({
    click: function () {
      //Todos se pondrán en blanco con el mismo tamaño
      $(".circulo_selector_img").css("background-color", "white");
      $(".circulo_selector_img").css("width", "10px");
      $(".circulo_selector_img").css("height", "10px");
      //Exceptuando el clicado que se pondrá en negro y aumenta de tamaño
      $(this).css("background-color", "black");
      $(this).css("width", "15px");
      $(this).css("height", "15px");
      //Miramos que posición es la que tiene el botón
      let posicion = $(this).index();
      //Obtenemos el nombre de la peli según la peli seleccionada
      let nombrePelicula = obtenerNombrePuroRutaPelicula(peliculaSeleccionada);
      //Buscamos exactamente el personaje(la imagen)
      let nombrePersonaje = obtenerSrcImg(nombrePelicula, posicion);
      // Y la ponemos en grande
      $("#z_multimedia_img_img").attr("src", nombrePersonaje);
      //Además se pone de color la imagen correspondiente y el resto se queda en gris
      $(".imagenes_img_img").css("filter", filtroInicial);
      $(".imagenes_img_img").eq(posicion).css("filter", filtroHover);
    },
  });
}//end function circuloSelector()

// FUNCION PARA HABILITAR LA ZONA DE LAS VALORACIONES
function habilitarValoraciones() {
  $(".c_usuario input").on({
    input: function () {
      let entradaUsuario = $(".c_usuario input").val();
      if (entradaUsuario.length > 0) {
        //Habilitado del formulario
        $(".c_valoraciones input").removeAttr("disabled");
        $(".c_valoraciones textarea").removeAttr("disabled");
        $(".c_valoraciones button").removeAttr("disabled");
        //Habilitado de las valoraciones
        $(".z_valoraciones p").css("filter", "none");
        $(".z_valoraciones button").addClass("eliminarComentario");
        $(".z_valoraciones button").css("cursor", "pointer");
        $(".z_valoraciones button").css("filter", "blur(0)");
        $(".z_valoraciones button").removeAttr("disabled");
      } else {
        //Deshabilitado del formulario
        $(".c_valoraciones input").attr("disabled", "disabled");
        $(".c_valoraciones textarea").attr("disabled", "disabled");
        $(".c_valoraciones button").attr("disabled", "disabled");
        //Deshabilitado de las valoraciones
        $(".z_valoraciones button").css("cursor", "initial");
        $(".z_valoraciones button").css("filter", "blur(5px)");

        $(".z_valoraciones button").attr("disabled", "disabled");
      }
    },
  });
}//end function habilitarValoraciones()

let contadorComentarios = 0;
function datosFormulario() {
  $("#aceptar").on({
    click: function () {
      let usuario = $(".c_usuario input").val();
      let valoracion = parseInt($(".c_valoraciones input").val());
      let comentario = $(".c_valoraciones textarea").val();
      let ruta = obtenerNombrePuroRutaPelicula(peliculaSeleccionada);
      let nombrePeli = obtenerTitulo(ruta);
      if (valoracion != "" && comentario.length > 0) {
        if (valoracion >= 0 && valoracion <= 5) {
          $("#salidaError").html("");
          $(".z_valoraciones").prepend(
            `<div class="comentario"><p id='${usuario}'>${usuario}-${nombrePeli}-${valoracion}-${comentario}</p><button id='eliminarComentario'>Eliminar comentario</button></div>`
          );
          contadorComentarios++;
          $("#contadorComentarios").html(contadorComentarios);
          $("#eliminarComentario").on({
            click: function () {
              // Selecciono el elemento directamente anterior al elemento actual (botón de eliminar)
              let nombre = $(this).prev("p").attr("id");
              if (nombre == $(".c_usuario input").val()) {
                $(this).closest(".comentario").remove();
                contadorComentarios--;
                $("#contadorComentarios").html(contadorComentarios);
              }
            },
          });
        } else {
          $("#salidaError").html(
            "El número de la valoración deber ser entre 0 y 5!"
          );
        }
      } else {
        $("#salidaError").html(
          "La valoración y el comentario son obligatorios!"
        );
      }
    },
  });

  //Limpiar el formulario
  $("#cancelar").on({
    click: function () {
      $(".c_valoraciones input").val("");
      $(".c_valoraciones textarea").val("");
    },
  });
}//end function datosFormulario()

//-----------------------------------//
//         FUNCIONES DE APOYO        //
//-----------------------------------//



// NO FUNCIONA
function paginacionNav() {
  let posicionActual = 0;
  let numPeliculas = $("nav img").length;
  let alturaPelicula = $("nav img").height();
  let alturaNav = $("nav").height();

  $("flecha-arriba").on({
    click: function() {
      if (posicionActual > 0) {
        posicionActual--;
        $("nav").css("top", -posicionActual * alturaPelicula);
      }
    },
  });

  $("flecha-abajo").on({
    click: function() {
      if (posicionActual > 0) {
        posicionActual++;
        $("nav").css("top", posicionActual * alturaPelicula);
      }
    },
  });
}




/* Función para que te devuelva el nombre de la peli según la ruta
que se le introduzca */
function obtenerNombrePuroRutaPelicula(ruta) {
  let partesRuta = ruta.split("/");
  let nombreArchivoConExtension = partesRuta.pop();
  let partesNombreArchivo = nombreArchivoConExtension.split(".");
  partesNombreArchivo.pop();
  let nombreArchivoSinExtension = partesNombreArchivo.join(".");
  return nombreArchivoSinExtension;
}

/*Función que recibe el nombre y una posición por parámetro y
te devuelve la ruta de la imagen */
function obtenerSrcImg(nombre, posicion) {
  let peliculas = {
    buscandoanemo: [
      "../assets/img/nemo.jpg",
      "../assets/img/dory.webp",
      "../assets/img/marlin.webp",
      "../assets/img/crush.webp",
      "../assets/img/bruce.webp",
    ],
    insideout: [
      "../assets/img/alegria.jpg",
      "../assets/img/asco.webp",
      "../assets/img/gruñon.webp",
      "../assets/img/miedo.jpg",
      "../assets/img/tristeza.webp",
    ],
    monstruos: [
      "../assets/img/sully.jpg",
      "../assets/img/boo.webp",
      "../assets/img/mike.webp",
      "../assets/img/randall.webp",
      "../assets/img/roz.webp",
    ],
    toystory: [
      "../assets/img/woody.jpeg",
      "../assets/img/buzz.webp",
      "../assets/img/rex.webp",
      "../assets/img/slinky.png",
      "../assets/img/perdigon.png",
    ],
  };
  return peliculas[nombre][posicion];
}

/*Función que recibe el nombre y una posición por parámetro y
te devuelve el nombre de cada personaje según la posición y película */
function obtenerNombrePersonaje(nombre, posicion) {
  let peliculas = {
    buscandoanemo: ["Nemo", "Dory", "Marlin", "Crush", "Bruce"],
    insideout: ["Alegria", "Asco", "Gruñon", "Miedo", "Tristeza"],
    monstruos: ["Sully", "Boo", "Mike Wazowsky", "Randall", "Roz"],
    toystory: ["Woody", "Buzz Lightyear", "Rex", "Slinky", "Perdigón"],
  };
  return peliculas[nombre][posicion];
}

function obtenerSrcImgCaratula(nombre) {
  let caratula = {
    buscandoanemo: "./assets/img/buscandoanemo.webp",
    insideout: "./assets/img/insideout.jpeg",
    monstruos: "./assets/img/monstruos.jpg",
    toystory: "./assets/img/toystory.jpg",
  };
  return caratula[nombre];
}

// Función que te devuelve el nombre de la peli bien escrito
// HACERLO CON DATA
function obtenerTitulo(nombre) {
  let titulos = {
    buscandoanemo: "Buscando a Nemo",
    insideout: "Inside Out",
    monstruos: "Monstruos S.A.",
    toystory: "Toy Story",
  };
  return titulos[nombre];
}
// Función que te devuelve el vídeo de la peli correspondiente
function obtenerSrcVideo(nombre) {
  let videos = {
    buscandoanemo: "../assets/mp4/buscandoanemo.mp4",
    insideout: "../assets/mp4/insideout.mp4",
    monstruos: "../assets/mp4/monstruos.mp4",
    toystory: "../assets/mp4/toystory.mp4",
  };
  return videos[nombre];
}

//He metido ID para que las busquedas sean más fáciles y así se puede realizar en diversas funciones
// De este modo, toda la información de cada peli se encuentra con los id: "buscandoanemo", "insideout", "monstruos"

function obtenerDatosPelicula(id) {
  let peliculas = [
    {
      id: "buscandoanemo",
      nombre: "Buscando a Nemo",
      nacionalidad: "EEUU",
      anio: 2003,
      genero: "Animación",
      sinopsis:
        "Marlin, un pez payaso, se embarca en un viaje épico para encontrar a su hijo Nemo, que ha sido capturado y llevado a un acuario.",
    },
    {
      id: "insideout",
      nombre: "Inside Out",
      nacionalidad: "EEUU",
      anio: 2015,
      genero: "Animación",
      sinopsis:
        "En la mente de una niña llamada Riley, sus emociones, Alegría, Tristeza, Miedo, Furia y Asco, intentan guiarla a través de su vida cotidiana mientras se enfrenta a un cambio importante en su vida.",
    },
    {
      id: "monstruos",
      nombre: "Monstruos SA",
      nacionalidad: "EEUU",
      anio: 2001,
      genero: "Animación",
      sinopsis:
        "Dos monstruos son empleados en una fábrica de sustos. Cuando descubren que una niña ha entrado en su mundo, intentan devolverla a casa antes de que sea demasiado tarde.",
    },
    {
      id: "toystory",
      nombre: "Toy Story",
      nacionalidad: "EEUU y UK",
      anio: 1995,
      genero: "Animación",
      sinopsis:
        "Los juguetes de Andy, un niño de seis años, temen que un nuevo regalo les sustituya en el corazón de su dueño. Woody, un vaquero que ha sido hasta ahora el juguete favorito, trata de tranquilizarlos hasta que aparece Buzz Lightyear. Lo peor es que el arrogante Buzz se cree que es una auténtico astronauta en plena misión para regresar a su planeta.",
    },
  ];

  let peliculaEncontrada = peliculas.find((pelicula) => pelicula.id === id);
  return peliculaEncontrada;
}

function obtenerNombreUsuario(comentario) {
  let posicionPrimerGuion = comentario.indexOf("-");
  let usuario = comentario.substring(0, posicionPrimerGuion);
  return usuario;
}
