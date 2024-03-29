import './pages/index.css';
import { initialCards } from './components/cards.js';
import {createCard, deleteCard, handleLikes} from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation , clearValidation } from './components/validation.js';
import { getUserProfile, config, apiRoutes, getCards, updateUserProfile, addCard, updateAvatar } from './components/Api.js';

// @todo: DOM узлы
const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const profileEditButton = document.querySelector('.profile__edit-button'); 
const popupTypeEdit= document.querySelector('.popup_type_edit');   
const profileTitle = document.querySelector('.profile__title');  
const profileImg = document.querySelector('.profile__image'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const profileDescription = document.querySelector('.profile__description'); 
const profileAddButton = document.querySelector('.profile__add-button'); 
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupsClose = document.querySelectorAll('.popup__close');
const formElement = document.forms['edit-profile']; 
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const formNewPlace = document.forms['new-place']; 
const cardLikes = document.querySelectorAll('.card-likes');
const validationConfig = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// @todo: Функция создания карточки
function createNewCard (evt) {  
  openPopup(popupTypeImage);
  const card = evt.target.closest('.card');
  const cardSrc = evt.target.getAttribute('src');
  const cardAlt = evt.target.getAttribute('alt');
  const cardTitle = card.querySelector('.card__title').textContent;
 
  popupImg.src = cardSrc; 
  popupImg.alt = cardAlt; 
  popupCaption.textContent = cardTitle;
};

//initialCards.forEach(element => {
  //placesList.append(createCard(element, deleteCard, likeCard, createNewCard));
//});

// @todo: Открытие модального окна
enableValidation(validationConfig);

function openTypeProfile() {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupTypeEdit,validationConfig); 
   
};

function openNewCardPopup() {
  openPopup(popupTypeNewCard);
  clearValidation(popupTypeNewCard, validationConfig);
}

//const newAvatarButton = document.querySelector('.popup-new-avatar button'); 
const avatarInput = document.querySelector('.popup__input_type_avatar'); 
const profileImage = document.querySelector('.profile__image'); 
const popupNewAvatar = document.querySelector('.popup-new-avatar');



function openNewAvatarPopup() {
  openPopup(popupNewAvatar); 
  avatarInput.value = ''; 
  clearValidation(popupNewAvatar, validationConfig); 
}

// слушатель событий для открытия модального окна
profileImage.addEventListener("click", openNewAvatarPopup); //уточнить кнопку

profileAddButton.addEventListener("click", openNewCardPopup);

profileEditButton.addEventListener("click", openTypeProfile);
    
// @todo: Закрытие модального окна
popupsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener("click", () => {
    closePopup(popup);
    clearValidation(formElement,validationConfig);
  });
});

// @todo: Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  function makeRequestCard () {
    evt.preventDefault();
  
  const name = nameInput.value;
  const about = jobInput.value;
  
  updateUserProfile(config, apiRoutes, name, about)
    .then((newCardData) => {
      console.log(newCardData);
      // обновляем данные пользователя на странице после успешного ответа от сервера
      profileTitle.textContent = newCardData.name;
      profileDescription.textContent = newCardData.about;
    })
    .catch((error) => console.log(`Ошибка: ${error}`)); // Если есть ошибка, выводим ее в консоль

  closePopup(popupTypeEdit); 
  }
  // Обработка отправки формы с использованием вспомогательной функции
  handleSubmit(makeRequestCard, evt);
}  

formElement.addEventListener('submit', handleFormSubmit); 

// @todo: Добавление карточки
function createNewPlace(evt) {

  function makeRequest() {
  evt.preventDefault();
  
  const newCardData = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };
  
  addCard(config, apiRoutes, newCardData.name, newCardData.link)
    .then((cardData) => {
      // cardData - это данные новой карточки, возвращенные сервером
      console.log(cardData);

      // Если запрос прошел успешно, создайте элемент карточки и добавьте его на страницу
      const newCardElement = createCard(cardData, deleteCard, handleLikes, createNewCard);
      placesList.prepend(newCardElement);

      evt.target.reset();
      closePopup(popupTypeNewCard);
    })
    .catch((error) => console.log(error)); // Выводим сообщение об ошибке
  }

    handleSubmit(makeRequest, evt);
}

formNewPlace.addEventListener('submit', createNewPlace); 



function handleAvatarFormSubmit(evt) {

  function makeRequestAvatar() {
  evt.preventDefault();
  
  const avatarLink = avatarInput.value;

  updateAvatar(config, apiRoutes, avatarLink)
    .then((updatedUserData) => {
      console.log(updatedUserData);
      // обновляем аватар пользователя на странице после успешного ответа от сервера
      profileImg.style.backgroundImage = `url(${updatedUserData.avatar})`;
    })
    .catch((error) => console.log(`Ошибка: ${error}`));

  closePopup(popupNewAvatar);
  }
  handleSubmit(makeRequestAvatar, evt);
} 

const avatarFormElement = document.querySelector('.popup__form[name="avatar"]');
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);



//Api
// Данные пользователя

let userId = "";

function setUserInfo(newCardData) {
  console.log(newCardData); // для вывода всех данных от сервера
  if (newCardData) {
    profileTitle.textContent = newCardData.name;
    profileDescription.textContent = newCardData.about;
    profileImg.style.backgroundImage = `url(${newCardData.avatar})`;
    userId = newCardData._id;
  }
  console.log(userId); // вывод userId после его установки
}

// Промис получения информации о пользователе и карточках
Promise.all([getUserProfile(config, apiRoutes), getCards(config, apiRoutes)]) 
  .then(([newCardData, cardsData]) => {
    // обрабатываем данные пользователя
    setUserInfo(newCardData); // используем функцию setUserInfo для установки данных пользователя

    placesList.innerHTML = "";
    // обрабатываем данные карточек
    cardsData.forEach(element => {
      // Создаем карточку на основе данных с сервера и добавляем ее на страницу
      placesList.append(createCard(element, deleteCard, handleLikes, createNewCard, userId));
    });
  })
  .catch(error => console.log(`Ошибка: ${error}`)); 



// Функция для управления текстом кнопки во время загрузки
function renderLoading(isLoading, button, initialText = "Сохранить", loadingText = "Сохранение...") {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}

// Универсальная функция загрузки
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);

  // Выполнение запроса
  request()
    .then(() => {
      evt.target.reset(); 
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, loadingText); 
    });
}

