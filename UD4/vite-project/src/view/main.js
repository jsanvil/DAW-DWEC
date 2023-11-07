import Item from '../model/Item.class'
import 'bootstrap/dist/css/bootstrap.min.css'

let itemList = []

const storageKey = 'groceriesApp'

const json = window.localStorage.getItem(storageKey)

itemList = json ? JSON.parse(json) : []
renderItemList()

const form = document.getElementById('itemForm')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('onSubmit')
  const input = document.getElementById('itemName')
  if (!input.value) return
  createItem(input.value)
  input.value = ''
})

function createItem(value) {
  const newItem = new Item(value)
  itemList.push(newItem)
  renderItemList()
  window.localStorage.setItem(storageKey, JSON.stringify(itemList))
}

function renderItemList() {
  const divList = document.getElementById('itemList')
  divList.innerHTML = ''
  itemList.forEach(item => {
    divList.appendChild(getRenderedItem(item))
  })
}

function getRenderedItem(item) {
  const div = document.createElement('div')
  div.innerHTML = `
  <div class="card">
    <h2>${item.name}</h2>
    <p>${item.price}<p>
  </div>
  `
  return div
}