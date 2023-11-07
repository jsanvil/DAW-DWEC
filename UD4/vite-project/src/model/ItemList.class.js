import Item from './Item.class'

export default class ItemList {
  list = []
  constructor (list = []) {
    this.list = []
    for (const obj of list) {
      const item = new Item(
        obj._name,
        obj._quantity,
        obj._price
      )
      this.add(item)
    }
  }

  add (item) {
    this.list.push(item)
  }

  remove (item) {
    this.list = this.list.filter((i) => i !== item)
  }

  get () {
    return this.list
  }

  toString = () => {
    return this.list.map((i) => i.toString()).join('\n')
  }
}
