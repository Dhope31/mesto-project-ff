
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, deleteCard, likeCard, picture) {
    const initialCardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    initialCardsElement.querySelector('.card__title').textContent = cardData.name;
    initialCardsElement.querySelector('.card__image').alt = cardData.name;
    initialCardsElement.querySelector('.card__image').src = cardData.link;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', likeCard);

    initialCardsElement.querySelector('.card__image').addEventListener('click', picture);

    initialCardsElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(initialCardsElement);
    }); 

    return initialCardsElement;
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
  };

export function deleteCard(evt) {
    evt.remove();
  };