import { FormValidator } from './FormValidator.js';
import { Card } from './card.js';
import { initialCards } from './initialCards.js';
const settings = {
  formElement: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button-disable",
  inputErrorClass: "popup__input_show_error",
  errorClass: "popup__form-input-error-active",
};
const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const editName = page.querySelector(".popup__input_textbox_name");
const editProfileDescription = page.querySelector(
  ".popup__input_textbox_description"
);
const profileName = page.querySelector(".profile__name");
const profileDescription = page.querySelector(".profile__description");
const addCardButton = page.querySelector(".profile__add-card");
const popupCardAdd = page.querySelector(".popup-card-add");
const grid = page.querySelector(".grid");
const profileEdit = page.querySelector(".popup-profile-edit");
const inputs = page.querySelectorAll(".popup__input");
const errors = page.querySelectorAll(".popup__form-input-error");
const popups = page.querySelectorAll(".popup");
const cardForm = page.querySelector("#popup__form-card");
const popupFormCardSubmitButton = page.querySelector(
  ".popup__submit-button_new-card"
);
const popupForms = page.querySelectorAll(settings.formElement);

// const popupCardImg = page.querySelector(".popup-card__image");
// const popupCardTitle = page.querySelector(".popup-card__title");
// const cardBlock = page.querySelector(".popup-card__block");
// const profileBlock = page.querySelector(".popup-profile-block");
// const popupCardBlock = page.querySelector(".popup-card-add-block");
// const submitButtons = page.querySelectorAll(".popup__submit-button");
// const linkNewCardInput = page.querySelector(".popup__input_card_link");
// const nameNewCardInput = page.querySelector(".popup__input_card_name");
// const closeCardButton = page.querySelector(".popup-card__close-button-card");
// const popupProfileEditForm = page.querySelector("#popup__profile-edit");
// const cell = page.querySelector("#cell").content;
// const addNewCardButton = page.querySelector(".popup__submit-button_new-card");
// const popupShowCard = page.querySelector(".popup-card-section");
// const addCardCloseButton = page.querySelector(".popup__close-button_add-card");
// const profileEditClose = page.querySelector(
//   ".popup__close-button_edit-profile"
// );
// const profileEditSubmitButton = page.querySelector(
//   ".popup__submit-button_edit-profile"
// );

//ВЛЮЧЕНИЕ ВАЛИДАЦИИ
popupForms.forEach((formElement) => {
  new FormValidator(formElement).enableValidation(settings)
})

// ЗНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
const setValuesToProfileForm = () => {
  editName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
};
const clearValuesToNewCardForm = () => {
  cardForm.reset();
};

// ОТКРЫТИЕ ПОПАПА И ЗАКРЫТИЕ
export const openPopup = (popup) => {
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
//СОЗДАНИЕ НОВОЙ КАРТОЧКИ ПО САБМИТУ ФОРМЫ
page.querySelector("#popup__form-card").addEventListener("submit", (event) => {
  event.preventDefault();
  const card = {
    name: event.target.elements["name"].value,
    link: event.target.elements["link"].value,
  };
  const newCard = new Card(card);
  const cardEl = newCard.generateCard()
  closePopup(popupCardAdd);
  grid.prepend(cardEl)
});

// СТАНДАРТНЫЕ КАРТОЧКИ 
initialCards.forEach((item) => {
  const newCard = new Card(item);
  const cardEl = newCard.generateCard()
  grid.append(cardEl)
});

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
