export default class Item {

  constructor(name = '', price=0) {
    this.name = name
    this.price = price
  }

  toString() {
    return `${this.name} - ${this.price}€`
  }

  setName = (newName) => {
    this.name = newName
  }

  getName = () => {
    return this.name;
  }

  setPrice = (price) => {
    this.price = price
  }

  getPrice = () => {
    return price
  }
}
