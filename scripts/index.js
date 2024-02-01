    
// @todo: DOM узлы

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');


// @todo: Функция создания карточки
initialCards.forEach(function (element) {
    const initialCardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    initialCardsElement.querySelector('.card__title').textContent = element.name;
    initialCardsElement.querySelector('.card__image').alt = element.name;
    initialCardsElement.querySelector('.card__image').src = element.link;
  
    initialCardsElement.addEventListener('click', deleteButton);

    placesList.append(initialCardsElement);
    
});

// @todo: Функция удаления карточки
function deleteButton (event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
};
