import './pages/index.css';
import { initialCards } from './components/cards.js'

// @todo: DOM узлы

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

// @todo: Функция создания карточки
import {createCard, deleteCard, likeCard} from './components/card.js';

function picture (evt) {  
  openPopup(popupTypeImage);
  const card = evt.target.closest('.card');
  const cardSrc = evt.target.getAttribute('src');
  const cardAlt = evt.target.getAttribute('alt');
  const cardTitle = card.querySelector('.card__title').textContent;

  const popupImg = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImg.src = cardSrc;
  popupImg.alt = cardAlt;
  popupCaption.textContent = cardTitle;
};

initialCards.forEach(element => {
    placesList.append(createCard(element, deleteCard, likeCard, picture));
  });

// @todo: Открытие модального окна
  const profileEditButton = document.querySelector('.profile__edit-button'); 
  const popupTypeEdit= document.querySelector('.popup_type_edit');   
  const profileTitle = document.querySelector('.profile__title');  
  const profileDescription = document.querySelector('.profile__description'); 
  const profileAddButton = document.querySelector('.profile__add-button'); 
  const popupTypeNewCard = document.querySelector('.popup_type_new-card');
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupClose = document.querySelectorAll('.popup__close');
  const popups = document.querySelectorAll('.popup');

  import { nameInput, jobInput, openPopup, closePopup } from './components/modal.js';

  function openTypeProfile() {
    openPopup(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  };

  profileEditButton.addEventListener("click", openTypeProfile);
  profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));
    
// @todo: Закрытие модального окна

  popupClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () => closePopup(popup));
});

// @todo: Редактирование имени и информации о себе

  const formElement = document.forms['edit-profile']; 

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameInput.value;
    jobInput.value;
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit); 

  // @todo: Добавление карточки
  const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
  const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
  const formNewPlace = document.forms['new-place']; 

  function newPlace(evt) {
    evt.preventDefault();

    const newCardData = {
      name: popupInputTypeCardName.value,
      link: popupInputTypeUrl.value,
    };

    const newCardElement = createCard(newCardData, deleteCard, likeCard, picture);
    placesList.prepend(newCardElement);    

    evt.target.reset();
    closePopup(popupTypeNewCard);
};

formNewPlace.addEventListener('submit', newPlace); 