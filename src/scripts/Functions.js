import {
  editName,
  profileEditDescription,
} from "./Variables.js";

// ЗНАЧЕНИЯ ПОПАПА РЕД. ПРОФИЛЯ
export const setValuesToProfileForm = (data) => {
  editName.value = data.name;
  profileEditDescription.value = data.description;
};
