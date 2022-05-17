let page = document.querySelector(".page");
let popup = page.querySelector(".popup");
let editButton = page.querySelector(".profile__edit");
let closeButton = page.querySelector(".popup__close-button");
let editName = page.querySelector(".popup__input_name");
let editProfileDescription = page.querySelector(".popup__input_description");
let profileName = page.querySelector(".profile__name");
let profileDescription = page.querySelector(".profile__description");
let submitButton = page.querySelector(".popup__submit-button");
let form = page.querySelector(".popup__form");

function pupupOpen() {
  editName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function popupSubmitClose(event) {
  event.preventDefault();
  profileName.textContent = editName.value;
  profileDescription.textContent = editProfileDescription.value;
  popupClose();
}

editButton.addEventListener("click", pupupOpen);
closeButton.addEventListener("click", popupClose);
form.addEventListener("submit", popupSubmitClose);
