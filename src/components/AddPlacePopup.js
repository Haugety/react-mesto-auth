import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { regExp } from '../utils/data';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [inputValues, setInputValues] = React.useState('');
  const [validationErrors, setValidationErrors] = useState(
    {
      text: '',
      url: ''
    }
  );

  React.useEffect(() => {
    setInputValues({
      placeInput: '',
      linkInput: ''
    });
    setValidationErrors(
      {
        text: '',
        url: ''
      }
    );
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: inputValues.placeInput,
      link: inputValues.linkInput
    });
  }

  function handleErrors(value, type) {
    if (type === 'text' && value.length < 1) {
      return `Текст должен быть не короче 1 симв. Длина текста сейчас: ${value.length} симв.`;
    }

    if (type === 'url' && !regExp.url.test(value)) {
      return 'Некорректный url-адрес';
    }

    return '';
  }

  function handleInputChange(evt) {
    const { name, value, type } = evt.target;

    setValidationErrors({...validationErrors, [type]: handleErrors(value, type)});

    setInputValues({
      ...inputValues,
      [name]: value
    });
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
          <input type="text" placeholder="Название" value={inputValues.placeInput || ''} onChange={handleInputChange} onFocus={handleInputChange} autoComplete="off" className="popup__input popup__input_text_place" id="place-input" name="placeInput" minLength="1" maxLength="30" required />
          <span className="popup__input-error popup__input-error_active" id="place-input-error">{validationErrors.text}</span>
        </label>
        <label className="popup__field">
          <input type="url" placeholder="Ссылка на картинку" value={inputValues.linkInput || ''} onChange={handleInputChange} onFocus={handleInputChange} autoComplete="off" className="popup__input popup__input_text_link" id="link-input" name="linkInput" required />
          <span className="popup__input-error popup__input-error_active" id="link-input-error">{validationErrors.url}</span>
        </label>
        <button
          type="submit"
          className={`popup__save-button ${(validationErrors.text || validationErrors.url) || !(inputValues.placeInput && inputValues.linkInput) ? 'popup__save-button_inactive' : ''}`}
          disabled={isLoading || (validationErrors.text || validationErrors.url) || !(inputValues.placeInput && inputValues.linkInput)}
        >
          {isLoading ? 'Создание...' : 'Создать'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
