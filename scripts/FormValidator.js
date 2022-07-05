import {settings} from "./constants.js";

export class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(settings.buttonElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputElement));
    this._errorsList = Array.from(this._formElement.querySelectorAll(settings.errorElement));
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
    this._inputList.forEach((inputElement) => {
      if (inputElement.value == "") {
        this._toggleButtonState(this._inputList, this._buttonElement, settings);
      }
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement, settings);
      });
    });
  }
  _clearInputsErrors = () => {
    this._errorsList.forEach((error) => {
      error.textContent = "";
    });
  };
  _clearInputsStyles = () => {
    this._inputList.forEach((input) => {
      if (input.classList.contains(settings.inputErrorClass)) {
        input.classList.remove(settings.inputErrorClass);
      }
    });
  };
  _disableButton = () => {
    this._buttonElement.classList.add(settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };

  enableValidation(formElement, settings) {
    this._setEventListeners(formElement, settings);
  };
}