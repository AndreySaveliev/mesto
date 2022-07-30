import './index.css'
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import {
  createCard,
  setValuesToProfileForm,
  renderSaving
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
  gridCell,
  popupProfileEditPic,
  profileEditPicButton,
  popupDeleteCard,
  deleteButton,
  profileImg,
  popupAvatarForm,
  page
} from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from '../components/PopupWithImage';

import { options } from '../utils/options.js';
import { Api } from '../components/Api.js';
import { Popup } from '../components/Popup';

export const api = new Api(options)
const editFormValidator = new FormValidator(profileEditForm, settings);
const addCardValidator = new FormValidator(popupCardAddForm, settings);
const newAvatarvalidation = new FormValidator(popupAvatarForm, settings)
editFormValidator.enableValidation(profileEditForm, settings);
addCardValidator.enableValidation(popupCardAddForm, settings);
newAvatarvalidation.enableValidation(popupAvatarForm, settings)

// profile data
const profileInfo = new UserInfo(profileName, profileDescription)
let id = ''
api.getUser()
  .then((res) => {
    id = res._id
    profileInfo.setUserInfo(res.name, res.about)
    profileImg.src = res.avatar
  })
  
///
/// popups
const deleteCardPopup = new PopupWithForm({popupElement: popupDeleteCard, handleSubmit: (data) => {
  let id = popupDeleteCard.querySelector('.popup__submit-button').name
  api.deleteCard(id)
      .then((res) => { 
        // this._deleteCardPopup.close()
        deleteCardPopup.close()
        let oneCard = document.getElementById(`${id}`)
        oneCard.remove()
        oneCard = null
        // this._element = null
        // this._submitButton.removeEventListener('click', () => this.deleteCard(id))
      })
      .catch((err) => console.log(err))
}})
deleteCardPopup.setEventListeners()
/// popup with img
const imgPopup = new PopupWithImage(popupShowCard)
imgPopup.setEventListeners()
///
/// popup with form
const popupAddCard = new PopupWithForm({popupElement: popupCardAdd, handleSubmit: (data) => {
  renderSaving(true, event)
  api.postCard(data.name, data.link)
    .then((card) => {
      const cardEl = createCard(card, gridCell, () => {
        imgPopup.open(card.name, card.link)
      }, {_id: id}, deleteCardPopup)
      grid.prepend(cardEl)
    })
    .catch((err) => console.log(err))
    .finally(renderSaving(false, event))
}})
popupAddCard.setEventListeners()
const profilePopup = new PopupWithForm({popupElement: profileEdit, handleSubmit: (data) =>{
  renderSaving(true, event)
  api.saveUserData(data.name, data.description)
    .then((res) => {
      profileInfo.setUserInfo(res.name, res.about)})
    .catch((err) => console.log(err))
    .finally(renderSaving(false, event))
}}) 
profilePopup.setEventListeners() 
const profilePicPopup = new PopupWithForm({popupElement: popupProfileEditPic, handleSubmit: (data) => {
  renderSaving(true, event)
  api.changeProfilePic(data.link) 
    .then((res) => {
      profileImg.src = res.avatar}) 
    .catch((err) => console.log(err))
    .finally(renderSaving(false, event))
}})
profilePicPopup.setEventListeners()
///
/// listeners
profileEditPicButton.addEventListener('click', () => {
  profilePicPopup.open()
})
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
///
/// render cards
// const cards = new Section({item: initialCards, renderer: (data) =>{ 
//   const newCard = createCard(data, gridCell, ()=> {
//     imgPopup.open(data.name, data.link)
//   })
//   cards.addItem(newCard) 
// }}, grid) 
// cards.renderItems()
api.getInitialCards()
  .then((kartochki) => {
    api.getUser()
      .then((user) => {
        const cards = new Section({item: kartochki.reverse(), renderer: (data) =>{ 
          const newCard = createCard(data, gridCell, ()=> {
            imgPopup.open(data.name, data.link)
          }, user, deleteCardPopup)
          cards.addItem(newCard) 
      }}, grid) 
      cards.renderItems()
      })
      .catch((err) => console.log(err))
  })
  

