export default class UserInfo {
  constructor(profileData) { //Создаем конструктор класса, в () пишем параметр- объект данных профиля, созданный в индексе
    this._editName = document.querySelector(profileData.editNameSelector); //Обращаемся к одному из свойств объекта и методом квери селектор находим дом элемент- ".profile__edit"
    this._editJob = document.querySelector(profileData.editJobSelector); //Обращаемся к одному из свойств объекта и методом квери селектор находим дом элемент- ".profile__text"
    this._editAvatar = document.querySelector(profileData.editAvatarSelector);
  }

  getUserInfo() {//Создаем публичный метод, который возвращает данные, он попадает в первую форму попапа и отвечает за редактирование профиля, поэтому свойства названы так же как  name в инпутах этой формы
    return {
      name: this._editName.textContent,
      occupation: this._editJob.textContent,
    };
  }

  setUserInfo({ avatar, name, occupation }) {//Создаем публичный метод, который получает объект из двух свойств в которых лежат строки и будети класть их на стрпаницу в первую форму попапа
    this._editAvatar.src = avatar;
    this._editName.textContent = name;
    this._editJob.textContent = occupation;
  }
}
