export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._cardElements = this._form.querySelectorAll(this._inputSelector);
  }
  
  _showInputError(inputErrorContainer, input) {
    input.classList.add(this._inputErrorClass);
    inputErrorContainer.classList.add(this._errorClass);
    inputErrorContainer.textContent = input.validationMessage;
  }

  _hideInputError(inputErrorContainer, input) {
    input.classList.remove(this._inputErrorClass);
    inputErrorContainer.classList.remove(this._errorClass);
    inputErrorContainer.textContent = "";
  }
  
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass)
    this._button.classList.add(this._activeButtonClass)
    this._button.removeAttribute("disabled")
  }
  
  disableButton() {
    this._button.classList.add(this._inactiveButtonClass)
    this._button.classList.remove(this._activeButtonClass)
    this._button.setAttribute("disabled", true)
  }

  _invalidInput() {  
    return Array.from(this._cardElements).every(input => input.validity.valid);
  }

  _toggleButton() {
    this._invalidInput() ? this._enableButton() : this.disableButton(this._button);
  }

  _checkInputValidity(input) {
    const inputErrorContainer = this._form.querySelector(`#${input.id}-error`);
    input.validity.valid ? this._hideInputError(inputErrorContainer, input) : this._showInputError(inputErrorContainer, input);
  }

  _setEventListeners() {
    this._cardElements.forEach(input => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input)
        this._toggleButton()
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }

  removeValidationErrors() {
    this._cardElements.forEach(input => {
      const inputErrorElement = this._form.querySelector(`#${input.id}-error`)
      if (!input.validity.valid) {
        this._hideInputError(inputErrorElement, input)
      }
    })
  this.disableButton()
  }  
}

