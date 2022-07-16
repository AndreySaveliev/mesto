import { cell, popupShowCard,} from "./Variables.js";
import { PopupWithImage } from "./PopupWithImage.js";


export class Card {
  constructor(card) {
    this._name = card.name;
    this._link = card.link;
  }
  _getTemplate() {
    const newCard = cell.querySelector(".grid__cell").cloneNode(true);
    return newCard
  }

  generateCard() {
    this._element = this._getTemplate()
    this._img = this._element.querySelector('.grid__img')
    this._img.src = this._link;
    this._img.alt = this._name;
    this._element.querySelector(".grid__name").textContent = this._name;
    this._setOpenListener()
    this._element.querySelector('.grid__delete').addEventListener("click", () => {
      this._deleteCard()
    })
    this._element.querySelector(".grid__like").addEventListener("click", () => {
      this._likeCard()
    });
    return  this._element;
  }
  _setOpenListener() {
     this._img.addEventListener('click', () => {
      const img = new PopupWithImage(popupShowCard)
      img.open(this._name, this._link)
      img.setEventListeners()
    })
  }
  _deleteCard() {
    this._element.remove()
    this._element = null
  };  
  _likeCard() {
    event.target.classList.toggle('grid__like_active')
  }
}
