'use strict'

// Abre una nueva ventana de dimensiones 500x200px
// en la posición (100,200)

let ventana = window.open('#', 'nueva', 'popup,width=500,height=200,top=100,left=200')

// Escribe en ella (con document.write())
// un título h1 que diga 'Hola'
ventana.document.write('<h1>Hola</h1>')

// Muévela 300 px hacia abajo y 100 a la izquierda.
ventana.moveBy(300, 100)

// Cambia su tamaño para que sea de 300x300 px.
ventana.resizeTo(300,300)