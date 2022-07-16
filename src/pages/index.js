import './index.css'
import { FormValidator } from "../scripts/FormValidator.js";
import { initialCards } from "../scripts/InitialCards.js";
import {
  setValuesToProfileForm,
} from "../scripts/Functions.js";
import {
  profileEditButton,
  addCardButton,
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
} from "../scripts/Variables.js";
import { Popup } from "../scripts/Popup.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { Card } from "../scripts/card.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Section } from "../scripts/Section.js";
const editFormValidator = new FormValidator(profileEditForm, settings);
const addCardValidator = new FormValidator(popupCardAddForm, settings);
editFormValidator.enableValidation(profileEditForm, settings);
addCardValidator.enableValidation(popupCardAddForm, settings);
// profile data
const profileInfo = new UserInfo(profileName, profileDescription)
///
// popups
const profilePopup = new Popup(profileEdit)
profilePopup.setEventListeners()
const newCardPopup = new Popup(popupCardAdd)
newCardPopup.setEventListeners()
///
// popup with form
const newCardForm = new PopupWithForm({popupElement: popupCardAdd, handleSubmit: (data) => {
  const card = new Card(data)
  const cardEl = card.generateCard()
  grid.prepend(cardEl)
}})
newCardForm.setEventListeners()
///
profileEditButton.addEventListener("click", () => {
  setValuesToProfileForm(profileInfo.getUserInfo())
  editFormValidator.disableButton()
  editFormValidator.clearInputsErrors()
  editFormValidator.clearInputsStyles()
  profilePopup.open()
});
addCardButton.addEventListener("click", () => {
  newCardPopup.open()
  addCardValidator.disableButton()
  addCardValidator.clearInputsErrors()
  addCardValidator.clearInputsStyles()
});
// ЗАКРЫТИЕ ПО НАЖАТИЮ НА ОВЕРЛЕЙ И КРЕСТИК
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (event) => {
//     if (
//       event.target.classList.contains("popup") ||
//       event.target.classList.contains("popup__close-button")
//     ) {
//       closePopup(popup);
//     }
//   });
// });
// ЗНАЧЕНИЕ ИМЕНИ И ОПИСАНИЯ ПРОФИЛЯ В ПОПАПЕ
page
  .querySelector("#popup__profile-edit")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    profileInfo.setUserInfo(editName, profileEditDescription)
    profilePopup.close()
  });

// page.querySelector("#popup__form-card").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const card = {
//     name: event.target.elements["name"].value,
//     link: event.target.elements["link"].value,
//   };
//   grid.prepend(createCardExemplar(card));
//   closePopup(popupCardAdd);
// });

// СТАНДАРТНЫЕ КАРТОЧКИ
// initialCards.forEach((card) => {
//   grid.append(createCardExemplar(card));
// });


const cards = new Section({item: initialCards, renderer: (cardItem) =>{
  const newCard = new Card(cardItem)
  const cardEl = newCard.generateCard()
  cards.addItem(cardEl)
}})
cards.rendererItem()
