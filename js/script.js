// Variables
let filtroInicial = "grayscale(100%)"; // Filtro inicial para las imágenes
let filtroHover = "grayscale(0%)"; // Filtro al pasar el ratón sobre las imágenes
let numPeliculas = 3; // Número de películas en el <nav>
let efectoSlideUp = "slow"; // Duración del slideUp
let efectoSlideDown = "slow"; // Duración del slideDown
let bordeSeleccionado = "2px solid red"; // Estilo del borde para la película seleccionada

$(document).ready(function () {
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

//-----------------------------------//
//   FUNCIONES QUE AFECTAN AL HTML   //
//-----------------------------------//

function inicializar() {
  //Filtro para las pelis de la navegación
  $("nav img").css("filter", filtroInicial);
  //Deshabilitado del formulario
  $(".c_valoraciones input").attr("disabled", "disabled");
  $(".c_valoraciones textarea").attr("disabled", "disabled");
  $(".c_valoraciones button").attr("disabled", "disabled");
  //Deshabilitado de las valoraciones
  $(".z_valoraciones p").css("filter", "blur(5px)");
  $(".z_valoraciones button").css("filter", "blur(5px)");
  $(".c_usuario input").attr("disabled", "disabled");
  $(".casillas input").attr("disabled", "disabled");
}

let peliculaSeleccionada = "";
function getPeliculaSeleccionada() {
  $("nav img").click(function () {
    peliculaSeleccionada = $(this).attr("src");
  }),
    $(".seleccionPeli").change(function () {
      peliculaSeleccionada = $(this).val();
    });
  return peliculaSeleccionada;
}

function cambioPeli(rutaImg) {
  let peli = obtenerNombrePuroRutaPelicula(rutaImg);

  //Para poner la carátula en grande
  let imagen = obtenerSrcImgCaratula(peli);

  // PREGUNTAR AL PROFESOR COMO HACERLO AL REVÉS
  $("#caratula_ampliada")
    .slideUp("slow", function () {
      $("#caratula_ampliada").attr("src", imagen);
    })
    .slideDown("slow");

  //La variable nombre es para obtener exactamente el nombre de la peli

  $(".imagenes_img_img").css("filter", filtroInicial);
  //Para insertar los personajes de cada peli
  $(".imagenes_img_img").each(function (index) {
    let imgSrc = obtenerSrcImg(peli, index);
    $(this).attr("src", imgSrc);

    // PREGUNTAR AL PROFESOR SI HACERLO CON DATA.* O NO
    //$(this).eq(index).attr("src", obtenerSrcImg(parseInt($(this).data("pos"))));
  });
  //Para poner el nombre de los personajes de cada peli
  $("figcaption").each(function (index) {
    let nombrePersonaje = obtenerNombrePersonaje(peli, index);
    $(this).html(nombrePersonaje);
  });
  //Cambio de título
  let titulo = obtenerTitulo(peli);
  $("header h1").html(titulo);
  //Puesta de vídeo
  let video = obtenerSrcVideo(peli);
  $("video").attr("src", video);

  //Reseteo de los otros campos
  $("#z_multimedia_img_img").attr("src", "");
  $(".circulo_selector_img").css("background-color", "white");
  $(".circulo_selector_img").css("width", "10px");
  $(".circulo_selector_img").css("height", "10px");

  //Habilitar usuario
  $(".c_usuario input").removeAttr("disabled");
  //Habilitar casillas
  $(".casillas input").removeAttr("disabled");

  // ACTUALIZACION DE DATOS DE LA PELI
  let datosPelicula = obtenerDatosPelicula(peli);
  if (datosPelicula) {
    let infoPelicula = `${datosPelicula.nacionalidad} - ${datosPelicula.anio} - ${datosPelicula.genero}`;
    $("#infoPelicula").text(infoPelicula);
    $("#sinopsis").text(datosPelicula.sinopsis);
  }
  //Filtros de gris y color en el clicado
}

/* Función que realiza el cambio de los elementos según la peli seleccionada
en el menú de navegación */
function cargar_pelicula() {
  $("nav img").on({
    click: function () {
      //Para poner la carátula en grande
      let rutaImg = $(this).attr("src");

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
}

function configuracion() {
  $(".seleccionPeli").on({
    change: function () {
      let rutaImagenSeleccionada = $(this).val();
      cambioPeli(rutaImagenSeleccionada);

      $("nav img").each(function () {
        if ($(this).attr("src") == rutaImagenSeleccionada) {
          $("nav img").removeClass("clicked");
          $(this).addClass("clicked");
          $("nav img").css("filter", filtroInicial);
          $(this).css("filter", "none");
          $("nav img").css("border", "none");
          $(this).css("border", "3px inset purple");
          $("nav img").css("box-shadow", "none");
          $(this).css("box-shadow", "0px 0px 10px black");
        }
      });
    },
  });

  $("#mostrarSinopsisCheckbox").on({
    change: function () {
      if ($(this).is(":checked")) {
        $("#sinopsis").slideUp("slow", function () {
          $("#imgSinopsis").attr("src", peliculaSeleccionada);
          $("#sinopsis").hide();
        });
        $("#imgSinopsis").slideDown("slow");
      } else {
        $("#imgSinopsis")
          .slideUp("slow", function () {
            $("#imgSinopsis").attr("src", "");
            $("#sinopsis").show();
          })
          .slideDown("slow");
      }
    },
  });

  $("#mostrarVideoCheckbox").on({
    change: function () {
      if ($(this).is(":checked")) {
        $(".z_multimedia_video").fadeOut("slow");
        $(".z_multimedia_img").css("border", "none");
        $("#z_multimedia_img_img").css("transform", "scale(1.5)");
      } else {
        $(".z_multimedia_video").fadeIn("slow");
        $("#z_multimedia_img_img").css("transform", "scale(1)");
      }
    },
  });

  $("#invertirImagenesCheckbox").on({
    change: function () {
      if ($(this).is(":checked")) {
        $("nav").fadeOut("slow", function () {
          $("nav").css("flex-direction", "column-reverse").fadeIn("slow");
        });
      } else {
        $("nav").fadeOut("slow", function () {
          $("nav").css("flex-direction", "column").fadeIn("slow");
        });
      }
    },
  });

  let esRepetido = false;
  function repetir() {
    if (esRepetido) {
      $(".imagenes_img_img").fadeToggle(2000, repetir);
    }
  }

  $("#carruselImagenesCheckbox").on({
    change: function () {
      if ($(this).is(":checked")) {
        esRepetido = true;
        repetir();
      } else {
        esRepetido = false;
        $(".imagenes_img_img").stop(true, true).fadeIn(2000);
      }
    },
  });

  $(".imagenes_img_img, .circulo_selector_img").on({
    click: function () {
      if ($("#carruselImagenesCheckbox").is(":checked")) {
        esRepetido = false;
        $(".imagenes_img_img").stop(true, true).fadeIn(2000);
        $("#carruselImagenesCheckbox").prop("checked", false);
      }
    },
  });

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
        $(".comentario button").css("filter", "blur(0)");
      }
    },
  });
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

}

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
}

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
}
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
}

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
        $(".z_valoraciones p").css("filter", "blur(5px)");
        $(".z_valoraciones button").css("cursor", "initial");
        $(".z_valoraciones button").css("filter", "blur(5px)");
        $(".z_valoraciones button").attr("disabled", "disabled");
      }
    },
  });
}

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
}

//-----------------------------------//
//         FUNCIONES DE APOYO        //
//-----------------------------------//

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
  };
  return peliculas[nombre][posicion];
}

function obtenerSrcImgCaratula(nombre) {
  let caratula = {
    buscandoanemo: "./assets/img/buscandoanemo.webp",
    insideout: "./assets/img/insideout.jpeg",
    monstruos: "./assets/img/monstruos.jpg",
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
  };
  return titulos[nombre];
}
// Función que te devuelve el vídeo de la peli correspondiente
function obtenerSrcVideo(nombre) {
  let videos = {
    buscandoanemo: "../assets/mp4/buscandoanemo.mp4",
    insideout: "../assets/mp4/insideout.mp4",
    monstruos: "../assets/mp4/monstruos.mp4",
  };
  return videos[nombre];
}

// CAMBIAR ESTO A DATA
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
  ];

  let peliculaEncontrada = peliculas.find((pelicula) => pelicula.id === id);
  return peliculaEncontrada;
}

function obtenerNombreUsuario(comentario) {
  let posicionPrimerGuion = comentario.indexOf("-");
  let usuario = comentario.substring(0, posicionPrimerGuion);
  return usuario;
}

// PREGUNTAR AL PROFESOR SI ESTO ESTÁ BIEN:
/*
- PREGUNTAR SI EL NÚMERO DE COMENTARIOS Y VALORACIÓN VA AQUÍ O EN LA ZONA DE LA DERECHA -
Sinopsis: Deberá aparecer información sobre la película, año, nacionalidad, número de comentarios y valoración (estos dos elementos son dinámicos con respecto a lo introducido
por los usuarios).

- PREGUNTAR SI DESCRIPCIÓN ES EL NOMBRE DE CADA ACTOR -
Imágenes: Deberán aparecer máximo cinco imágenes por película. Debajo de cada imagen
debe aparecer descripción.

- PREGUNTAR COMO HACER AL REVÉS EL slideUp y slideDown -
Debe ocultarse con un efecto slideDown y mostrarse con slideUp

- PREGUNTAR SI HACER LOS ACTORES CON DATA.* O NO -
Los datos relacionados con la película como: título, nacionalidad, año, genero, etc. debe incluirse
como atributos data-* a la imagen, desde aquí se cogerá esta información para ir actualizando la
maqueta.

- PREGUNTAR SI EN VEZ DE DESCRIPCIÓN ES GÉNERO -
Sinopsis: Año, Nacionalidad, descripción

- PREGUNTAR SI SOLO TIENE QUE SER LO QUE PIDE O LO QUE TENEMOS ESTÁ BIEN (CAMBIA CARÁTULA, ACTORES...) -
Define una función que sea cargar_pelicula, que seleccione la película indicada y carga toda la
información relacionada con la película en la maqueta: título, sinopsis y todas las imágenes
relacionadas.

- DECIR QUE LE HEMOS PUESTO FUENTE A TODO, NO SÓLO AL TÍTULO PORQUE QUEDA MEJOR -

- PONE ACTUALIZAR EN SINOPSIS TÍTULO Y SINOPSIS PERO NO PUEDE SER -
Debe incluirse: título año, nacionalidad, género y sinopsis.

- EN IMÁGENES HAY QUE PONER ESO? O CON LOS NOMBRES ESTÁ BIEN, COMO LO TENEMOS -
Deben mostrarse máximo de 5 imágenes, con una numeración indicando género y número, por
ejemplo, Acción 1, Acción 2, etc. Así la película principal es acción (elimino la tilde), las imágenes se denominarán
accion_01.xxx, accion_02.xxx, etc, donde xxx es la extensión de la imagen.

- PREGUNTAR SI NO HAY IMAGEN DE ACTOR QUÉ HACER -
c) Casilla para mostrar u ocultar el video. En caso de ocultarse el video la imagen debe ocupar más
espacio del que ocupa cuando está el video. Realizarlo con un fadeOut

- PREGUNTAR QUÉ HAY QUE HACER CON EL COLOR SELECCIONADO DEL SELECT -
h) Define un color con una variable que puedan ser cambiado de forma interactiva.
*/
