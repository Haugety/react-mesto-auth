import React from 'react';
import { NavLink } from 'react-router-dom';

function Login({ onSubmit }) {

  const [inputValues, setInputValues] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    if (inputValues.signinEmailInput && inputValues.signinPasswordInput) {
      onSubmit({
        email: inputValues.signinEmailInput,
        password: inputValues.signinPasswordInput
      })
      .then((err) => {
        if (err) {
          setValidationErrors('Неправильно введен логин или пароль');
        }
      });
    }
  }

  function handleInputChange(evt) {
    const { name, value } = evt.target;

    setValidationErrors('');
    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

  return (

    <main className="sign">
      <h1 className="sign__title">Вход</h1>
      <form className="sign-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="sign-form__set">
          <label className="sign-form__field">
            <input type="email" placeholder="Email" autoComplete="on" className="sign-form__input" onChange={handleInputChange} onFocus={handleInputChange} id="signin-email-input" name="signinEmailInput" minLength="2" maxLength="40" required />
            <span className="sign-form__input-error sign-form__input-error_active" id="name-input-error">{validationErrors}</span>
          </label>
          <label className="sign-form__field">
            <input type="password" placeholder="Пароль" autoComplete="off" className="sign-form__input" onChange={handleInputChange} onFocus={handleInputChange} id="signin-password-input" name="signinPasswordInput" minLength="6" maxLength="20" required />
            <span className="sign-form__input-error sign-form__input-error_active" id="name-input-error">{validationErrors}</span>
          </label>
          <button
            type="submit"
            className="sign-form__save-button"
          >
            Войти
          </button>
        </fieldset>
      </form>
      <h3 className="sign__question">Еще не зарегистрированы? <NavLink to="/signup" className="sign__link">Регистрация</NavLink></h3>
    </main>

  );
}

export default Login;
