import "./index.css";
import Api from "../components/api";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  profileEdit,
  profileAddCard,
  selectorTemplate,
  popupProfileSelector,
  popupImageSelector,
  popupAddCardSelector,
  cardElementsSelector,
  profileData,
  configValidation,
  formEditProfile,
  formAddCard,
} from "../utils/constants.js";

// getInputsValue
const validationEditProfile = new FormValidator(configValidation, formEditProfile) //Экземпляр класса FormValidator для валидации инпутов попапа редактирования профиля
validationEditProfile.enableValidation()

const validationAddCard = new FormValidator(configValidation, formAddCard) //Экземпляр класса FormValidator для валидации инпутов попапа добавления карточек 
validationAddCard.enableValidation()

const userInfo = new UserInfo(profileData); //Экземпляр класса UserInfo 

const popupImage = new PopupWithImage(popupImageSelector); //Экземпляр класса PopupWithImage 


const popupProfile = new PopupWithForm(popupProfileSelector, (cardData) => { //Экземпляр класса PopupWithForm для функции редактирования профиля
  userInfo.setUserInfo(cardData)
  popupProfile.closeForm();
})

const popupAddCard = new PopupWithForm(popupAddCardSelector, (cardData) => { //Экземпляр класса PopupWithForm для функции добавления карточки
  section.addItem(cardData)
  popupAddCard.closeForm()
})


  const renderer = (element) => {
    const card = new Card(element, selectorTemplate, popupImage.openPopup);
    return card.createCard();
  }

const section = new Section((element) => { //Экземпляр класса Section
  section.addItem(renderer(element))
}, cardElementsSelector)

section.getArrayCards(initialCards)

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "e953470f-7b3a-4696-9a09-3ba0a29b5fee",
    "Content-Type": "application/json"
  }
})

Promise.all([api.getInfo(), api.getCards()])
  .then(([userInfo, cardInfo]) => {
    console.log(userInfo)
    console.log(cardInfo)
})

popupImage.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа изображений
popupProfile.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа редактирования профиля
popupAddCard.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа добавления карточек

profileEdit.addEventListener("click", () => { //Обработчик клика по кнопке (карандаш) редактирования профиля
  validationEditProfile.removeValidationErrors();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.openPopup()
});

profileAddCard.addEventListener("click", () => { //Обработчик клика по кнопке (крестик) добавления карточки
  validationAddCard.removeValidationErrors();
  popupAddCard.openPopup()
});


