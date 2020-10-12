import options from './data';

class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  setUserInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  setUserAvatar(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  setCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  removeCard = (cardId) => {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    if (!isLiked) {

      return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._options.headers
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
        });

    }
    else {

      return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._options.headers
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
        });

    }
  }

}

const api = new Api(options);

export default api;
