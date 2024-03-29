// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

import { config, apiRoutes, addLikeCard, deleteLikeCard, deleteCardApi } from './Api.js';

export function createCard (cardData, deleteCard, handleLikes, createNewCard, userId) {
  const initialCardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  initialCardsElement.querySelector('.card__title').textContent = cardData.name;
  initialCardsElement.querySelector('.card__image').alt = cardData.name;
  initialCardsElement.querySelector('.card__image').src = cardData.link;

  const cardLikeButton = initialCardsElement.querySelector('.card__like-button');
  const cardLikeCounter = initialCardsElement.querySelector('.card__like-counter');
  const deleteButton =  initialCardsElement.querySelector(".card__delete-button");

  console.log('userId:', userId);
console.log('cardData.owner._id:', cardData.owner._id);
  // Слушатель удаления карточки если пользователь является владельцем
  if (userId !== cardData.owner._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "";
    deleteButton.addEventListener("click", () => {
      const cardId = cardData._id;
      deleteCardCallback(initialCardsElement, cardId);
    });
  }
  
  // Проверка наличия лайка пользователя в массиве likes
  const isLiked = cardData.likes.some((like) => like._id === userId);
if (isLiked) {
  cardLikeButton.classList.add("card__like-button_is-active");
}
cardLikeCounter.textContent = cardData.likes.length;

cardLikeButton.addEventListener('click', () => {
  handleLikes(cardLikeCounter, cardLikeButton, cardData);
});

  initialCardsElement.querySelector('.card__image').addEventListener('click', createNewCard);

  initialCardsElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(initialCardsElement);
  }); 

  return initialCardsElement;
};

function deleteCardCallback(config, apiRoutes, cardElement, cardId) {
  deleteCardApi(config, apiRoutes, cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteCard(evt) {
  evt.remove();
};

 // Функция подсчета лайков
export function handleLikes(cardLikeCounter, cardLikeButton, cardData) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    // Пользователю уже понравилась карточка, поэтому выполните операцию "не нравится".
    deleteLikeCard(config, apiRoutes, cardData._id)
    .then((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении лайка:", err);
    });
  } else {
    // понравилась карта, поэтому выполните аналогичную операцию
    addLikeCard(config, apiRoutes, cardData._id)
    .then((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении лайка:", err);
    });
  }
}

