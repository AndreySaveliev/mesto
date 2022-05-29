let page = document.querySelector(".page");
let editButton = page.querySelector(".profile__edit");
let closeButton = page.querySelector(".popup__close-button");
let submitButton = page.querySelector(".popup__submit-button");
let form = page.querySelector(".popup__form");
let newItem = page.querySelector(".new-item");
let addCardButton = page.querySelector(".profile__add-card");
let closeNewItem = page.querySelector(".popup__close-button_new-item");
let likeButton = page.querySelector(".grid__like");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// УДАЛЕНИЕ КАРТОЧКИ

const deleteCard = (event) => {
  const gridCell = page.querySelectorAll(".grid__cell");
  event.target.parentNode.remove();
};

// ОТКРЫТЕ ПОПАПА С КАРТИНКОЙ
const popupCardSection = page.querySelector(".popup-card-section");
const popupCard = page.querySelector("#popup-card").content;
const CardOpen = () => {
  const popupCardClone = popupCard.querySelector(".popup-card").cloneNode(true);
  const popupImg = popupCardClone.querySelector(".popup-card__image");
  const popupTitle = popupCardClone.querySelector(".popup-card__title");
  const cardImg = page.querySelectorAll(".grid__img");
  const cardTitle = page.querySelectorAll(".grid__name");
  cardImg.forEach((img) => {
    img.addEventListener("click", popupCardOpen);
  });
  const closeButton = popupCardClone.querySelector(
    ".popup-card__close-button-card"
  );
  closeButton.addEventListener("click", popupCardClose);
  const imgRender = (event) => {
    return event.target.src;
  };
  popupImg.src = event.target.src;
  popupTitle.textContent = event.target.nextElementSibling.textContent;
  popupCardSection.prepend(popupCardClone);
  popupCardOpen();
};

// ЛАЙКИ И 6 СТАНДАРТНЫХ КАРТОЧЕК

const grid = page.querySelector(".grid");
const cell = page.querySelector("#cell").content;
const addCards = () => {
  initialCards.forEach((card) => {
    const gridCell = cell.querySelector(".grid__cell").cloneNode(true);
    gridCell.querySelector(".grid__img").src = card.link;
    gridCell.querySelector(".grid__img").addEventListener("click", CardOpen);
    gridCell.querySelector(".grid__name").textContent = card.name;
    gridCell.querySelector(".grid__like").addEventListener("click", liked);
    gridCell
      .querySelector(".grid__delete")
      .addEventListener("click", deleteCard);
    grid.prepend(gridCell);
  });
};
addCards();

function liked(event) {
  if (event.target.classList.contains("liked")) {
    event.target.classList.remove("liked");
  } else {
    event.target.classList.add("liked");
  }
}

// ПОПАП РЕД. ПРОФИЛЯ РЕНДЕР

const popup = page.querySelector(".popup");
const popupEdit = page.querySelector("#popup").content;
const renderPopupEdit = () => {
  const popupContainer = popupEdit
    .querySelector(".popup__container")
    .cloneNode(true);
  popupContainer.querySelector(".popup__title").textContent =
    "Редактировать профиль";
  popupContainer.querySelector(".popup__submit-button").textContent =
    "Сохранить";
  const editName = popupContainer.querySelector(".popup__input_textbox_name");
  const editProfileDescription = popupContainer.querySelector(
    ".popup__input_textbox_description"
  );
  const profileName = page.querySelector(".profile__name");
  const profileDescription = page.querySelector(".profile__description");
  editName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  const popupCloseButton = popupContainer.querySelector(".popup__close-button");
  popupCloseButton.addEventListener("click", popupClose);
  popup.prepend(popupContainer);
  popup.classList.add("popup_opened");
};

function popupClose(event) {
  event.preventDefault();
  const popupContainer = page.querySelector(".popup__container");
  popupContainer.remove();
  popup.classList.remove("popup_opened");
}

function popupSubmitClose(event) {
  event.preventDefault();
  profileName.textContent = editName.value;
  profileDescription.textContent = editProfileDescription.value;
  popupClose();
}

editButton.addEventListener("click", renderPopupEdit);

// ПОПАП ДОБ. НОВОЙ КАРТОЧКИ РЕНДЕР
const renderPopupNewCard = () => {
  const popupContainer = popupEdit
    .querySelector(".popup__container")
    .cloneNode(true);
  popupContainer.querySelector(".popup__title").textContent = "Новое место";
  popupContainer.querySelector(".popup__submit-button").textContent = "Создать";
  const editName = popupContainer.querySelector(".popup__input_textbox_name");
  const editProfileDescription = popupContainer.querySelector(
    ".popup__input_textbox_description"
  );
  const profileName = page.querySelector(".profile__name");
  const profileDescription = page.querySelector(".profile__description");
  editName.placeholder = profileName.value = "Название";
  editProfileDescription.placeholder = profileDescription.value =
    "Ссылка на картинку";
  const popupCloseButton = popupContainer.querySelector(".popup__close-button");
  popupCloseButton.addEventListener("click", popupClose);
  const submitButton = popupContainer.querySelector(".popup__submit-button");
  submitButton.addEventListener("click", addNewCard);
  submitButton.addEventListener("click", popupClose);
  popup.prepend(popupContainer);
  popup.classList.add("popup_opened");
};

addCardButton.addEventListener("click", renderPopupNewCard);

function popupCardOpen(event) {
  const popup = page.querySelector(".popup-card-section");
  popup.classList.add("popup-card_opened");
}

function popupCardClose() {
  const popupCardClone = page.querySelector(".popup-card-section");
  const popupCard = page.querySelector(".popup-card");
  popupCardClone.classList.remove("popup-card_opened");
  popupCard.remove();
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
const addNewCard = (event) => {
  event.preventDefault();
  const gridCell = cell.querySelector(".grid__cell").cloneNode(true);
  const cardName = page.querySelector(".popup__input_textbox_name");
  const cardLink = page.querySelector(".popup__input_textbox_description");
  const deleteButton = gridCell.querySelector(".grid__delete");
  deleteButton.addEventListener("click", deleteCard);
  gridCell.querySelector(".grid__img").src = cardLink.value;
  gridCell.querySelector(".grid__img").addEventListener("click", CardOpen);
  gridCell.querySelector(".grid__name").textContent = cardName.value;
  const like = gridCell.querySelector(".grid__like");
  like.addEventListener("click", liked);
  grid.prepend(gridCell);
};
