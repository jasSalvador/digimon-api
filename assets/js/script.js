//EVENTO SCROLL NAVBAR
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("abajo", window.scrollY > 0);
})

//CAMBIAR COLOR TABLA
let toggle = document.getElementById("color");
let tabla = document.querySelector("table");

toggle.addEventListener('change', function() {
tabla.style.background = this.checked ? "rgb(214, 199, 228)" : "rgb(186, 223, 220)";
});

//MOSTRAR DIGIMON SEGUN FORMULARIO
//funcion coldback q se ejecuta en algun momento
let formDigimon = document.getElementById("formDigimon"); //captura elemento form

formDigimon.addEventListener("submit", function (event) {   //captura elemento q hace submit / escuchar un evento, cada q capte el suubmit ejecuta la funcion
    event.preventDefault();                               //quita los eventos x defecto
    let digimon = document.getElementById("formNombre").value;
    console.log(digimon);

    let url = "https://digimon-api.vercel.app/api/digimon/name/" + digimon
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let nombreDigimon = data[0].name;
            let imagenDigimon = data[0].img;
            let nivelDigimon = data[0].level;

            let titulo = document.querySelector(".info .card-title")
            titulo.innerText = nombreDigimon;

            let contImg = document.querySelector(".info .card-img");
            contImg.setAttribute("src", imagenDigimon)

            let nivel = document.querySelector(".info .card-text");
            nivel.innerText = ("Nivel: ") + nivelDigimon;

        })
        .catch(error => alert("Ah ocurrido un error"))
})


//LISTA DIGIMONES
function listaDigimon() {
    let url = "https://digimon-api.vercel.app/api/digimon";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            let insertarDatos = "";
            data.forEach((digimon, index) => {
                insertarDatos +=
                    //index linea 55 y 59 para agregar numeración a la tabla
                    `<tr>
                    <td>${index + 1}</td> 
                    <td>${digimon.name}</td>
                    <td>${digimon.level}</td>
                    <td><button class="btn btn-primary" onclick="verImagen('${digimon.name}', '${digimon.img}')">Ver imagen</button></td>
                </tr>`;
            });


            $("#listado").html(insertarDatos);
            $('#tableDigimon').DataTable({
        
                "bFilter": false, //elimina buscador
                //"lengthChange": false, //elimina opciones de seleccion registros
                "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
        });

        })
        .catch((error) => {
            console.error(error);
        });
}

listaDigimon();


//funcion mostrar imagen tabla
function verImagen(nombre, imagen) {
    //alert(imagen);

    document.getElementById("modalTitulo").innerText = nombre;
    document.getElementById("modalImagen").setAttribute("src", imagen);

    const myModal = new bootstrap.Modal("#modalImg");
    myModal.show();
}


