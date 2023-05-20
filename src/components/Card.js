export default class Card { //Создаем класс
  constructor(cardData, selectorTemplate, clickImage) { //В конструкторе указываем, cardData- объект, который в себе содержит линк и нэйм карточки, selectorTemplate- переменная, которая в себе содержит id темплейта в глобальной области и ссылка на функцию clickImage
    this._cardData = cardData; //Создаем свойство, которое будет содержать объект из свойств карточки (линк и нэйм)
    this._link = cardData.link;
    this._name = cardData.title;
    this._selectorTemplate = selectorTemplate;
    this._clickImage = clickImage;
  }
  _templateClone() {//Создаем приватный метод
    return document.querySelector(this._selectorTemplate).content.querySelector(".element").cloneNode(true); //Находим в документе наш Темплейт, затем находим весь контент темплейта (element) и клонируем ее
  } //Результатом этой функции будет клонированная наша раазметка

  _cardLike = () => { //Приватный метод, который меняет цвет кнопки лайка, т.е. добавляет или убирает класс лайка, в зависимости от того активна кнопка или нет в текущий момент при нажатии
    this._buttonLike.classList.toggle("element__button-like_active");
  }
 
  _cardDelete = () => { // Приватный метод удаления карточек и обнуления памяти после удаления, поскольку карточки хронятся в памяти даже после удаления
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  _cardImage = () => {
    this._clickImage(this._cardData);
  }

  _setEventListeners() { //Приватный метод, который навешивает слушатели
    this._buttonLike.addEventListener("click", this._cardLike);
    this._buttonDelete.addEventListener("click", this._cardDelete);
    this._elementImg.addEventListener("click", this._cardImage);
  }
  

  createCard() { //Создаем метод создания карточек
    this._cloneElement = this._templateClone(); //В объекте создаем свойство cloneElement и присваиваем ему результат выполнения метода _templateClone()
    this._elementImg = this._cloneElement.querySelector(".element__img"); //Создаем свойство _elementImg, присваиваем ему результат поиска картинки методом querySelector по клонЭлементу, который в свою очередь равен результату, полученному от метода _templateClone()
    this._buttonLike = this._cloneElement.querySelector(".element__button-like"); //Создаем свойство _buttonLike, присваиваем ему результат поиска кнопки лайка методом querySelector по клонЭлементу, который в свою очередь равен результату, полученному от метода _templateClone()
    this._buttonDelete = this._cloneElement.querySelector(".element__button-delete"); //Создаем свойство _buttonLike, присваиваем ему результат поиска кнопки лайка методом querySelector по клонЭлементу, который в свою очередь равен результату, полученному от метода _templateClone()
    this._subTitle = this._cloneElement.querySelector(".element__text"); //Создаем свойство _subTitle, присваиваем ему результат поиска подзаголовка H2 методом querySelector по клонЭлементу, который в свою очередь равен результату, полученному от метода _templateClone()
    this._elementImg.src = this._link; //Обращаемся к свойству src свойства _elementImg и присваиваем ему значение this._cardData.link,  т.е. ссылку из объекта данных карточки
    this._elementImg.alt = this._name; //Обращаемся к свойству alt свойства _elementImg и присваиваем ему значение this._cardData.name, т.е. имя из объекта данных карточки
    this._subTitle.textContent = this._name; //Обращаемся к свойству _subTitle и его свойству textContent, присвааиваем ему значение this._cardData.name, т.е. имя из объекта данных карточки
    this._setEventListeners();
    return this._cloneElement; //После выполнения всего кода в этой функции мы возвращаем результат this._cloneElement
  }
}

