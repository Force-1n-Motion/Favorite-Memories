const profileEdit = document.querySelector(".profile__edit"); //Находит кнопку карандаш (открытие попапа редактирования профиля)
const profileAddCard = document.querySelector(".profile__add-card"); //Находит кнопку крестик (открытие попапа добавления карточек)
const profileAvatar = document.querySelector(".profile__avatar-button")
const formEditProfile = document.forms["form-edit"];
const formAddCard = document.forms["form-add"];
const formAvatar = document.forms["form-avatar"];
const selectorTemplate = "#idTemplate";
const popupProfileSelector = ".popup-edit";
const popupImageSelector = ".popup-images";
const popupAddCardSelector = ".popup-add-card";
const cardElementsSelector = ".elements";
const popupAvatarSelector = ".popup-avatar"; 
const popupDeleteCardSelector = ".popup-delete-card";

const profileData = { //Создаем объект профиля
  editNameSelector: ".profile__title", 
  editJobSelector: ".profile__text",
  editAvatarSelector: ".profile__avatar"
}


//==========================================Объект селекторов и классов, используемых для валидации форм-=====================================================//
const configValidation = {
  formSelector: ".popup__form", //Селектор используется во всех случаях, когда элемент нужно найти через document.querySelector, чтобы затем с ним работать
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled", //Класс испольуется в том случае, когда мы работаем с элементом который будет добавляться/убираться, как в случае с данной кнопкой disabled ( этот класс убирается и кнопка становится активна )
  activeButtonClass: "popup__save_enabled",
  inputErrorClass: "popup__input_errored",
  errorClass: "popup__error_visible",
};

export {
  
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
  
}