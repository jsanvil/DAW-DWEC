/*
ACTIVIDAD 4: 📂 UD2/act04/

Siguiendo con la página de ejemplo y la estructura de la actividad anterior, añade el código necesario para añadir a la página:
    Un nuevo párrafo al final del DIV 'lipsum' con el texto "Nuevo párrafo añadido por javascript" (fíjate que una palabra esta en negrita)
    Un nuevo elemento al formulario tras el 'Dato 1' con la etiqueta 'Dato 1 bis' y el INPUT con id 'input1bis' que al cargar la página tendrá escrito "Hola"
*/

// Un nuevo párrafo al final del DIV 'lipsum' con el texto
// "Nuevo párrafo <strong>añadido</strong> por javascript"
// (fíjate que una palabra esta en negrita)

let txtStart = document.createTextNode('Nuevo párrafo ');

let newStrong = document.createElement('strong');
let txtString = document.createTextNode('añadido');
newStrong.appendChild(txtString);

let txtEnd = document.createTextNode(' por javascript');

let newP = document.createElement('p');
newP.appendChild(txtStart);
newP.appendChild(newStrong);
newP.appendChild(txtEnd);

let divLipsum = document.getElementById('lipsum');
divLipsum.appendChild(newP);

// NOTA: Alternativa rápida no recomendada:
//   let divLipsum = document.getElementById('lipsum');
//   divLipsum.innerHTML += '<p>Nuevo párrafo <strong>añadido</strong> por javascript</p>'


// Un nuevo elemento al formulario tras el 'Dato 1' con la etiqueta 'Dato 1 bis'
// y el INPUT con id 'input1bis' que al cargar la página tendrá escrito "Hola"

let form = document.forms[0];
let fistLabel = form.querySelector('label');

let newLabel = fistLabel.cloneNode(true);
newLabel.id = 'input1bis';

form.insertBefore(newLabel, fistLabel);

form.getElementsByTagName('input')[0].value = 'Hola';
