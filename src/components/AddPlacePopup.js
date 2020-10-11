import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { regExp } from '../utils/data';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    {
      name: '',
      link: ''
    }
  );

  React.useEffect(() => {
    setLink('');
    setName('');
    setValidationErrors(
      {
        name: '',
        link: ''
      }
    );
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  function handleCardName(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setName(value);

    if (value.length < 1) {
      errors.name = `Текст должен быть не короче 1 симв. Длина текста сейчас: ${value.length} симв.`;
    }
    else {
      errors.name = '';
    }

    setValidationErrors(errors);
  }

  function handleCardLink(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setLink(value);

    if (!regExp.url.test(value)) {
      errors.link = 'Введите URL.';
    }
    else {
      errors.link = '';
    }

    setValidationErrors(errors);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__field">
          <input type="text" placeholder="Название" value={name || ''} onChange={handleCardName} onFocus={handleCardName} autoComplete="off" className="popup__input popup__input_text_place" id="place-input" name="placeInput" minLength="1" maxLength="30" required />
          <span className="popup__input-error popup__input-error_active" id="place-input-error">{validationErrors.name}</span>
        </label>
        <label className="popup__field">
          <input type="url" placeholder="Ссылка на картинку" value={link || ''} onChange={handleCardLink} onFocus={handleCardLink} autoComplete="off" className="popup__input popup__input_text_link" id="link-input" name="linkInput" required />
          <span className="popup__input-error popup__input-error_active" id="link-input-error">{validationErrors.link}</span>
        </label>
        <button
          type="submit"
          className={`popup__save-button ${(validationErrors.name || validationErrors.link) || !(name && link) ? 'popup__save-button_inactive' : ''}`}
          disabled={isLoading || (validationErrors.name || validationErrors.link) || !(name && link)}
        >
          {isLoading ? 'Создание...' : 'Создать'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
