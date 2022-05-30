const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const profileEditClose = page.querySelector(
  ".popup__close-button_edit-profile"
);
const profileEditSubmitButton = page.querySelector(
  ".popup__submit-button_edit-profile"
);
const editName = page.querySelector(".popup__input_textbox_name");
const editProfileDescription = page.querySelector(
  ".popup__input_textbox_description"
);
const profileName = page.querySelector(".profile__name");
const profileDescription = page.querySelector(".profile__description");
const addCardButton = page.querySelector(".profile__add-card");
const addCardCloseButton = page.querySelector(".popup__close-button_add-card");

const popupCardAdd = page.querySelector(".popup-card-add");
const addNewCardButton = page.querySelector(".popup__submit-button_new-card");
const popupShowCard = page.querySelector(".popup-card-section");
const grid = page.querySelector(".grid");
const cell = page.querySelector("#cell").content;
const popupCard = page.querySelector("#popup-card").content;
const likeButton = page.querySelectorAll(".grid__like");

// ЗАНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
editName.value = profileName.textContent;
editProfileDescription.value = profileDescription.textContent;

// ВЫБОР ПОПАПА
let popup;
const popupPickerOpen = (event) => {
  if (event.target === page.querySelector(".profile__edit-button")) {
    popup = page.querySelector(".popup-profile-edit");
  } else if (event.target === page.querySelector(".profile__add-card")) {
    popup = page.querySelector(".popup-card-add");
  } else {
    popup = page.querySelector(".popup-card-section");
  }
  popupOpen(popup);
};
const popupPickerClose = (event) => {
  event.preventDefault();
  if (
    event.target === page.querySelector(".popup__close-button_edit-profile")
  ) {
    popup = page.querySelector(".popup-profile-edit");
  } else if (
    event.target === page.querySelector(".popup__close-button_add-card")
  ) {
    popup = page.querySelector(".popup-card-add");
  } else if (
    event.target === page.querySelector(".popup-card__close-button-card")
  ) {
    popup = page.querySelector(".popup-card-section");
  } else if (
    event.target === page.querySelector(".popup__submit-button_edit-profile")
  ) {
    popup = page.querySelector(".popup-profile-edit");
  } else if (
    event.target === page.querySelector(".popup__submit-button_new-card")
  ) {
    popup = page.querySelector(".popup-card-add");
  }
  popupClose(popup);
};
// ОТКРЫТИЕ ПОПАПА И ЗАКРЫТИЕ
const popupOpen = (popup) => {
  if (popup === page.querySelector(".popup-card-section")) {
    cardOpen();
  }
  page.querySelector(".popup__input_card_name").value = "";
  page.querySelector(".popup__input_card_link").value = "";
  popup.classList.add("popup_opened");
};
const popupClose = (popup) => {
  if (popup === page.querySelector(".popup-card-section")) {
    page.querySelector(".popup-card__block").remove();
  }
  popup.classList.remove("popup_opened");
};

profileEditButton.addEventListener("click", popupPickerOpen);
addCardButton.addEventListener("click", popupPickerOpen);

profileEditClose.addEventListener("click", popupPickerClose);
addCardCloseButton.addEventListener("click", popupPickerClose);
page
  .querySelector("#popup__profile-edit")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editProfileDescription.value;
    popupPickerClose(event);
  });

// СОЗДАНИЕ КАРТОЧКИ
const createCard = (card) => {
  const newCard = cell.querySelector(".grid__cell").cloneNode(true);
  newCard.querySelector(".grid__img").src = card.link;
  newCard.querySelector(".grid__name").textContent = card.name;
  newCard
    .querySelector(".grid__img")
    .addEventListener("click", popupPickerOpen);
  newCard.querySelector(".grid__like").addEventListener("click", likeCard);
  newCard.querySelector(".grid__delete").addEventListener("click", cardDelete);
  return newCard;
};

const renderCard = (card, grid) => {
  grid.prepend(card);
};

page.querySelector("#popup__form-card").addEventListener("submit", (event) => {
  event.preventDefault();
  const card = {
    name: event.target.elements["name"].value,
    link: event.target.elements["link"].value,
  };
  const newCard = createCard(card);
  popupPickerClose(event);
  renderCard(newCard, grid);
});

// ЛАЙКИ
const likeCard = (event) => {
  if (event.target.classList.contains("liked")) {
    event.target.classList.remove("liked");
  } else {
    event.target.classList.add("liked");
  }
};
// УДАЛЕНИЕ КАРТОЧКИ
const cardDelete = (event) => {
  event.target.closest(".grid__cell").remove();
};

// СТАНДАРТНЫЕ КАРТОЧКИ
initialCards.forEach((card) => {
  const newCard = createCard(card);
  renderCard(newCard, grid);
});
// ОТКРЫТЕ КАРТОЧКИ
const cardOpen = () => {
  const card = popupCard.querySelector(".popup-card__block").cloneNode(true);
  card.querySelector(".popup-card__image").src = event.target.src;
  card.querySelector(".popup-card__title").textContent =
    event.target.nextElementSibling.textContent;
  card
    .querySelector(".popup-card__close-button-card")
    .addEventListener("click", popupPickerClose);
  popupShowCard.prepend(card);
};
