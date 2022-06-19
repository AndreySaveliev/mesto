// УФФФ... НАДЕЮСЬ С 3 РАЗА Я СМОГ ИСПАРВИТЬ ВСЕ, ЧТОБЫ РАБОТА
// ХОТЯ НЕ ОТКЛОНЯЛАСЬ ОТ ПРОВЕРКИ)))

// ВАЛИДАЦИЯ ФОРМЫ ПРОФИЛЯ
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// ИЗМИНЕНИЕ КНОПКИ ЕСЛИ ПОЛЯ НЕ ПРОШЛИ ВАЛИДАЦИЮ
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputElement)
  );
  const buttonElement = formElement.querySelector(settings.buttonElement);
  inputList.forEach((inputElement) => {
    if (inputElement.value == "") {
      toggleButtonState(inputList, buttonElement, settings);
    }
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = () => {
  popupForms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

const settings = {
  formElement: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button-disable",
  inputErrorClass: "popup__input_show_error",
  errorClass: "popup__form-input-error-active",
};

enableValidation(settings);
