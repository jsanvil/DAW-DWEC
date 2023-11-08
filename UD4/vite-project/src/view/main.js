// Vista principal de la aplicación
// ================================
//
// En esta vista se maneja la lógica de la aplicación
// - Carga y guarda los datos en el localStorage
// - Crea, edita y elimina items
// - Renderiza la lista de items
// - Aplica los filtros
//
// ESTO ES UNA MALA PRÁCTICA, DEMASIADAS RESPONSABILIDADES!!!

// ---------- IMPORTS ----------

// Importa el archivo de estilos personalizados
import '../styles/custom.scss'

// Importa la clase ItemList que es nuestro MODELO de datos
import ItemList from '../model/ItemList.class'

// ---------- VARIABLES ----------

// Lista de items a mostrar en la VISTA
let items = []

// ---------- STORAGE ----------

// Define la clave para guardar los datos en el localStorage
const storageKey = 'groceriesApp'

/**
 * Carga los items desde el localStorage
 * Si no hay datos, crea una lista vacía
 */
function loadItems () {
  const json = window.localStorage.getItem(storageKey)
  if (!json) {
    items = new ItemList()
  } else {
    items = new ItemList(JSON.parse(json))
  }
}

/**
 * Guarda los items en el localStorage
 * Si hay un error, lo muestra en la consola
 *
 * Al escribir en localStorage se deben controlar los errores:
 * - Puede ser que el localStorage esté lleno
 * - Puede ser que el navegador no soporte localStorage
 * - Puede ser que el usuario haya bloqueado el uso de localStorage
 * - Puede ser que el usuario haya bloqueado el uso de localStorage en modo privado
 */
function saveItems () {
  try {
    const json = JSON.stringify(items.get())
    window.localStorage.setItem(storageKey, json)
  } catch (err) {
    console.error(err)
  }
}

// ---------- INIT ----------

/**
 * Inicializa la aplicación
 */
function init () {
  const form = document.getElementById('itemForm')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('itemName')
    if (!input.value) return
    createItem(input.value)
    input.value = ''
  })
  loadItems()
  renderItemList()
}

window.onload = init

// ---------- ITEM MANAGEMENT ----------

/**
 * Crea un nuevo item, partiendo de un nombre dado, y lo agrega a la lista
 *
 * @param {string} value
 */
function createItem (value) {
  items.create(value)
  renderItemList()
  saveItems()
}

/**
 * Edita el nombre de un item, pidiendo el nuevo nombre al usuario
 *
 * @param {Item} item
 */
function editItem (item) {
  const newName = prompt('Nuevo nombre:', item.name)
  if (!newName) return
  item.name = newName
  renderItemList()
  saveItems()
}

/**
 * Elimina un item, pidiendo confirmación al usuario
 *
 * @param {Item} item
 */
function deleteItem (item) {
  if (!confirm(`¿Seguro que quieres eliminar ${item.name}?`)) return
  items.remove(item)
  renderItemList()
  saveItems()
}

/**
 * Cambia el estado de un item
 *
 * @param {Item} item
 */
function switchStatusItem (item) {
  items.changeStatus(item)
  renderItemList()
  saveItems()
}

// ---------- RENDER ----------

/**
 * Dibuja la lista de items en el DOM
 */
function renderItemList () {
  // Busca el contenedor de la lista
  const divList = document.getElementById('grocery-list')

  // Limpia el contenedor
  divList.innerHTML = ''

  // Toma la lista de 'items' filtrada y la recorre
  items.getFiltered().forEach(item => {
    // Crea un elemento HTML por cada item
    const itemElement = getRenderedItem(item)

    // Agrega el elemento HTML al contenedor
    divList.appendChild(itemElement)

    // Agrega los eventos a los botones del item

    // Checkbox para cambiar el estado de un producto a comprado/no comprado
    itemElement.querySelector(`#item-status-${item.id}`)
      .addEventListener('change', () => {
        switchStatusItem(item)
      })

    // Botón editar producto
    itemElement.querySelector('.edit')
      .addEventListener('click', () => {
        editItem(item)
      })

    // Botón eliminar producto
    itemElement.querySelector('.delete')
      .addEventListener('click', () => {
        deleteItem(item)
      })
  })
}

/**
 * Devuelve el 'checked' si el item está marcado
 *
 * función de utilidad
 *
 * @param {Item} item
 */
function getChecked (item) {
  return item.status ? 'checked' : ''
}

/**
 * Crea un elemento HTML con los datos de un item
 *
 * @param {Item} item
 */
function getRenderedItem (item) {
  // Crea un elemento HTML <li>
  const element = document.createElement('li')
  // Le asigna un id único con el id del item
  element.id = `item-${item.id}`
  // Le asigna las clases de Bootstrap
  element.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'gap-2', 'align-items-center')
  // Le asigna el contenido HTML
  element.innerHTML = /* html */`
    <input id="item-status-${item.id}"
      type="checkbox"
      class="form-check-input" ${getChecked(item)}>
    <label for="item-status-${item.id}">${formatFilteredName(item.name)}</label>
    <em class="small border rounded px-1">x${item.quantity}</em>
    <div class="flex-grow-1"></div>
    <button class="btn btn-link edit py-1 px-2"
      title="editar">
      <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-link delete py-1 px-2"
      title="eliminar">
      <i class="bi bi-x-circle"></i>
    </button>
  `
  return element
}

// ---------- FILTERS ----------

// Busca los elementos del DOM correspondientes a los filtros
const filterName = document.getElementById('filter-name')
const filterHideCompleted = document.getElementById('filter-hide-completed')
const filterClear = document.getElementById('filter-clear')

// Agrega los eventos a los filtros

// Agrega el evento 'input' al filtro de nombre
// - 'onInput' se dispara cada vez que se modifica el texto de un input
// - de esta form se aplica el filtro en cada cambio de manera inmediata
filterName.addEventListener('input', () => {
  items.setFilterNameContains(filterName.value)
  renderItemList()
})

// Agrega el evento 'change' al filtro de ocultar completados
// - 'onChange' se dispara cada vez que cambia el valor de un checkbox
// - de esta form se aplica el filtro en cada cambio pero solo cuando se
filterHideCompleted.addEventListener('change', () => {
  items.setFilterHideCompleted(filterHideCompleted.checked)
  renderItemList()
})

// Agrega el evento 'click' al botón de limpiar filtros
filterClear.addEventListener('click', () => {
  filterName.value = ''
  filterHideCompleted.checked = false
  items.setFilterNameContains('')
  items.setFilterHideCompleted(false)
  renderItemList()
})

/**
 * Devuelve el nombre del item
 * marcando con <em> el texto que coincide con el filtro
 *
 * función de utilidad
 *
 * @param {string} name
 * @returns
 */
function formatFilteredName (name) {
  return name
    .replace(new RegExp(`(${filterName.value})`, 'gi'), '<em>$1</em>')
}

document.getElementById('theme-switch').addEventListener('change', (e) => {
  const isDark = e.target.checked
  document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light')
})
