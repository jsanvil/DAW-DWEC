import Item from '../model/Item.class'

let itemList = []

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
    <h2 class="item">${item.name}</h2>
    <p>${item.price}<p>
  `
  return div
}