const page = document.querySelector(".page");
const cell = page.querySelector("#cell").content;
const popupCardImg = page.querySelector(".popup-card__image");
const popupCardTitle = page.querySelector(".popup-card__title");
const popupShowCard = page.querySelector(".popup-card-section");
import { openPopup } from "./script.js";

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
    this._element.querySelector('.grid__img').src = this._link;
    this._element.querySelector('.grid__img').alt = this._name;
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
  _openCard() {
    popupCardImg.src = this._link;
    popupCardTitle.textContent = this._name;
    popupCardImg.alt = this._name;
  }
  _setOpenListener() {
    this._element.querySelector('.grid__img').addEventListener('click', () => {
      this._openCard()
      openPopup(popupShowCard)
    })
  }
  _deleteCard() {
    this._element.closest('.grid__cell').remove()
  };  
  _likeCard() {
    event.target.classList.toggle('grid__like_active')
  }
}

