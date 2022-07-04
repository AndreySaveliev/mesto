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

const editFormValidator = new FormValidator(profileEditForm);
const addCardValidator = new FormValidator(popupCardAddForm);

profileEditButton.addEventListener("click", () => {
  editFormValidator.enableValidation(profileEditForm, settings);
  setValuesToProfileForm();
  openPopup(profileEdit);
});
addCardButton.addEventListener("click", () => {
  addCardValidator.enableValidation(popupCardAddForm, settings);
  clearValuesToNewCardForm();
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
