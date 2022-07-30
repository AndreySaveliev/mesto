import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({popupElement, handleSubmit}) {
    super(popupElement)
    this._handleSubmit = handleSubmit
    super.close()
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
    super.setEventListeners()
    this._popupElement.addEventListener('submit', (event) => { 
      event.preventDefault() 
      this._handleSubmit(this._getInputValues()) 
      this.close() 
    }) 
  } 
  close() { 
    super.close()
    this._popupElement.querySelector('.popup__form').reset() 
    console.log("reset")
  } 
}