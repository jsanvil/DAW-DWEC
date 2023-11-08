/**
 * Clase que representa un item
 */
export default class Item {
  /**
   * Item id
   * @type {number}
   */
  _id = null

  /**
   * Item name
   * @type {string}
   */
  _name = ''

  /**
   * Item quantity
   * @type {number}
   */
  _quantity = 1

  /**
   * Item status
   * @type {boolean}
   */
  _status = false

  /**
   * Crea un nuevo item
   * @param {string} name
   * @param {number} [id=null]
   */
  constructor (name, id = null) {
    this._id = id || Date.now()
    this._name = name
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  set name (name) {
    this._name = name
  }

  get quantity () {
    return this._quantity
  }

  set quantity (quantity) {
    this._quantity = quantity
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  toString () {
    return `${this.name}`
  }
}
