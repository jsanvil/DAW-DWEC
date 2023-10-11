'use strict'

setTimeout(() => alert('Hola 👋'), 2000)

let btn = document.getElementById("boton");

console.log(btn);

let n = 0;
let timeoutId = null;

function boton() {
    n++
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        btn.textContent = `Pulsado ${n} veces`
    }, 3000)
}
