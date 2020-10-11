export const regExp = {
  url: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
  name: /^[a-zA-Zа-яёА-ЯЁ ]*$/,
  email: /.+@.+\..+/,
  password: /[\S]{0,}\s/
};

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  baseUrlAuth: 'https://auth.nomoreparties.co',
  headers: {
    authorization: '2cf602a9-f630-4a8e-9437-bb139a960cac',
    'Content-Type': 'application/json'
  }
};

export default options;
