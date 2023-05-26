export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    // this._initialCards = items;
    this._renderer = renderer;
  }

  getArrayCards(cardData) {
    cardData.forEach(element => {
      this._renderer(element)
    })
  }

  addItem(data) {
    this._container.prepend(data)
  }
}
