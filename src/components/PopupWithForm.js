import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, children }) {

  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <form className={`popup__container popup__container_${name}`} name={name} onSubmit={onSubmit} noValidate>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
