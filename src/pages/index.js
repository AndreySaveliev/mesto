import './index.css'
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import {
  createCard,
  setValuesToProfileForm,
} from "../utils/utils.js";
import {
  popupShowCard,
  profileEditButton,
  addCardButton,
  grid,
  popupCardAddForm,
  settings,
  popupCardAdd,
  profileEditForm,
  profileEdit,
  profileName,
  profileDescription,
  gridCell
} from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from '../components/PopupWithImage';
const editFormValidator = new FormValidator(profileEditForm, settings);
const addCardValidator = new FormValidator(popupCardAddForm, settings);
editFormValidator.enableValidation(profileEditForm, settings);
addCardValidator.enableValidation(popupCardAddForm, settings);
// profile data
const profileInfo = new UserInfo(profileName, profileDescription)
///
// popups

//popup with img
const imgPopup = new PopupWithImage(popupShowCard)
imgPopup.setEventListeners()
///
// popup with form
const popupAddCard = new PopupWithForm({popupElement: popupCardAdd, handleSubmit: (data) => {
  const cardEl = createCard(data, gridCell, () => {
    imgPopup.open(data.name, data.link)
  })
  cards.addItem(cardEl)
}})
popupAddCard.setEventListeners()

const profilePopup = new PopupWithForm({popupElement: profileEdit, handleSubmit: (data) =>{
  profileInfo.setUserInfo(data.name, data.description)
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
