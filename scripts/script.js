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
const popupForms = page.querySelectorAll(".popup__form");
const cardBlock = page.querySelector(".popup-card__block");
const profileBlock = page.querySelector(".popup-profile-block");
const popupCardBlock = page.querySelector(".popup-card-add-block");
const submitButtons = page.querySelectorAll(".popup__submit-button");
const errors = page.querySelectorAll(".popup__form_input_error");

// ЗАНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
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
  errors.forEach((error) => {
    error.textContent = "";
  });
  inputs.forEach((input) => {
    input.classList.remove("popup__input_show_error");
  });
  submitButtons.forEach((button) => {
    button.removeAttribute("disable", true);
    button.classList.remove("popup__submit-button-disable");
  });
};

profileEditButton.addEventListener("click", () => {
  setValuesToProfileForm();
  openPopup(profileEdit);
});
addCardButton.addEventListener("click", () => {
  clearValuesToNewCardForm();
  openPopup(popupCardAdd);
});
// ЗАКРЫТИЕ ПО КЛИКУ НА КРЕСТИК
profileEditClose.addEventListener("click", () => closePopup(profileEdit));
addCardCloseButton.addEventListener("click", () => closePopup(popupCardAdd));
closeCardButton.addEventListener("click", () => closePopup(popupShowCard));
// ЗАКРЫТИЕ ПО НАЖАТИЮ НА ОВЕРЛЕЙ
popupShowCard.addEventListener("mousedown", function (e) {
  if (e.offsetX > cardBlock.offsetWidth || e.offsetY > cardBlock.offsetHeight) {
    closePopup(popupShowCard);
  }
});

profileEdit.addEventListener("mousedown", function (e) {
  if (
    e.offsetX > profileBlock.offsetWidth ||
    e.offsetY > profileBlock.offsetHeight
  ) {
    closePopup(profileEdit);
  }
});

popupCardAdd.addEventListener("mousedown", function (e) {
  if (
    e.offsetX > popupCardBlock.offsetWidth ||
    e.offsetY > popupCardBlock.offsetHeight
  ) {
    closePopup(popupCardAdd);
  }
});
//ЗАКРЫТЕ ПОПАП ПО ESC
document.addEventListener("keydown", (evt) => {
  if (evt.keyCode == 27) {
    closePopup(popupShowCard);
    closePopup(profileEdit);
    closePopup(popupCardAdd);
  }
});
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
  newCard.querySelector(".grid__img").src = card.link;
  newCard.querySelector(".grid__name").textContent = card.name;
  newCard.querySelector(".grid__img").addEventListener("click", (event) => {
    openCard(event);
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

// ВАЛИДАЦИЯ ФОРМЫ ПРОФИЛЯ
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_show_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form_input_error-active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_show_error");
  errorElement.classList.remove("popup__form_input_error-active");
  errorElement.textContent = "";
};

const formEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  popupForms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    formEventListener(formElement);
  });
};

enableValidation();
// ИЗМИНЕНИЕ КНОПКИ ЕСЛИ ПОЛЯ НЕ ПРОШЛИ ВАЛИДАЦИЮ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit-button-disable");
  } else {
    buttonElement.removeAttribute("disabled ", true);
    buttonElement.classList.remove("popup__submit-button-disable");
  }
};
