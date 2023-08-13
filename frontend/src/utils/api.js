export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    // Проверка запроса к серверу
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    // Редактирование профиля:отправка и загрузка информации о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }

    setUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkResponse);
    }

    // Обновление аватара пользователя
    setUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._checkResponse);
    }

    // Загрузка карточек с сервера
    getPhotoCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Добавление новой карточки
    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse);
    }

    // Удаления карточки
    deleteCard(card) {
        return fetch(`${this._url}/cards/${card._id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Лайки и дизлайки карточек
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }
}

const api = new Api({
    url: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
