import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__caption");
    
  }

  openPopup = (cardData) => {
    this._popupImage.src = cardData.title;
    this._popupImage.alt = cardData.title;
    this._imageCaption.textContent = cardData.name;
    super.openPopup();
  };
}
