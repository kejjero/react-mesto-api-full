class API {
    constructor( { baseUrl, headers } ) {
        this._url = baseUrl;
        this._headers = headers;
    }

    // обработка запроса
    _makeRequest(promise) {
        return promise.then((res) => {
            if(res.ok) {
                return res.json();
            }
            throw 'Ошибка запроса'
        })
            .then((cards) => {
                return cards;
            })
    }

    // получить карточки
    getCards() {
        const promise = fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        });
        return this._makeRequest(promise)
    }

    // отправить карточку
    sendCard(name, link) {
        const promise = fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        });
        return this._makeRequest(promise)
    }

    // Получить профиль пользователя
    getUserInfo() {
        const promise = fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        });
        return this._makeRequest(promise)
    }

    // Редактировать профиль пользователя
    editProfile(name, about) {
        const promise = fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        });
        return this._makeRequest(promise)
    }

    // Редактировать аватар
    editAvatar(avatar) {
        const promise = fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        });
        return this._makeRequest(promise)
    }

    // Добавить лайк
    addLike(id) {
        const promise = fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        return this._makeRequest(promise)
    }

    // Удалить лайк
    deleteLike(id) {
        const promise = fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        return this._makeRequest(promise)
    }

    // Удалить карточку
    deleteCard(id) {
        const promise = fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        return this._makeRequest(promise)
    }
}

// Экземпляр класса Api
export const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization:
            '6550da10-2d55-4388-86e4-3d7ab266355b',
            'Content-Type': 'application/json'
    }
});

export default api;