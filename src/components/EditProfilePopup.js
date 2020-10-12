import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { regExp } from '../utils/data';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const [inputValues, setInputValues] = React.useState('');
  const [validationErrors, setValidationErrors] = useState(
    {
      nameInput: '',
      descriptionInput: ''
    }
  );

  const userData = useContext(CurrentUserContext);

  React.useEffect(() => {
    setInputValues({ nameInput: userData.name, descriptionInput: userData.about });
    setValidationErrors(
      {
        nameInput: '',
        descriptionInput: ''
      }
    );
  }, [userData, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: inputValues.nameInput,
      about: inputValues.descriptionInput
    });
  }

  function handleErrors(value, inputName) {
    if (value.length < 2) {
      return `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length} симв.`;
    }
    else if (inputName === 'nameInput' && !regExp.name.test(value)) {
      return 'Текст не должен содержать цифры и символы.';
    }

    return '';
  }

  function handleInputChange(evt) {
    const { name, value } = evt.target;

    setValidationErrors({...validationErrors, [name]: handleErrors(value, name)});

    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__field">
          <input type="text" placeholder="Введите имя" value={inputValues.nameInput || ''} onChange={handleInputChange} onFocus={handleInputChange} autoComplete="off" className="popup__input popup__input_text_name" id="name-input" name="nameInput" minLength="2" maxLength="40" required pattern="[A-Za-zА-ЯЁа-яё -]{1,}" />
          <span className="popup__input-error popup__input-error_active" id="name-input-error">{validationErrors.nameInput}</span>
        </label>
        <label className="popup__field">
          <input type="text" placeholder="Введите описание" value={inputValues.descriptionInput || ''} onChange={handleInputChange} onFocus={handleInputChange} autoComplete="off" className="popup__input popup__input_text_description" id="description-input" name="descriptionInput" minLength="2" maxLength="200" required />
          <span className="popup__input-error popup__input-error_active" id="description-input-error">{validationErrors.descriptionInput}</span>
        </label>
        <button
          type="submit"
          className={`popup__save-button ${(validationErrors.nameInput || validationErrors.descriptionInput) || (inputValues.nameInput === userData.name && inputValues.descriptionInput === userData.about) ? 'popup__save-button_inactive' : ''}`}
          disabled={isLoading || (validationErrors.nameInput || validationErrors.descriptionInput) || (inputValues.nameInput === userData.name && inputValues.descriptionInput === userData.about)}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
