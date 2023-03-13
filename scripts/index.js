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

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
};

// Заполнение полей формы данными из профиля
const clickEditButton = function () {
  openPopup(editPopup);
  userName.value = profileTitle.textContent;
  userOccupation.value = profileText.textContent;
};

// Закрыть попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Сохранение данных профиля
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
  const card = document
    .querySelector(".elementTemplate")
    .content.querySelector(".element");
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

closeButtons.forEach(button => {
    // определяем 1 раз ближайший к крестику попап
    const popup = button.closest(".popup");
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener("click", () => closePopup(popup));
  });


profileEdit.addEventListener("click", clickEditButton);
profileAddCard.addEventListener("click", () => openPopup(addCardPopup));
formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", clickFormAdd);
