

function obtenerSrcImg(nombre,posicion) {
    let peliculas={
      "buscandoanemo" : ["../assets/img/nemo.jpg","../assets/img/dory.webp","../assets/img/marlin.webp","../assets/img/crush.webp","../assets/img/bruce.webp"],
      "insideout" : ["../assets/img/alegria.jpg","../assets/img/asco.webp","../assets/img/gruñon.webp","../assets/img/miedo.jpg","../assets/img/tristeza.webp"],
      "monstruos" : ["../assets/img/sully.jpg","../assets/img/boo.webp","../assets/img/mike.webp","../assets/img/randall.webp","../assets/img/roz.webp"]
      };
    return peliculas[nombre][posicion];
  }

  function obtenerNombrePersonaje(nombre,posicion) {
    let peliculas={
      "buscandoanemo" : ["Nemo","Dory","Marlin","Crush","Bruce"],
      "insideout" : ["Alegria","Asco","Gruñon","Miedo","Tristeza"],
      "monstruos" : ["Sully","Boo","Mike Wazowsky","Randall","Roz"]
      };
    return peliculas[nombre][posicion];
  }

console.log(obtenerNombrePersonaje("insideout", 3));