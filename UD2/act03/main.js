/*
ACTIVIDAD 3: 📂 UD2/act03/

Siguiendo con la página de ejemplo y la estructura de la actividad anterior,
añade el código necesario para realizar las los siguientes operaciones:

    Selecciona y muestra por consola el innerHTML de la etiqueta de 'Escoge sexo'.
    Selecciona y muestra por consola textContent de esa etiqueta.
    Modifica el textContent de esa etiqueta para que ponga 'Género:'.
    Selecciona y muestra por consola valor del primer input de 'sexo'.
    Selecciona y muestra por consola valor del 'sexo' que esté seleccionado.
*/

// Selecciona y muestra por consola el innerHTML de la etiqueta de 'Escoge sexo'.

let form = document.forms[0];
let label = form.lastElementChild.previousElementSibling;
console.log(label.innerHTML);

// Selecciona y muestra por consola textContent de esa etiqueta.

console.log(label.textContent);

// Modifica el textContent de esa etiqueta para que ponga 'Género:'.

label.firstChild.textContent = 'Género:';

// Selecciona y muestra por consola valor del primer input de 'sexo'.

let labelFirstElement = label.getElementsByTagName('input')[0];
console.log(labelFirstElement.value);

// Selecciona y muestra por consola valor del 'sexo' que esté seleccionado.

let selectedValue = label.querySelector('input:checked').value;
console.log(selectedValue);

// opcional: dar foco al primer input de tipo texto
form.querySelector('input[type="text"]').focus()