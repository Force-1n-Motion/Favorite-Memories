const editPopup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__edit");
const closeProfile = document.querySelector(".popup__close");

profileEditButton.addEventListener("click", function () {
  openPopup(editPopup);
});

closeProfile.addEventListener("click", function () {
  closePopup(editPopup);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}



const ProfileUserName = document.querySelector(".profile__title");
ProfileUserName.textContent = userName;
console.log(ProfileUserName);

const ProfileuserOccupation = document.querySelector(".profile__text");
ProfileuserOccupation.textContent = userOccupation;

const InputUserName = document.querySelector(".user-name");
InputUserName.value = userName;

const InputUserOccupation = document.querySelector(".user-occupation");
InputUserOccupation.value = userOccupation;

const handleEditButtonClick = function () {
  toggleInitialPopup();
  InputUserName.value = ProfileUserName.textContent;
  InputUserOccupation.value = ProfileuserOccupation.textContent;
};

const handleFormSubmit = function (event) {
  event.preventDefault();
  ProfileUserName.textContent = InputUserName.value;
  ProfileuserOccupation.textContent = InputUserOccupation.value;
  toggleInitialPopup();
};

formPopup.addEventListener("submit", handleFormSubmit);