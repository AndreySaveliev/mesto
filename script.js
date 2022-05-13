let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');
let closeButton = page.querySelector('.popup__close-button')
function pupupOpen() {
  popup.classList.add('popup_opened');
};
function popupClose() {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', pupupOpen);
closeButton.addEventListener('click', popupClose);