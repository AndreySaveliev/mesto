import { deleteButton } from "../utils/constants.js";
import { api } from "../pages/index.js";
export class Card {
  constructor(data, container, handleCardClick, user, deleteCardPopup) {
    this._container = container
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes
    this._user = user
    this._owner = data.owner
    this._deleteCardPopup = deleteCardPopup
    this._id = data._id
  }
  _getTemplate() {
    const newCard = this._container.cloneNode(true);
    return newCard
  }
  generateCard() {
    this._element = this._getTemplate()
    this._element.id = this._id
    this._img = this._element.querySelector('.grid__img')
    this._img.src = this._link;
    this._img.alt = this._name;
    this._element.querySelector('.grid__like-number').textContent = this._likes.length
    this._element.querySelector(".grid__name").textContent = this._name;
    this._img.addEventListener('click', this._handleCardClick)
    this._submitButton = this._deleteCardPopup._popupElement.querySelector('.popup__submit-button')
    if (!this._isMine()) {
      this._element.removeChild(this._element.querySelector('.grid__delete'))
    } else {
      this._element.querySelector('.grid__delete').addEventListener("click", (event) => {
        event.preventDefault()
        this._deleteCardPopup.open()
        this._submitButton.addEventListener('click', () => this._deleteCard(this._element.id)) 
      })
    }
    this._likes.forEach((like) => {
      if (like._id === this._user._id) {
        this._element.querySelector(".grid__like").classList.add('grid__like_active')
      }
    }) 
    this._element.querySelector(".grid__like").addEventListener("click", (event) => {
      if (this._element.querySelector(".grid__like").classList.contains('grid__like_active')) {
        api.unlike(this._element.id)
          .then((res) => {
            this._likeCard(event)
            this._element.querySelector('.grid__like-number').textContent = res.likes.length
          })
      } else {
        api.like(this._element.id)
          .then((res) => {
            this._likeCard(event)
            this._element.querySelector('.grid__like-number').textContent = res.likes.length
          })
      }
    });
    return  this._element;
  }
  _isMine() {
    return this._owner._id === this._user._id ? true : false
  }
  _deleteCard(id) {
    api.deleteCard(id)
      .then((res) => {
        console.log('deleted')   
        this._deleteCardPopup.close()
        this._element.remove()
        this._element = null
        this._submitButton.removeEventListener('click', () => this._deleteCard(id))
      })
  }; 
  _likeCard(event) {
    event.target.classList.toggle('grid__like_active')
  }
}
