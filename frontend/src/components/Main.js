import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirmDelete
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="page">
      <main className="content">
        <section className="profile">
          <div
            onClick={() => {
              onEditAvatar(true);
            }}
            className="profile__avatar-edit"
          >
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={() => {
                onEditProfile(true);
              }}
              aria-label="Редактировать профиль"
              type="button"
              className="button profile__edit-button"
            />
            <p className="profile__about-yourself">{currentUser.about}</p>
          </div>
          <button
            onClick={() => {
              onAddPlace(true);
            }}
            aria-label="Добавить"
            type="button"
            className="button profile__add-button"
          />
        </section>
        <section className="photos">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onConfirmDelete={onConfirmDelete}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
