import './index.css'
import { FormValidator } from "../scripts/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import {
  createCard,
  setValuesToProfileForm,
} from "../utils/utils.js";
import {
  popupShowCard,
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
  cell,
  gridCell
} from "../utils/constants.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Section } from "../scripts/Section.js";
import { Card } from '../scripts/card';
import { PopupWithImage } from '../scripts/PopupWithImage';
const editFormValidator = new FormValidator(profileEditForm, settings);
const addCardValidator = new FormValidator(popupCardAddForm, settings);
editFormValidator.enableValidation(profileEditForm, settings);
addCardValidator.enableValidation(popupCardAddForm, settings);
// profile data
const profileInfo = new UserInfo(profileName, profileDescription)
///
// popups

//popup with img
const imgPopup = new PopupWithImage({popupElement: popupShowCard, handleOpenCard: (data) => {
  console.log(data)
  imgPopup.open(data.name, data.link)
}})
///
// popup with form
const popupAddCard = new PopupWithForm({popupElement: popupCardAdd, handleSubmit: (data) => {
  const cardEl = createCard(data, gridCell, () => {
    imgPopup.open(data.name, data.link)
  })
  const newCard = new Section({item: cardEl, rednerer: {}}, grid)
  newCard.addItem(cardEl)
}})
popupAddCard.setEventListeners()

const profilePopup = new PopupWithForm({popupElement: profileEdit, handleSubmit: (data) =>{
  profileName.textContent = data.name;
  profileDescription.textContent = data.description;
}}) 
profilePopup.setEventListeners() 
///
profileEditButton.addEventListener("click", () => {
  setValuesToProfileForm(profileInfo.getUserInfo())
  editFormValidator.disableButton()
  editFormValidator.clearInputsErrors()
  editFormValidator.clearInputsStyles()
  profilePopup.open()
});
addCardButton.addEventListener("click", () => {
  popupAddCard.open()
  addCardValidator.disableButton()
  addCardValidator.clearInputsErrors()
  addCardValidator.clearInputsStyles()
});

const cards = new Section({item: initialCards, renderer: (data) =>{ 
  const newCard = createCard(data, gridCell, ()=> {
    imgPopup.open(data.name, data.link)
  })
  cards.addItem(newCard) 
}}, grid) 
cards.renderItems()
