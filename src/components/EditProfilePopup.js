import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { regExp } from '../utils/data';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    {
      name: '',
      about: ''
    }
  );

  const userData = useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(userData.name);
    setDescription(userData.about);
    setValidationErrors(
      {
        name: '',
        about: ''
      }
    );
  }, [userData, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  function handleNameChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setName(value);

    if (value.length < 2) {
      errors.name = `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length} симв.`;
    }
    else if (!regExp.name.test(value)) {
      errors.name = 'Текст не должен содержать цифры и символы.';
    }
    else {
      errors.name = '';
    }

    setValidationErrors(errors);
  }

  function handleDescriptionChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setDescription(value);

    if (value.length < 2) {
      errors.about = `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length} симв.`;
    }
    else {
      errors.about = '';
    }

    setValidationErrors(errors);
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
          <input type="text" placeholder="Введите имя" value={name || ''} onChange={handleNameChange} onFocus={handleNameChange} autoComplete="off" className="popup__input popup__input_text_name" id="name-input" name="nameInput" minLength="2" maxLength="40" required pattern="[A-Za-zА-ЯЁа-яё -]{1,}" />
          <span className="popup__input-error popup__input-error_active" id="name-input-error">{validationErrors.name}</span>
        </label>
        <label className="popup__field">
          <input type="text" placeholder="Введите описание" value={description || ''} onChange={handleDescriptionChange} onFocus={handleDescriptionChange} autoComplete="off" className="popup__input popup__input_text_description" id="description-input" name="descriptionInput" minLength="2" maxLength="200" required />
          <span className="popup__input-error popup__input-error_active" id="description-input-error">{validationErrors.about}</span>
        </label>
        <button
          type="submit"
          className={`popup__save-button ${(validationErrors.name || validationErrors.about) || (name === userData.name && description === userData.about) ? 'popup__save-button_inactive' : ''}`}
          disabled={isLoading || (validationErrors.name || validationErrors.about) || (name === userData.name && description === userData.about)}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
