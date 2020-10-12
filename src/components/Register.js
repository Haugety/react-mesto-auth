import React from 'react';
import { regExp } from '../utils/data';
import { NavLink } from 'react-router-dom';

function Register({ onSubmit }) {
  const [inputValues, setInputValues] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState(
    {
      email: '',
      password: ''
    }
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      email: inputValues.signupEmailInput,
      password: inputValues.signupPasswordInput
    });
  }

  function handleErrors(value, type) {
    if (type === 'password' && value.length < 6) {

      if (value.includes(' ')) {
        return 'Пароль не должен содержать пробелы';
      }

      return `Пароль должен быть не короче 6 симв. Длина текста сейчас: ${value.length} симв.`;
    }

    if (type === 'email' && !regExp.email.test(value)) {
      return 'Некорректный Email-адрес';
    }

    return '';
  }

  function handleInputChange(evt) {
    const { name, value, type } = evt.target;

    setValidationErrors({ ...validationErrors, [type]: handleErrors(value, type)});

    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

    return (

      <main className="sign">
        <h1 className="sign__title">Регистрация</h1>
        <form className="sign-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="sign-form__set">
            <label className="sign-form__field">
              <input type="email" placeholder="Email" autoComplete="on" className="sign-form__input" onChange={handleInputChange} onFocus={handleInputChange} id="signup-email-input" name="signupEmailInput" maxLength="40" required />
              <span className="sign-form__input-error sign-form__input-error_active" id="name-input-error">{validationErrors.email}</span>
            </label>
            <label className="sign-form__field">
              <input type="password" placeholder="Пароль" autoComplete="off" className="sign-form__input" onChange={handleInputChange} onFocus={handleInputChange} id="signup-password-input" name="signupPasswordInput" minLength="6" maxLength="20" required />
              <span className="sign-form__input-error sign-form__input-error_active" id="name-input-error">{validationErrors.password}</span>
            </label>
            <button
              type="submit"
              className={`sign-form__save-button ${(validationErrors.email || validationErrors.password || !inputValues.signupEmailInput || !inputValues.signupPasswordInput) ? 'sign-form__save-button_inactive' : ''}`}
              disabled={validationErrors.email || validationErrors.password || !inputValues.signupEmailInput || !inputValues.signupPasswordInput}
            >
              Зарегистрироваться
          </button>
          </fieldset>
        </form>
        <h3 className="sign__question">Уже зарегистрированы? <NavLink to="/signin" className="sign__link">Войти</NavLink></h3>
      </main>

    );
  }

  export default Register;
