// Токен: f313cf58-23c2-4016-9c78-146b5c5913a8
// Идентификатор группы: wff-cohort-9
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    Authorization: "f313cf58-23c2-4016-9c78-146b5c5913a8",
    "Content-Type": "application/json"
  }
}

export const apiRoutes = {
  user: "users/me",
  cards: "cards",
  likes: (id) => `/cards/${id}/likes`,
  avatar: "avatar"
};

// Общая функция для выполнения запросов
const doFetch = (url, options) => {
  return fetch(url, options)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
};

// Получение информации о пользователе
export const getUserProfile = (config, apiRoutes) => {
  return doFetch (`${config.baseUrl}/${apiRoutes.user}`, { headers: config.headers });
}

// Загрузка карточек с сервера
export const getCards = (config, apiRoutes) => {
  const options = {
    method: "GET",
    headers: config.headers
  };
  return doFetch (`${config.baseUrl}/${apiRoutes.cards}`, options)
    .then(response => response);  // если ответ сервера пустой, вернуть пустой массив
}

export function renderCards(cards, userId) {
  cards.forEach((card) => {
     createCard(card, deleteCard, handleLikes, createNewCard, userId); // подставьте свои функции
  });
}

// Обновление информации о пользователе
export const updateUserProfile = (config, apiRoutes, name, about) => {
  const options = {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  };
  return doFetch (`${config.baseUrl}/${apiRoutes.user}`, options);
}

// Добавление новой карточки на сервер
export const addCard = (config, apiRoutes, name, link) => {
  const options = {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name, // Название создаваемой карточки
      link: link  // Ссылка на картинку
    })
  };
  return doFetch (`${config.baseUrl}/${apiRoutes.cards}`, options);
};

//добавление и удаление лайка
export const addLikeCard = (config, apiRoutes, id)  => {
  const options = {
    method: "PUT",
    headers: config.headers
  };
  return doFetch (`${config.baseUrl}${apiRoutes.likes(id)}`, options);
};

export const deleteLikeCard = (config, apiRoutes, id) => {
  const options = {
    method: "DELETE",
    headers: config.headers
  };
  return doFetch (`${config.baseUrl}${apiRoutes.likes(id)}`, options);
};

//удаление карточки
export const deleteCardApi = (config, apiRoutes, id) => {
  const options = {
    method: "DELETE",
    headers: config.headers
  };
  return doFetch(`${config.baseUrl}/${apiRoutes.cards}/${id}`, options);
};

//обновление аватара
export const updateAvatar = (config, apiRoutes, avatarLink) => {
  const options = {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  };
  return doFetch (`${config.baseUrl}/${apiRoutes.user}/${apiRoutes.avatar}`, options);
};

