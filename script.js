let page = document.querySelector(".page");
let popup = page.querySelector(".popup");
let editButton = page.querySelector(".profile__edit");
let closeButton = page.querySelector(".popup__close-button");
let editName = page.querySelector(".input__name");
let editProfileDescription = page.querySelector(".input__description");
let profileName = page.querySelector(".profile__name");
let profileDescription = page.querySelector(".profile__description");
let submitButton = page.querySelector(".popup__submit-button");
let likeButton = page.querySelectorAll(".grid__like");

editName.value = profileName.textContent;
editProfileDescription.value = profileDescription.textContent;

function pupupOpen() {
  popup.classList.add("popup_opened");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function popupSubmitClose() {
  profileName.textContent = editName.value;
  profileDescription.textContent = editProfileDescription.value;
  popupClose();
}

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener("click", liked);
}

function liked(event) {
  if (event.target.classList.contains("liked")) {
    event.target.classList.remove("liked");
  } else {
    event.target.classList.add("liked");
  }
}

editButton.addEventListener("click", pupupOpen);
closeButton.addEventListener("click", popupClose);
submitButton.addEventListener("click", popupSubmitClose);
