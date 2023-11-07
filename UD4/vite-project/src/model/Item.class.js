export default class Item {
  constructor (name = '', quantity = 1, price = 0) {
    this._name = name
    this._quantity = quantity
    this._price = price
  }

  toString () {
    return `${this.name} - ${this.price}€`
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get quantity () {
    return this._quantity
  }

  set quantity (value) {
    this._quantity = value
  }

  get price () {
    return this._price
  }

  set price (value) {
    this._price = value
  }

  get total () {
    return this.price * this.quantity
  }
}
