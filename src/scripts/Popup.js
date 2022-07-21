export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close-button")
      ) {
        this.close()
      }
    })
  }
}