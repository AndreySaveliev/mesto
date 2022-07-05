import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import {
  openPopup,
  closePopup,
  clearValuesToNewCardForm,
  setValuesToProfileForm,
  createCardExemplar,
} from "./functions.js";
import {
  profileEditButton,
  addCardButton,
  popups,
  page,
  grid,
  popupCardAddForm,
  settings,
  popupCardAdd,
  profileEditForm,
  profileEdit,
  profileName,
  editName,
  profileDescription,
  profileEditDescription,
} from "./constants.js";

const editFormValidator = new FormValidator(profileEditForm, settings);
const addCardValidator = new FormValidator(popupCardAddForm, settings);
editFormValidator.enableValidation(profileEditForm, settings);
addCardValidator.enableValidation(popupCardAddForm, settings);

profileEditButton.addEventListener("click", () => {
  setValuesToProfileForm();
  editFormValidator._disableButton()
  editFormValidator._clearInputsErrors()
  editFormValidator._clearInputsStyles()
  openPopup(profileEdit);
});
addCardButton.addEventListener("click", () => {
  clearValuesToNewCardForm();
  addCardValidator._disableButton()
  addCardValidator._clearInputsErrors()
  addCardValidator._clearInputsStyles()
  openPopup(popupCardAdd);
});
// ЗАКРЫТИЕ ПО НАЖАТИЮ НА ОВЕРЛЕЙ И КРЕСТИК
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});
// ЗНАЧЕНИЕ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В ПОПАПЕ
page
  .querySelector("#popup__profile-edit")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = profileEditDescription.value;
    closePopup(profileEdit);
  });

page.querySelector("#popup__form-card").addEventListener("submit", (event) => {
  event.preventDefault();
  const card = {
    name: event.target.elements["name"].value,
    link: event.target.elements["link"].value,
  };
  grid.prepend(createCardExemplar(card));
  closePopup(popupCardAdd);
});

// СТАНДАРТНЫЕ КАРТОЧКИ
initialCards.forEach((card) => {
  grid.append(createCardExemplar(card));
});
