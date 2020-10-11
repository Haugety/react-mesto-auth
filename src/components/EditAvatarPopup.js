import React, { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { regExp } from '../utils/data';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatar = useRef('');
  const [validationErrors, setValidationErrors] = useState('');

  React.useEffect(() => {
    avatar.current.value = '';
    setValidationErrors('');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  function handleChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    if (!regExp.url.test(value)) {
      errors = 'Введите URL.';
    }
    else {
      errors = '';
    }

    setValidationErrors(errors);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__field">
          <input ref={avatar} onChange={handleChange} onFocus={handleChange} type="url" placeholder="Ссылка на картинку" autoComplete="off" className="popup__input popup__input_text_link" id="link-avatar-input" name="avatarInput" required />
          <span className="popup__input-error popup__input-error_active" id="link-avatar-input-error">{validationErrors}</span>
        </label>
        <button
          type="submit"
          className={`popup__save-button ${(validationErrors || !(avatar.current.value)) ? 'popup__save-button_inactive' : ''}`}
          disabled={isLoading || validationErrors || !(avatar.current.value)}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
