export const regExp = {
  url: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
  name: /^[a-zA-Zа-яёА-ЯЁ ]*$/,
  email: /.+@.+\..+/,
  password: /[\S]{0,}\s/
};

const options = {
  // baseUrl: 'https://api.hgs.students.nomoreparties.space'
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
};

export default options;
