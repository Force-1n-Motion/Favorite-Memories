import "./index.css";
import Api from "../components/Api.js"

import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEdit,
  profileAddCard,
  profileAvatar,
  selectorTemplate,
  popupProfileSelector,
  popupImageSelector,
  popupAddCardSelector,
  popupAvatarSelector,
  popupDeleteCardSelector,
  cardElementsSelector,
  profileData,
  configValidation,
  formEditProfile,
  formAddCard,
  formAvatar,
} from "../utils/constants.js";

const validationEditProfile = new FormValidator(configValidation, formEditProfile) //Экземпляр класса FormValidator для валидации инпутов попапа редактирования профиля
validationEditProfile.enableValidation()

const validationAddCard = new FormValidator(configValidation, formAddCard) //Экземпляр класса FormValidator для валидации инпутов попапа добавления карточек 
validationAddCard.enableValidation()

const validationAvatar = new FormValidator(configValidation, formAvatar) //Экземпляр класса FormValidator для валидации инпутов попапа аватарки
validationAvatar.enableValidation()

const userInfo = new UserInfo(profileData); //Экземпляр класса UserInfo 

const popupImage = new PopupWithImage(popupImageSelector); //Экземпляр класса PopupWithImage 

const api = new Api({ //Экземпляр класса Api
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "e953470f-7b3a-4696-9a09-3ba0a29b5fee",
    "Content-Type": "application/json"
  }
})

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => { //Экземпляр класса PopupWithForm для функции редактирования профиля через попап
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, occupation: res.about, avatar: res.avatar })
      popupProfile.closeForm()
    })
    .catch((error => console.error(`Ошибка при редактировании профиля ${error}`)))
    .finally( () => popupProfile.resetTextSubmitButton())
})

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, (data) => { //Экземпляр класса PopupWithForm для изменения картинки аватара через попап
  api.setUserAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, occupation: res.about, avatar: res.avatar })
      popupEditAvatar.closeForm()
    })
    .catch((error) => console.error(`Ошибка при изменении аватара ${error}`))
    .finally(() => popupEditAvatar.resetTextSubmitButton())
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => { //Экземпляр класса PopupWithForm для функции добавления одной  карточки лично
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([userBox, cardBox]) => {
      cardBox.idDeveloper = userBox._id
      section.addItem(renderer(cardBox))
      popupAddCard.closeForm()
  })
    .catch((error => console.error(`Ошибка добавления карточки ${error}`)))
    .finally(() => popupAddCard.resetTextSubmitButton())
})

const popupDeleteCard = new PopupWithDeleteCard(popupDeleteCardSelector, ({ card, idCard }) => {
  api.deletecard(idCard)
    .then(res => {
      card.removeCardItem()
      popupDeleteCard.closeForm()
    }) 
    .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
    .finally(() => popupDeleteCard.resetTextSubmitButton())
})

  const renderer = (element) => {
    const card = new Card(element, selectorTemplate, popupImage.openPopup, popupDeleteCard.openPopup, (likeItem, idCard) => {
      if (likeItem.classList.contains(".element__button-like_active")){
        api.deleteLike(idCard)
          .then(res => {
            card.toggleLikeIkon(res.likes)
          })
          .catch((error) => console.error(`Ошибка снятия лайка ${error}`))
      } else {
        api.addLike(idCard)
          .then(res => {
          card.toggleLikeIkon(res.likes)
          })
          .catch((error) => console.error(`Ошибка добавления лайка ${error}`))
      }
    });
    return card.createCard();
  }

const section = new Section((element) => { //Экземпляр класса Section
  section.addItem(renderer(element))
}, cardElementsSelector)

Promise.all([api.getInfo(), api.getCards()])
  .then(([userBox, cardBox]) => {
    cardBox.forEach(element => element.idDeveloper = userBox._id)
    userInfo.setUserInfo({ name: userBox.name, occupation: userBox.about, avatar: userBox.avatar })
    section.getArrayCards(cardBox)
  })
  .catch((error => console.error(`Ошибка при создании начальных данных страницы ${error}`)))

popupImage.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа изображений
popupProfile.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа редактирования профиля
popupAddCard.setEventListeners() //Вызов публичного метода setEventListeners() для экземпляра класса попапа добавления карточек
popupEditAvatar.setEventListeners()

profileEdit.addEventListener("click", () => { //Обработчик клика по кнопке (карандаш) редактирования профиля
  validationEditProfile.removeValidationErrors();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.openPopup()
});

profileAvatar.addEventListener("click", () => { //Обработчик клика по кнопке (карандаш) изменение аватара
  validationAvatar.removeValidationErrors();
  popupEditAvatar.setInputsValue(userInfo.getUserInfo())
  popupEditAvatar.openPopup()
})

profileAddCard.addEventListener("click", () => { //Обработчик клика по кнопке (крестик) добавления карточки
  validationAddCard.removeValidationErrors();
  popupAddCard.openPopup()
})

