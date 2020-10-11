import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const userData = useContext(CurrentUserContext);

  const isOwn = card.owner._id === userData._id;
  const cardDeleteButtonClassName = (
    `trash-button ${isOwn ? 'trash-button_active' : 'trash-button_inactive'}`
  );

  const isLiked = card.likes.some(i => i._id === userData._id);
  const cardLikeButtonClassName = (
    `like-button ${isLiked ? 'like-button_active' : 'like-button_inactive'}`
  );

  function handleClick() {
    onCardClick({ link: card.link, name: card.name });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleRemoveClick() {
    onCardDelete(card);
  }

  return (

    <li className="cards__element">
      <img alt={card.name} className="cards__image" src={card.link} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleRemoveClick}></button>
      <div className="cards__row">
        <h3 className="cards__title">{card.name}</h3>
        <div className="cards__column">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="like-button__amount">{card.likes.length}</span>
        </div>
      </div>
    </li>

  );
}

export default Card;
