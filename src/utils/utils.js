import {
  editName,
  profileEditDescription,
} from "./constants.js";
import { Card } from "../components/card.js";


// ЗНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
export const setValuesToProfileForm = (data) => {
  editName.value = data.name;
  profileEditDescription.value = data.description;
};
export const createCard = (data, container, handleCardClick) => {
  const newCard = new Card(data, container, handleCardClick)
  const cardEl = newCard.generateCard()
  return cardEl
}