import {
  editName,
  popupDeleteCard,
  profileEditDescription,
} from "./constants.js";
import { Card } from "../components/card.js";


// ЗНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
export const setValuesToProfileForm = (data) => {
  editName.value = data.name;
  profileEditDescription.value = data.description;
};
export const createCard = (data, container, handleCardClick, user, deleteCardPopup) => {
  const newCard = new Card(data, container, handleCardClick, user, deleteCardPopup)
  const cardEl = newCard.generateCard()
  return cardEl
}


export function renderSaving(isSaving, event) {
  if (isSaving) {
    event.submitter.textContent = 'Сохранение...'
  } else {
    event.submitter.textContent = 'Сохранить'
  }
}