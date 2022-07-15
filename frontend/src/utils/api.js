class API {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    get _headers() {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
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
        const promise = fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        });
        return this._makeRequest(promise)
    }

    // отправить карточку
    sendCard(name, link) {
        const promise = fetch(`${this._baseUrl}/cards`, {
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
        const promise = fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        });
        return this._makeRequest(promise)
    }

    // Редактировать профиль пользователя
    editProfile(name, about) {
        const promise = fetch(`${this._baseUrl}/users/me`, {
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
        const promise = fetch(`${this._baseUrl}/users/me/avatar`, {
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
        const promise = fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        return this._makeRequest(promise)
    }

    // Удалить лайк
    deleteLike(id) {
        const promise = fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        return this._makeRequest(promise)
    }

    // Удалить карточку
    deleteCard(id) {
        const promise = fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        return this._makeRequest(promise)
    }
}

// Экземпляр класса Api
export const api = new API({
    baseUrl: 'https://api.kejero.nomoredomains.xyz',
});

export default api;