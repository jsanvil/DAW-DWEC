/**
* DWEC UD2 - Actividad 5
*/

/**
 * REQUISITO: Función borrar()
 * -  Limpia el contenido del <div> 'tabla', los valores del formulario y el contenido del <ol> 'seleccion'.
 *
 *   NOTA:
 *     Responsabilidad única: cada función debe tener una responsabilidad bien definida.
 *     En este caso, las funciones borrarInputs(), borrarTabla() y borrarLista() se encargan de borrar los elementos correspondientes.
 *     La función borrar() se encarga de llamar a las anteriores.
 **/
function borrar () {
  borrarTabla()
  //borrarInputs()
  borrarLista()
}

/**
 * Borra el contenido de los `<input>` 'table_x' y 'table_y'
 */
function borrarInputs () {
  document.getElementById('table_x').value = ''
  document.getElementById('table_y').value = ''
}

/**
 * Borra el contenido del `<div>` 'tabla'
 */
function borrarTabla () {
  const tabla = document.getElementById('tabla')
  while (tabla.lastElementChild) {
    tabla.removeChild(tabla.lastElementChild)
  }
}

/**
 * Borra el contenido del `<ol>` 'seleccion'
 */
function borrarLista () {
  const lista = document.getElementById('seleccion')
  while (lista.lastElementChild) {
    lista.removeChild(lista.lastElementChild)
  }
}

/**
  * REQUISITO: función generarTabla()
  * - Lea los valores de los <input> de 'table_x' y 'table_y'
  * - Cree una tabla de table_x filas y table_y columnas dentro del <div> 'tabla'
  * - Cada celda de la tabla tendrá un un id 'celda_x_y'
  *   donde x es el número de fila y y el número de columna. El texto del <span> será 'x,y'.
  */
function generarTabla () {
  borrarTabla()
  borrarLista()

  const x = document.getElementById('table_x').value
  const y = document.getElementById('table_y').value

  const newTable = document.createElement('table')

  for (let j = 0; j < y; j++) {
    const newTr = document.createElement('tr')

    for (let i = 0; i < x; i++) {
      const newTd = document.createElement('td')
      newTd.id = `celda_${i}_${j}`

      const newSpan = document.createElement('span')
      const cellText = document.createTextNode(`${i},${j}`)
      newSpan.appendChild(cellText)
      newTd.appendChild(newSpan)

      newTr.appendChild(newTd)
    }

    newTable.appendChild(newTr)
  }

  const divTabla = document.getElementById('tabla')
  divTabla.appendChild(newTable)
}

/**
 * REQUISITO: Función seleccionaCelda()
 *   - Seleccione una celda al azar de la tabla y cambie su color de fondo, por ejemplo a rojo.
 *   - Añada un nuevo elemento `<li>` al `<ol>` 'seleccion' con el texto de la celda seleccionada ('x,y').
 *   - Modifica index.html para aparezca un botón 'Seleccionar' y en el atributo onclick valor 'seleccionaCelda()'.
 *   - Si existen celdas seleccionadas con anterioridad, se debe cambiar el color de fondo a otro distinto de la seleccionada actualmente, por ejemplo a gris.
 *   - Consejo: resultará más fácil si modificas las clases de las celdas en lugar de los estilos directamente.
 */
function seleccionaCelda () {
  const tabla = document.getElementById('tabla').querySelector('table')

  // celda seleccionada aleatoriamente
  let celdaSeleccionada
  // coordenada X de la celda seleccionada
  let selX
  // coordenada Y de la celda seleccionada
  let selY

  // Además, se usa 'try...catch' para capturar la excepción que se lanza al no quedar celas disponibles
  try {
    // 'Desestructuración de arrays': para obtener los valores de retorno de la función en variables separadas
    [celdaSeleccionada, selX, selY] = seleccionaCeldaAleatoria(tabla)
  } catch (e) {
    alert(e.message)
    console.error(e.message)
    return
  }

  console.log(`Celda seleccionada: ${selX},${selY}`)

  // cambiamos el color de la celda
  marcaCeldaSeleccionada(tabla, celdaSeleccionada)

  // añadimos la celda seleccionada a la lista
  agregarCelda(selX, selY)
}

/**
 *  Devuelve la celda de la tabla que se encuentra en la posición (x,y).
 */
function getCelda (tabla, x, y) {
  return tabla.rows[y].cells[x]
}

/**
 * Devuelve true si la celda tiene la clase 'red' o 'grey', false en caso contrario.
 */
function estaSeleccionada (celda) {
  return celda.classList.contains('red') || celda.classList.contains('grey')
}

/**
 * Devuelve la celda seleccionada aleatoriamente, junto con sus coordenadas X e Y.
 *
 * Si no quedan celdas disponibles, lanza una excepción.
 */
function seleccionaCeldaAleatoria (tabla) {
  const y = tabla.rows.length
  const x = tabla.rows[0].cells.length

  const numItemsLista = document.getElementById('seleccion').children.length

  if (numItemsLista >= x * y) {
    throw new Error('No hay más celdas disponibles')
  }

  // generamos números aleatorios en el rango de las 'x' y las 'y'
  let randX = Math.floor(Math.random() * x)
  let randY = Math.floor(Math.random() * y)

  // obtenemos la celda correspondiente
  let celdaCandidata = getCelda(tabla, randX, randY)

  // si la celda ya está seleccionada, buscamos otra
  while (estaSeleccionada(celdaCandidata)) {
    randX = Math.floor(Math.random() * x)
    randY = Math.floor(Math.random() * y)
    celdaCandidata = getCelda(tabla, randX, randY)
  }

  return [celdaCandidata, randX, randY]
}

/**
 * Marca la celda seleccionada con la clase 'red'.
 * Si existe una celda con clase 'red', la cambia a 'grey'.
 */
function marcaCeldaSeleccionada (tabla, celda) {
  // si existe una celda con clase 'red', la cambiamos a 'grey'
  tabla.querySelector('.red')?.classList.replace('red', 'grey')
  // ponemos la celda seleccionada en rojo
  celda.classList.add('red')
}

/**
 * Añade un nuevo elemento `<li>` al `<ol>` 'seleccion' con el texto de la celda seleccionada ('x,y').
 */
function agregarCelda (randX, randY) {
  const seleccion = document.getElementById('seleccion')
  const newLi = document.createElement('li')
  const cellText = document.createTextNode(`${randX},${randY}`)
  newLi.appendChild(cellText)
  seleccion.appendChild(newLi)
}
