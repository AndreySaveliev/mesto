export class Section {
  constructor({item, renderer}, container) {
    this._item = item
    this._container = document.querySelector(".grid");
    this._renderer = renderer
  }
  rendererItem() {
    this._item.forEach((item) => {
      this._renderer(item)
    })
  }

  addItem(el) {
    this._container.append(el)
  }
}