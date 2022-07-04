import {settings, popupFormCardSubmitButton, errors, inputs} from "./constants.js";

export class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
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
  _clearInputsErrors = () => {
    errors.forEach((error) => {
      error.textContent = "";
    });
  };
  _clearInputsStyles = () => {
    inputs.forEach((input) => {
      if (input.classList.contains(settings.inputErrorClass)) {
        input.classList.remove(settings.inputErrorClass);
      }
    });
  };
  _disableButton = () => {
    popupFormCardSubmitButton.classList.add(settings.inactiveButtonClass);
    popupFormCardSubmitButton.setAttribute("disabled", true);
  };

  enableValidation(formElement, settings) {
    this._setEventListeners(formElement, settings);
    this._clearInputsErrors()
    this._clearInputsStyles()
    this._disableButton()
  };
}