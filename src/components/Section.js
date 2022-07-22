export class Section {
  constructor({item, renderer}, container) {
    this._item = item
    this._container = container
    this._renderer = renderer
  }
  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item)
    })
  }

  addItem(item) {
    this._container.prepend(item)
  }
}