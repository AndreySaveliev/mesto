import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
   constructor(popupElement) {
    super(popupElement)
    this._image = popupElement.querySelector(".popup-card__image")
    this._title = popupElement.querySelector(".popup-card__title")
  }
  open(name, link) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
  setEventListeners() {
    super.setEventListeners()
  }
}