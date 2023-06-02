import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitData) {
    super(popupSelector);
    this._submitData = submitData;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelectorAll(".popup__save");
    this._textSubmitButton = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault()
      this._submitButton.textContent = `${this._submitButton.textContent} ...`
      this._submitData(this._getInputValues())
    });
  }
  
  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputsValue(profileContent) {
    this._inputs.forEach((input) => {
      input.value = profileContent[input.name];
    });
  }

  resetTextSubmitButton() {
    this._submitButton.textContent = this._textSubmitButton
}

  closeForm() {
    super.closePopup();
    this._form.reset();
  }
}
