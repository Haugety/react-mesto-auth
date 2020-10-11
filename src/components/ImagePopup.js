import React from 'react';

function ImagePopup({ isOpen, selectedCardLink, selectedCardName, onClose }) {
  return (

    <section className={`popup ${isOpen && "popup_opened"}`}>
      <figure className="popup__image-container">
        <img alt={ selectedCardName } src={ selectedCardLink } className="popup__image" />
        <figcaption className="popup__caption">{ selectedCardName }</figcaption>
        <button type="button" className="popup__close-button" onClick={ onClose }></button>
      </figure>
    </section>

  );
}

export default ImagePopup;
