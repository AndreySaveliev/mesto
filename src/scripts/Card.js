export class Card {
  constructor(data, container, handleCardClick) {
    this._container = container
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const newCard = this._container.cloneNode(true);
    return newCard
  }
  generateCard() {
    this._element = this._getTemplate()
    this._img = this._element.querySelector('.grid__img')
    this._img.src = this._link;
    this._img.alt = this._name;
    this._element.querySelector(".grid__name").textContent = this._name;
    this._img.addEventListener('click', this._handleCardClick)
    this._element.querySelector('.grid__delete').addEventListener("click", () => {
      this._deleteCard()
    })
    this._element.querySelector(".grid__like").addEventListener("click", () => {
      this._likeCard()
    });
    return  this._element;
  }
  
  _deleteCard() {
    this._element.remove()
    this._element = null
  };  
  _likeCard() {
    event.target.classList.toggle('grid__like_active')
  }
}
