import initialCards from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileEdit = document.querySelector(".profile__edit");
const profileAddCard = document.querySelector(".profile__add-card");
const popupEditProfile = document.querySelector(".popup_edit");
const addCardPopup = document.querySelector(".popup_add_card");
const popupImages = document.querySelector(".popup-images");
const userName = document.querySelector(".popup__input_user_name");
const userOccupation = document.querySelector(".popup__input_user_occupation");
const elementName = document.querySelector(".popup__input_element_name");
const elementLink = document.querySelector(".popup__input_element_link");
const formEditProfile = document.forms["form-edit"];
const formAddCard = document.forms["form-add"];
const closeButtons = document.querySelectorAll(".popup__close");
const cardElements = document.querySelector(".elements");
const imagePopupPicture = document.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");
const selectorTemplate = "#idTemplate";
//-----------------------------------Универсальные функции открытия и закрытия попапов--------------------------------------------------//
//Универсальная функция открытия попапов, добавляет класс "popup_opened"
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escPopup); //Добавляем в Универсальную функцию открытия попапа слушатель нажатия на клавишу ("keydown") первым оргументом и вторым саму функцию заакрытия попапов на эскейп
}

//Универсальная функция закрытия попапов, удаляет класс "popup_opened"
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escPopup); //Убираем из Универсальной функции открытия попапа слушатель нажатия на клавишу ("keydown") первым оргументом и вторым саму функцию заакрытия попапов на эскейп
}
//---------------------------------------------------------------------------------------------------------------------------------------//

//Заполнение полей формы данными из профиля
function clickEditButton() {
  validationEditProfile.removeValidationErrors()
  userName.value = profileTitle.textContent;
  userOccupation.value = profileText.textContent;
  validationAddCard.disableButton()
  openPopup(popupEditProfile);
};

//Сохранение данных профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = userName.value;
  profileText.textContent = userOccupation.value;
  closePopup(popupEditProfile);
};

//Функция открытия изображения в попапе
function clickImage(cardData) {
  imagePopupPicture.alt = cardData.name;
  imagePopupPicture.src = cardData.link;
  caption.textContent = cardData.name;
  openPopup(popupImages);
};

function saveElement() {
  cardElements.prepend(createElements({name: elementName.value, link: elementLink.value}));
  validationAddCard.disableButton()
}

function createElements(element) {
  const card = new Card(element, selectorTemplate, clickImage); //Объявляем переменную card в ограниченной области видимости и присваимаем ей в качестве значения созданный класс с параметрами element- элемент массива, selectorTemplate- темплейт элемент, clickImage- ссылка на функцию открытия картинки в попапе ( без скобок, чтобы не вызывалась)
  return card.createCard()
}

//Функция добавления новой карточки
function addCard(cardElements, card) {//Объявляем функцию, которая добавляет карточки, в параметрах указываем переменные, значение которых описано в глобальной области видимости
  cardElements.append(card); //Добавляем новую карточку впереди списка карточек
}

initialCards.forEach((element) => {//Методом forEach проходим по массиву карточек, объявляем колбэк функцию, в аргументе указываем карточку
  addCard(cardElements, createElements(element)); //Функция добавления карточек
});



// Добавление изображения
function submitAddCardForm(evt) {
  evt.preventDefault();
  saveElement(evt);
  evt.target.reset();
  closePopup(addCardPopup);
}

profileAddCard.addEventListener("click", () => {
  validationAddCard.removeValidationErrors()
  openPopup(addCardPopup);
});

closeButtons.forEach((button) => {
  // определяем 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

profileEdit.addEventListener("click", clickEditButton);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", submitAddCardForm);


//------------------------------------------------------Функции закрытия попапов на эскейп и оверлэй-------------------------------------------------------//
//Функция закрытия попапа при клике на оверлэй
function setPopupsOverlayListeners() {
  const popups = Array.from(document.querySelectorAll(".popup"));
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", function (evt) {
      if (evt.target === evt.currentTarget) {
        popup.classList.remove("popup_opened");
      }
    });
  });
}
//Вызов функции закрытия попапа при клике на эскейп
setPopupsOverlayListeners();

function escPopup(evt) {
  if (evt.code === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    if (popupActive) {
      closePopup(popupActive);
    }
  }
}

//==========================================Объект селекторов и классов, используемых для валидации форм-=====================================================//
const configValidation = {
  formSelector: ".popup__form", //Селектор используется во всех случаях, когда элемент нужно найти через document.querySelector, чтобы затем с ним работать
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled", //Класс испольуется в том случае, когда мы работаем с элементом который будет добавляться/убираться, как в случае с данной кнопкой disabled ( этот класс убирается и кнопка становится активна )
  activeButtonClass: "popup__save_enabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__error_visible",
};

const validationEditProfile = new FormValidator(configValidation, formEditProfile)
validationEditProfile.enableValidation()


const validationAddCard = new FormValidator(configValidation, formAddCard)
validationAddCard.enableValidation()

