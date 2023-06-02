import Popup from "./Popup.js";
export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__form")
    this._submitButton = this._form.querySelector(".popup__save");
    this._textSubmitButton = this._submitButton.textContent;
    
  }
  
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitFunction({card: this._element, idCard: this._idCard})
    })
}
  
resetTextSubmitButton() {
  this._submitButton.textContent = this._textSubmitButton

}
  openPopup = (card, idCard) => {
    super.openPopup();
    this._element = card;
    this._idCard = idCard;
  }
}