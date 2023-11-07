import ItemList from '../model/ItemList.class'
import Item from '../model/Item.class'
import 'bootstrap/dist/css/bootstrap.min.css'

const storageKey = 'groceriesApp'
let items = []

async function loadItems() {
  return new Promise((resolve, reject) => {
    const data = window.localStorage.getItem(storageKey)
    if (!data) {
      items = new ItemList()
      resolve()
    } else {
      items = new ItemList(JSON.parse(data))
      resolve()
    }
  })
}

async function saveItems() {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items.get()))
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

function init() {
  const form = document.getElementById('itemForm')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('itemName')
    if (!input.value) return
    createItem(input.value)
    input.value = ''
  })
  loadItems()
    .then(() => {
      renderItemList()
    })
}

window.onload = init

function createItem(value) {
  const newItem = new Item(value)
  items.add(newItem)
  renderItemList()
  saveItems()
}

function deleteItem(item) {
  items.remove(item)
  renderItemList()
  saveItems()
}

function renderItemList() {
  const divList = document.getElementById('itemList')
  divList.innerHTML = ''
  items.get().forEach(item => {
    const itemElement = getRenderedItem(item)
    divList.appendChild(itemElement)
    itemElement.querySelector('button')
      .addEventListener('click', () => {
        deleteItem(item)
      })
  })
}

function getRenderedItem(item) {
  const element = document.createElement('li')
  element.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
  element.innerHTML = `
    ${item} <button class="btn btn-danger">X</button>
  `
  return element
}
