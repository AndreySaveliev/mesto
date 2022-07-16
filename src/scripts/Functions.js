import {
  editName,
  profileEditDescription,
} from "./Variables.js";
// ОТКРЫТИЕ ПОПАПА И ЗАКРЫТИЕ
// export const openPopup = (popup) => {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// };
// export const closePopup = (popup) => {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEscape);
// };
// ЗНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
export const setValuesToProfileForm = (data) => {
  editName.value = data.name;
  profileEditDescription.value = data.description;
};
// export const clearValuesToNewCardForm = () => {
//   popupCardAddForm.reset();
// };
// ЗАКРЫТИЕ НА ESC
// export function closeByEscape(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }
//СОЗДАНИЕ НОВОЙ КАРТОЧКИ ПО САБМИТУ ФОРМЫ
// export const createCardExemplar = (data) => {
//   const newCard = new Card(data);
//   const cardEl = newCard.generateCard();
//   return cardEl;
// };
