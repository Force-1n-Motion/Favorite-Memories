export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupOnButton = this._popup.querySelector(".popup__close");
  }
  _profilePopupCloseOnEsc = (evt) => { //Создаем приватный метод закрытия попапов при клике на эскейп
    if (evt.key === "Escape") {
      this.closePopup()
      }
    }

  _profilePopupCloseOnX = (evt) => {
     this.closePopup()
  }

  _closePopupOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopup()
    }
  }

  setEventListeners() {
    this._closePopupOnButton.addEventListener("mousedown", this._profilePopupCloseOnX);
    this._popup.addEventListener("mousedown", this._closePopupOnOverlay)
  }
  
  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._profilePopupCloseOnEsc);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._profilePopupCloseOnEsc);
  }
}
