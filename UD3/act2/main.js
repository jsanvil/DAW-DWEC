const btnCalcular = document.getElementById('btn-calcular')
const btnLimpiar = document.getElementById('btn-limpiar')
const display = document.querySelector('#calc_display span')

document.getElementById('btn-coma').addEventListener('click', () => pulsado('.'))
document.getElementById('btn-sumar').addEventListener('click', () => pulsado('+'))
document.getElementById('btn-restar').addEventListener('click', () => pulsado('-'))
document.getElementById('btn-multiplicar').addEventListener('click', () => pulsado('*'))
document.getElementById('btn-dividir').addEventListener('click', () => pulsado('/'))

for (let i = 0; i <= 9; i++) {
    document.getElementById('btn-'+i).addEventListener('click', () => pulsado(i))
}

function pulsado(tecla) {
    display.textContent += tecla
}

btnCalcular.addEventListener('click', calcular)
btnLimpiar.addEventListener('click', limpiar)

function limpiar() {
    display.textContent = ''
}

function calcular() {
    display.textContent = eval(display.textContent)
}

// CONTROL CON TECLADO

document.addEventListener('keydown', keyListener)

function keyListener(e) {
    console.log(e.key)

    // Ejemplo utilizando expresión regular
    // if (/[0-9\+\-\/\*]/.test(e.key)) {
    //     pulsado(e.key)
    // }

    let teclasValidas = '0123456789+-/*.'
    if (teclasValidas.indexOf(e.key) >= 0) {
        pulsado(e.key)
    }

    if (e.key == 'Enter') {
        calcular()
    }

    if (e.key == 'Backspace') {
        display.textContent = display.textContent.slice(0, -1)
    }

    if (e.key == 'Escape' || e.key == 'Delete') {
        
    }
}