const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const userName = document.querySelector(".popup__input_user_name");
const userOccupation = document.querySelector(".popup__input_user_occupation");
const popupForm = document.querySelector(".popup__form");
const popup = document.querySelector(".popup");
const profileEdit = document.querySelector(".profile__edit");
const popupClose = document.querySelector(".popup__close");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Заполнение полей формы данными из профиля
function openPopup() {
  popup.classList.add("popup_opened");
  userName.value = profileTitle.textContent;
  userOccupation.value = profileText.textContent;
}

// Закрытие попап
function closePopup() {
  popup.classList.remove("popup_opened");
}

// Сохранение данных профиля
const handleFormSubmit = function (event) {
  event.preventDefault();
  profileTitle.textContent = userName.value;
  profileText.textContent = userOccupation.value;
  closePopup();
};

popupForm.addEventListener("submit", handleFormSubmit);
profileEdit.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
