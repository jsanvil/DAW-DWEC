/*
ACTIVIDAD 1: 📂 UD2/act01/

Descarga esta página html de ejemplo en el directorio de la actividad.

Crea el archivo main.js

Incluye el script en la página HTML con un <script src="main.js"> al final del <body> o con un <script src="main.js" defer> en el <head>.

Añade el código necesario para obtener los siguientes elementos y mostrarlos por consola:

    El elemento con id 'input2'
    La colección de párrafos
    Lo mismo pero sólo de los párrafos que hay dentro del div 'lipsum'
    El formulario (ojo, no la colección con el formulario sino sólo el formulario)
    Todos los elementos input
    Sólo los input con nombre 'sexo'
    Los items de lista con clase 'important' (sólo los <li>)
*/

// El elemento con id 'input2'

let input2 = document.getElementById('input2');
console.log(input2);

// La colección de párrafos

let parrafos = document.getElementsByTagName('p');
console.log(parrafos);

// Lo mismo pero sólo de los párrafos que hay dentro del div 'lipsum'

let lipsum = document.getElementById('lipsum');
let parrafosDentroLipsun = lipsum.getElementsByTagName('p');
console.log(parrafosDentroLipsun);
// alternativa con querySelector
let lipsumQuery = document.querySelectorAll('#lipsum p');
console.log(lipsumQuery);

// El formulario (ojo, no la colección con el formulario sino sólo el formulario)
let form = document.forms[0];
console.log(form);

// Todos los elementos input
let inputs = document.getElementsByTagName('input');
console.log(inputs);

// Sólo los input con nombre 'sexo'
let sexo = document.querySelectorAll('[name=sexo]');
console.log(sexo);

// Los items de lista con clase 'important' (sólo los <li>)
let importantItems = document.querySelectorAll('li.important')
console.log(importantItems);
