import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({popupElement, handleSubmit}) {
    super(popupElement)
    this._handleSubmit = handleSubmit
  }
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input')
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close-button")
      ) {
        this.close()
      }
    })
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault()
      this._handleSubmit(this._getInputValues())
      this.close()
    })
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.querySelector("#popup__form-card").reset()
  }
}