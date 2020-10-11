import React from 'react';
import { regExp } from '../utils/data';
import { NavLink } from 'react-router-dom';

function Register({ onSubmit }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState(
    {
      email: '',
      password: ''
    }
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      email: email,
      password: password
    });
  }

  function handleEmailChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setEmail(value);

    if (!regExp.email.test(value)) {
      errors.email = 'Некорректный Email';
    }
    else {
      errors.email = '';
    }

    setValidationErrors(errors);
  }

  function handlePasswordChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setPassword(value);

    if (value.includes(' ')) {
      errors.password = 'Пароль не должен содержать пробелы';
    }
    else if (value.length < 6) {
      errors.password = `Пароль должен быть не короче 6 симв. Длина текста сейчас: ${value.length} симв.`;
    }
    else {
      errors.password = '';
    }

    setValidationErrors(errors);
  }

    return (

      <main className="sign">
        <h1 className="sign__title">Регистрация</h1>
        <form className="sign-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="sign-form__set">
            <label className="sign-form__field">
              <input type="email" placeholder="Email" autoComplete="on" className="sign-form__input" onChange={handleEmailChange} onFocus={handleEmailChange} id="signup-email-input" name="signupEmailInput" maxLength="40" required />
              <span className="sign-form__input-error sign-form__input-error_active" id="name-input-error">{validationErrors.email}</span>
            </label>
            <label className="sign-form__field">
              <input type="password" placeholder="Пароль" autoComplete="off" className="sign-form__input" onChange={handlePasswordChange} onFocus={handlePasswordChange} id="signup-password-input" name="signupPasswordInput" minLength="6" maxLength="20" required />
              <span className="sign-form__input-error sign-form__input-error_active" id="name-input-error">{validationErrors.password}</span>
            </label>
            <button
              type="submit"
              className={`sign-form__save-button ${(validationErrors.email || validationErrors.password || !email || !password) ? 'sign-form__save-button_inactive' : ''}`}
              disabled={validationErrors.email || validationErrors.password || !email || !password}
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
