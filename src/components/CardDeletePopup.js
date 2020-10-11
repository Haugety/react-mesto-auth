import React from 'react';
import PopupWithForm from './PopupWithForm';

function CardDeletePopup({ isOpen, onClose, onConfirm, isLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="trash"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <button type="submit" className="popup__save-button" disabled={isLoading}>{isLoading ? 'Удаление...' : 'Да'}</button>
    </PopupWithForm>
  );
}

export default CardDeletePopup;
