// ВАЛИДАЦИЯ ФОРМЫ ПРОФИЛЯ
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_show_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-input-error-active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_show_error");
  errorElement.classList.remove("popup__form-input-error-active");
  errorElement.textContent = "";
};

const formEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  popupForms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    formEventListener(formElement);
  });
};

enableValidation();
// ИЗМИНЕНИЕ КНОПКИ ЕСЛИ ПОЛЯ НЕ ПРОШЛИ ВАЛИДАЦИЮ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit-button-disable");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__submit-button-disable");
  }
};
