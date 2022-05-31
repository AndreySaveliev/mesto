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
const profileEdit = page.querySelector(".popup-profile-edit");
const popupCardSection = page.querySelector(".popup-card-section");
const linkNewCardInput = page.querySelector(".popup__input_card_link");
const nameNewCardInput = page.querySelector(".popup__input_card_name");
const closeCardButton = page.querySelector(".popup-card__close-button-card");

// ЗАНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ

// ВЫБОР ПОПАПА
const setValuesToProfileForm = () => {
  editName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
};
const clearValuesToNewCardForm = () => {
  linkNewCardInput.value = "";
  nameNewCardInput.value = "";
};
// ОТКРЫТИЕ ПОПАПА И ЗАКРЫТИЕ
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

profileEditButton.addEventListener("click", () => {
  setValuesToProfileForm();
  openPopup(profileEdit);
});
addCardButton.addEventListener("click", () => {
  clearValuesToNewCardForm();
  openPopup(popupCardAdd);
});

profileEditClose.addEventListener("click", () => closePopup(profileEdit));
addCardCloseButton.addEventListener("click", () => closePopup(popupCardAdd));
closeCardButton.addEventListener("click", () => closePopup(popupShowCard));

page
  .querySelector("#popup__profile-edit")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editProfileDescription.value;
    closePopup(profileEdit);
  });

// СОЗДАНИЕ КАРТОЧКИ
const createCard = (card) => {
  const newCard = cell.querySelector(".grid__cell").cloneNode(true);
  newCard.querySelector(".grid__img").src = card.link;
  newCard.querySelector(".grid__name").textContent = card.name;
  newCard.querySelector(".grid__img").addEventListener("click", (event) => {
    openCard(event);
    openPopup(popupCardSection);
  });
  newCard.querySelector(".grid__like").addEventListener("click", likeCard);
  newCard.querySelector(".grid__delete").addEventListener("click", deleteCard);
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
  closePopup(popupCardAdd);
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
const deleteCard = (event) => {
  event.target.closest(".grid__cell").remove();
};

// СТАНДАРТНЫЕ КАРТОЧКИ
initialCards.forEach((card) => {
  const newCard = createCard(card);
  renderCard(newCard, grid);
});
// ОТКРЫТЕ КАРТОЧКИ
const openCard = (event) => {
  popupShowCard.querySelector(".popup-card__image").src = event.target.src;
  popupShowCard.querySelector(".popup-card__image").alt =
    event.target.nextElementSibling.textContent.trim();
  popupShowCard.querySelector(".popup-card__title").textContent =
    event.target.nextElementSibling.textContent;
};
