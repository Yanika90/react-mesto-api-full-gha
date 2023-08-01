import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete, onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button photo__like-button ${
    isLiked && 'photo__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
    onConfirmDelete(true);
  }

  return (
    <div className="photo">
      {isOwn && (
        <button
          aria-label="Удалить"
          type="button"
          className="button photo__delete-button"
          onClick={handleDeleteClick}
        />
      )}
      <img src={card.link} alt={card.name} className="photo__image" onClick={handleClick} />
      <div className="photo__info-elements">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__like-elements">
          <button
            aria-label="Нравится"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="photo__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
