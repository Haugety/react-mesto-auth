import options from './data';

class Auth {
  constructor(options) {
    this._options = options;
  }

  register(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  authorize(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

  getContent(token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }

}

const auth = new Auth(options);

export default auth;
