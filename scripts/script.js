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
const linkNewCardInput = page.querySelector(".popup__input_card_link");
const nameNewCardInput = page.querySelector(".popup__input_card_name");
const closeCardButton = page.querySelector(".popup-card__close-button-card");
const popupProfileEditForm = page.querySelector("#popup__profile-edit");
const inputs = page.querySelectorAll(".popup__input");
const cardBlock = page.querySelector(".popup-card__block");
const profileBlock = page.querySelector(".popup-profile-block");
const popupCardBlock = page.querySelector(".popup-card-add-block");
const submitButtons = page.querySelectorAll(".popup__submit-button");
const errors = page.querySelectorAll(".popup__form-input-error");
const popupCardImg = page.querySelector(".popup-card__image");
const popupCardTitle = page.querySelector(".popup-card__title");
const popups = page.querySelectorAll(".popup");
const cardForm = page.querySelector("#popup__form-card");
const popupFormCardSubmitButton = page.querySelector(
  ".popup__submit-button_new-card"
);
// ЗАНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
const setValuesToProfileForm = () => {
  editName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
};
const clearValuesToNewCardForm = () => {
  cardForm.reset();
};

// ОТКРЫТИЕ ПОПАПА И ЗАКРЫТИЕ
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

profileEditButton.addEventListener("click", () => {
  setValuesToProfileForm();
  clearInputsErrors();
  clearInputsStyles();
  openPopup(profileEdit);
});
addCardButton.addEventListener("click", () => {
  clearValuesToNewCardForm();
  clearInputsErrors();
  clearInputsStyles();
  disableButton();
  openPopup(popupCardAdd);
});
// ЗАКРЫТИЕ ПО НАЖАТИЮ НА ОВЕРЛЕЙ И КРЕСТИК
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(popup);
    }
    if (event.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
// ЗАКРЫТИЕ НА ESC
function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// ЗНАЧЕНИЕ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В ПОПАПЕ
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
  const newCardImg = newCard.querySelector(".grid__img");
  newCardImg.src = card.link;
  newCardImg.alt = card.name;
  newCard.querySelector(".grid__name").textContent = card.name;
  newCardImg.addEventListener("click", (event) => {
    openCard(card);
    openPopup(popupShowCard);
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
  event.target.classList.toggle("grid__like_active");
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
const openCard = (card) => {
  popupCardImg.src = card.link;
  popupCardTitle.textContent = card.name;
  popupCardImg.alt = card.name;
};
// ОЧИСКТКА ОШИБОК
const clearInputsErrors = () => {
  errors.forEach((error) => {
    error.textContent = "";
  });
};
const clearInputsStyles = () => {
  inputs.forEach((input) => {
    if (input.classList.contains("popup__input_show_error")) {
      input.classList.remove("popup__input_show_error");
    }
  });
};
//ДЕАКТИВАЦИЯ КНОПКИ
const disableButton = () => {
  popupFormCardSubmitButton.classList.add("popup__submit-button-disable");
  popupFormCardSubmitButton.setAttribute("disabled", true);
};
