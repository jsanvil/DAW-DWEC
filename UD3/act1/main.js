const btnCalcular = document.getElementById('btn-calcular')
const btnLimpiar = document.getElementById('btn-limpiar')
const display = document.querySelector('#calc_display span')

const teclas = document.querySelectorAll('.calc_tecla')

Array.from(teclas).forEach(tecla => {
    if (tecla.id != 'btn-limpiar' && tecla.id != 'btn-calcular') {

        tecla.addEventListener('click', () => {
            let valor = tecla.firstElementChild.textContent
            pulsado(valor)
        })

    }
});

btnCalcular.addEventListener('click', calcular)
btnLimpiar.addEventListener('click', () => display.textContent = '')

function calcular() {
    display.textContent = eval(display.textContent)
}

function pulsado(tecla) {
    display.textContent += tecla
}
