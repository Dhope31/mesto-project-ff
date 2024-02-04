    
// @todo: DOM узлы

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');


// @todo: Функция создания карточки
    function createCard (cardData, deleteCard) {
    const initialCardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    initialCardsElement.querySelector('.card__title').textContent = cardData.name;
    initialCardsElement.querySelector('.card__image').alt = cardData.name;
    initialCardsElement.querySelector('.card__image').src = cardData.link;
  
    initialCardsElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(initialCardsElement);
    }); 

    return initialCardsElement;
};

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.remove();
};

initialCards.forEach(element => {
    placesList.append(createCard(element, deleteCard));
  });