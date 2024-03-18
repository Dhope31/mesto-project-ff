import './pages/index.css';
import { initialCards } from './components/cards.js'

// @todo: DOM узлы

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


// @todo: Функция создания карточки
import {createCard, deleteCard, likeCard} from './components/card.js';

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

initialCards.forEach(element => {
  placesList.append(createCard(element, deleteCard, likeCard, createNewCard));
});

// @todo: Открытие модального окна
const profileEditButton = document.querySelector('.profile__edit-button'); 
const popupTypeEdit= document.querySelector('.popup_type_edit');   
const profileTitle = document.querySelector('.profile__title');  
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const profileDescription = document.querySelector('.profile__description'); 
const profileAddButton = document.querySelector('.profile__add-button'); 
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupsClose = document.querySelectorAll('.popup__close');
const validationConfig = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

import { openPopup, closePopup } from './components/modal.js';
import { enableValidation , clearValidation } from './components/validation.js';

function openTypeProfile() {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElement,validationConfig); 
  enableValidation(validationConfig); 
};

function openNewCardPopup() {
  openPopup(popupTypeNewCard);
  clearValidation(formElement, validationConfig);
  enableValidation(validationConfig);
}

profileAddButton.addEventListener("click", openNewCardPopup);

profileEditButton.addEventListener("click", openTypeProfile);

//profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));
    
const formElement = document.forms['edit-profile']; 

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
  evt.preventDefault();
  nameInput.value;
  jobInput.value;
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit); 
}

formElement.addEventListener('submit', handleFormSubmit); 

// @todo: Добавление карточки
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const formNewPlace = document.forms['new-place']; 

function createNewPlace(evt) {
  evt.preventDefault();

  const newCardData = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };

  const newCardElement = createCard(newCardData, deleteCard, likeCard, createNewCard);
  placesList.prepend(newCardElement);    

  evt.target.reset();
  closePopup(popupTypeNewCard);
};

formNewPlace.addEventListener('submit', createNewPlace); 


