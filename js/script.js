// Variables
let filtroInicial = "grayscale(100%)"; // Filtro inicial para las imágenes
let filtroHover = "grayscale(0%)"; // Filtro al pasar el ratón sobre las imágenes
let numPeliculas = 3; // Número de películas en el <nav>
let efectoSlideUp = 500; // Duración del slideUp
let efectoSlideDown = 500; // Duración del slideDown
let bordeSeleccionado = "2px solid red"; // Estilo del borde para la película seleccionada

$(document).ready(function () {
  cambioPelicula();
  inicializar();
  hoverNavegacion();
  personaje();
  imgcirculoSelector();
  circuloSelector();
  actualizoDescripcionPelicula();
});


function inicializar() {
  $("nav img").css("filter", filtroInicial);
}

// Función para cuando se pasa el ratón por encima de las imágenes
function hoverNavegacion() {
  $("nav img").on({
    mouseenter: function () {
      $(this).css("filter", filtroHover);
    },
    mouseleave: function () {
      // Si no hago click en la imagen
      if (!$(this).hasClass("clicked")) {
        $(this).css("filter", filtroInicial);
      } //end if
    },
    click: function () {
      $("nav img").removeClass("clicked");
      $(this).addClass("clicked");
      $("nav img").css("filter", filtroInicial);
      $(this).css("filter", "none");
      $("nav img").css("border", "none");
      $(this).css("border", "3px inset purple");
      $("nav img").css("box-shadow", "none");
      $(this).css("box-shadow", "0px 0px 10px black");
    },
  });
}

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

function obtenerNombrePelicula(ruta) {
  let partesRuta = ruta.split("/");
  let nombreArchivoConExtension = partesRuta.pop();
  let partesNombreArchivo = nombreArchivoConExtension.split(".");
  partesNombreArchivo.pop();
  let nombreArchivoSinExtension = partesNombreArchivo.join(".");
  return nombreArchivoSinExtension;
}

function obtenerNombrePersonaje(nombre, posicion) {
  let peliculas = {
    buscandoanemo: ["Nemo", "Dory", "Marlin", "Crush", "Bruce"],
    insideout: ["Alegria", "Asco", "Gruñon", "Miedo", "Tristeza"],
    monstruos: ["Sully", "Boo", "Mike Wazowsky", "Randall", "Roz"],
  };
  return peliculas[nombre][posicion];
}

function obtenerTitulo(nombre) {
  let titulos = {
    buscandoanemo: "Buscando a Nemo",
    insideout: "Inside Out",
    monstruos: "Monstruos S.A.",
  };
  return titulos[nombre];
}

function obtenerSrcVideo(nombre) {
  let videos = {
    buscandoanemo: "../assets/mp4/buscandoanemo.mp4",
    insideout: "../assets/mp4/insideout.mp4",
    monstruos: "../assets/mp4/monstruos.mp4",
  };
  return videos[nombre];
}

function cambioPelicula() {
  $("nav img").on({
    click: function () {
      let rutaImg = $(this).attr("src");
      $("#caratula_ampliada").attr("src", rutaImg);

      let nombre = obtenerNombrePelicula(rutaImg);
      $(".imagenes_img_img").each(function (index) {
        let imgSrc = obtenerSrcImg(nombre, index);
        $(this).attr("src", imgSrc);
        $(this).css("width", "100%");
        // PREGUNTAR A CHICOTE SI HACERLO CON DATA.* O NO
        //$(this).eq(index).attr("src", obtenerSrcImg(parseInt($(this).data("pos"))));
      });

      $("figcaption").each(function (index) {
        let nombrePersonaje = obtenerNombrePersonaje(nombre, index);
        $(this).html(nombrePersonaje);
      });
      let titulo = obtenerTitulo(nombre);
      $("header h1").html(titulo);

      let video = obtenerSrcVideo(nombre);
      $("video").attr("src", video);
    },
  });
}

function personaje() {
  $(".imagenes_img_img").on({
    click: function () {
      let ruta = $(this).attr("src");
      $("#z_multimedia_img_img").attr("src", ruta);
    },
  });
}

function imgcirculoSelector() {
  $(".imagenes_img_img").each(function (index) {
    $(".imagenes_img_img")
      .eq(index)
      .on({
        click: function () {
          $(".circulo_selector_img").css("background-color", "white");
          $(".circulo_selector_img").eq(index).css("background-color", "black");
        },
      });
  });
}

// HACER QUE AL PULSAR OTRA IMAGEN DEL NAV NO SE MANTENGA LA IMAGEN DEL ACTOR EN GRANDE

function circuloSelector() {
  let imagenClicada = null;
  $("nav img").on({
    click: function () {
      imagenClicada = $(this).attr("src");
    }
  });

  $(".circulo_selector_img").on({
    click: function () {
      $(".circulo_selector_img").css("background-color", "white");
      $(this).css("background-color", "black");
      let posicion = $(this).index();
      let nombrePelicula = obtenerNombrePelicula(imagenClicada);
      let nombrePersonaje = obtenerSrcImg(nombrePelicula, posicion);
      $("#z_multimedia_img_img").attr("src", nombrePersonaje);
    },
  });
}

// CAMBIAR ESTO A DATA
function obtenerDatosPelicula(nombrePelicula) {
  let peliculas = [
    {
      nombre: "Buscando a Nemo",
      nacionalidad: "EEUU",
      anio: 2003,
      genero: "Animación",
      sinopsis:
        "Marlin, un pez payaso, se embarca en un viaje épico para encontrar a su hijo Nemo, que ha sido capturado y llevado a un acuario.",
    },
    {
      nombre: "Inside Out",
      nacionalidad: "EEUU",
      anio: 2015,
      genero: "Animación",
      sinopsis:
        "En la mente de una niña llamada Riley, sus emociones, Alegría, Tristeza, Miedo, Furia y Asco, intentan guiarla a través de su vida cotidiana mientras se enfrenta a un cambio importante en su vida.",
    },
    {
      nombre: "Monstruos SA",
      nacionalidad: "EEUU",
      anio: 2001,
      genero: "Animación",
      sinopsis:
        "Dos monstruos son empleados en una fábrica de sustos. Cuando descubren que una niña ha entrado en su mundo, intentan devolverla a casa antes de que sea demasiado tarde.",
    },
  ];

  let peliculaEncontrada = peliculas.find(
    (pelicula) => pelicula.nombre === nombrePelicula
  );
  return peliculaEncontrada;
}

// CAMBIAR ESTO A DATA
function actualizoDescripcionPelicula() {
  $("nav img").on({
    click: function () {
      let nombrePelicula = $(this).attr("alt");
      let datosPelicula = obtenerDatosPelicula(nombrePelicula);

      if (datosPelicula) {
        let infoPelicula = `${datosPelicula.nacionalidad} - ${datosPelicula.anio} - ${datosPelicula.genero}`;
        $("#infoPelicula").text(infoPelicula);
        $("#sinopsis").text(datosPelicula.sinopsis);
      }
    },
  });


}
