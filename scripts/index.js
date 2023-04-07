
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileEdit = document.querySelector(".profile__edit");
const profileAddCard = document.querySelector(".profile__add-card");
const editPopup = document.querySelector(".popup_edit");
const addCardPopup = document.querySelector(".popup_add_card");
const popupImages = document.querySelector(".popup-images");
const userName = document.querySelector(".popup__input_user_name");
const userOccupation = document.querySelector(".popup__input_user_occupation");
const elementName = document.querySelector(".popup__input_element_name");
const elementLink = document.querySelector(".popup__input_element_link");
const formEdit = document.forms["form-edit"];
const formAdd = document.forms["form-add"];
const closeButtons = document.querySelectorAll(".popup__close");
const cardElements = document.querySelector(".elements");
const imagePopupPicture = document.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

//-------------------------------------------Массив карточек, добавляемых через template----------------------------------------------------//
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//-----------------------------------Универсальные функции открытия и закрытия попапов--------------------------------------------------//
//Универсальная функция открытия попапов, добавляет класс "popup_opened"
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escPopup); //Добавляем в Универсальную функцию открытия попапа слушатель нажатия на клавишу ("keydown") первым оргументом и вторым саму функцию заакрытия попапов на эскейп
};

//Универсальная функция закрытия попапов, удаляет класс "popup_opened"
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escPopup); //Убираем из Универсальной функции открытия попапа слушатель нажатия на клавишу ("keydown") первым оргументом и вторым саму функцию заакрытия попапов на эскейп
}
//---------------------------------------------------------------------------------------------------------------------------------------//

//Заполнение полей формы данными из профиля
const clickEditButton = function () {
  openPopup(editPopup);
  userName.value = profileTitle.textContent;
  userOccupation.value = profileText.textContent;
};

//Сохранение данных профиля
const handleProfileFormSubmit = function (event) {
  event.preventDefault();
  profileTitle.textContent = userName.value;
  profileText.textContent = userOccupation.value;
  closePopup(editPopup);
};

initialCards.forEach(function (element) {
  cardElements.append(createCard(element.name, element.link));
});

function createCard(name, link) {
  const card = document.querySelector(".elementTemplate").content.querySelector(".element");
  const element = card.cloneNode(true);
  const elementImg = element.querySelector(".element__img");
  const buttonLike = element.querySelector(".element__button-like");
  const buttonDelete = element.querySelector(".element__button-delete");

  element.querySelector(".element__text").textContent = name;
  elementImg.alt = name;
  elementImg.src = link;

  // Открытие изображения
  elementImg.addEventListener("click", () => clickImage(name, link));
  // Лайк картинки
  buttonLike.addEventListener("click", (evt) =>
    evt.target.classList.toggle("element__button-like_active")
  );
  // Слушатель удаления изображения
  buttonDelete.addEventListener("click", deleteCard);

  return element;
}

const clickImage = function (name, link) {
  imagePopupPicture.alt = name;
  imagePopupPicture.src = link;
  caption.textContent = name;

  openPopup(popupImages);
};

function saveElement() {
  cardElements.prepend(createCard(elementName.value, elementLink.value));
}

// Добавление изображения
function clickFormAdd(evt) {
  evt.preventDefault();
  saveElement(evt);
  evt.target.reset();
  closePopup(addCardPopup);
}

// Удаление изображения
function deleteCard(evt) {
  const card = evt.target.closest(".element");
  card.remove();
}

closeButtons.forEach((button) => {
  // определяем 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

profileEdit.addEventListener("click", clickEditButton);
profileAddCard.addEventListener("click", () => openPopup(addCardPopup));
formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", clickFormAdd);

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

enableValidation(configValidation);

//------------------------------------------------------Функции закрытия попапов на эскейп и оверлэй-------------------------------------------------------//
//Функция закрытия попапа при клике на оверлэй
function overlayPopup() {
  const closeModal = Array.from(document.querySelectorAll(".popup"));
  closeModal.forEach(popup => {
    popup.addEventListener("click", function (evt) {
      if(evt.target === evt.currentTarget) {
       popup.classList.remove("popup_opened");
      }
    });
  });
}
//Вызов функции закрытия попапа при клике на эскейп
overlayPopup();

function escPopup(evt) { //
  if (evt.code === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    if (popupActive) {
      closePopup(popupActive);
    }
  }
};
