//-------------------------------------------Массив карточек, добавляемых через template----------------------------------------------------//
 const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const profileEdit = document.querySelector(".profile__edit"); //Находит кнопку карандаш (открытие попапа редактирования профиля)
const profileAddCard = document.querySelector(".profile__add-card"); //Находит кнопку крестик (открытие попапа добавления карточек)
const formEditProfile = document.forms["form-edit"];
const formAddCard = document.forms["form-add"];

const selectorTemplate = "#idTemplate";
const popupProfileSelector = ".popup-edit";
const popupImageSelector = ".popup-images";
const popupAddCardSelector = ".popup-add-card";
const cardElementsSelector = ".elements";

// const popupAvatar = ".popup-avatar";
// const popupDeleteCard = ".popup-delete-card";

const profileData = { //Создаем объект профиля
  editNameSelector: ".profile__title", 
  editJobSelector: ".profile__text"
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
}