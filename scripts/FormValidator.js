const page = document.querySelector(".page");
const settings = {
  formElement: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button-disable",
  inputErrorClass: "popup__input_show_error",
  errorClass: "popup__form-input-error-active",
};
const popupForms = page.querySelectorAll(settings.formElement);

export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    // this._inpitElement = inputElement;
    // this._buttonElement = buttonElement;
  }
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }
  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  }
    _setEventListeners(formElement, settings) {
      const inputList = Array.from(
        formElement.querySelectorAll(settings.inputElement)
      );
      const buttonElement = formElement.querySelector(settings.buttonElement);
      inputList.forEach((inputElement) => {
        if (inputElement.value == "") {
          this._toggleButtonState(inputList, buttonElement, settings);
        }
        inputElement.addEventListener("input", () => {
          this._isValid(formElement, inputElement);
          this._toggleButtonState(inputList, buttonElement, settings);
        });
      });
    }
    enableValidation(settings) {
      popupForms.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement, settings);
      });
    };
}