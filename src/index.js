import "./pages/index.css"

import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
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
} from "./scripts/utils/constants.js";


const validationEditProfile = new FormValidator(configValidation, formEditProfile) //Экземпляр класса FormValidator для валидации инпутов попапа редактирования профиля
validationEditProfile.enableValidation()

const validationAddCard = new FormValidator(configValidation, formAddCard) //Экземпляр класса FormValidator для валидации инпутов попапа добавления карточек 
validationAddCard.enableValidation()

const userInfo = new UserInfo(profileData); //Экземпляр класса UserInfo 

const popupImage = new PopupWithImage(popupImageSelector); //Экземпляр класса PopupWithImage 


const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => { //Экземпляр класса PopupWithForm для функции редактирования профиля
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue())
  popupProfile.closeForm();
})

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => { //Экземпляр класса PopupWithForm для функции добавления карточки
  evt.preventDefault();
  section.addItem(popupAddCard.getInputsValue())
  popupAddCard.closeForm()
})

const section = new Section({ //Экземпляр класса Section
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, selectorTemplate, popupImage.openPopup);
    return card.createCard();
  }
}, cardElementsSelector)
section.ArrayCards()

popupImage.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа изображений
popupProfile.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа редактирования профиля
popupAddCard.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа добавления карточек

profileEdit.addEventListener("mousedown", () => { //Обработчик клика по кнопке (карандаш) редактирования профиля
  validationEditProfile.removeValidationErrors();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.openPopup()
});

profileAddCard.addEventListener("mousedown", () => { //Обработчик клика по кнопке (крестик) добавления карточки
  validationAddCard.removeValidationErrors();
  popupAddCard.openPopup()
});


