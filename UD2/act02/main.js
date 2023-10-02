/*
ACTIVIDAD 2: 📂 UD2/act02/

Siguiendo con la página de ejemplo y la estructura de la actividad anterior, añade el código necesario para obtener los siguientes elementos y mostrarlos por consola:

    El primer párrafo que hay dentro del div con id 'lipsum'
    El segundo párrafo de 'lipsum'
    El último item de la lista
    El label de 'Escoge sexo'
*/

// El primer párrafo que hay dentro del div con id 'lipsum'

let lipsum = document.getElementById('lipsum');
let primerHijo = lipsum.firstElementChild;
console.log(primerHijo);

// El segundo párrafo de 'lipsum'
let siguenteElemento = primerHijo.nextElementSibling;
console.log(siguenteElemento);

// El último item de la lista
//let lista = document.getElementsByTagName('ul')[0];
let lista = document.querySelector('ul');
let ultimoItemLista = lista.lastElementChild;
console.log(ultimoItemLista);

// El label de 'Escoge sexo'
let form = document.querySelector('form');
let label = form.lastElementChild.previousElementSibling;
console.log(label);