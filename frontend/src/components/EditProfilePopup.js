import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleCangeName(e) {
    setName(e.target.value);
  }

  function handleCangeAbout(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popupProfile"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        name="name"
        id="name"
        minLength="2"
        maxLength="40"
        required
        className="popup__input popup__input_type_name"
        onChange={handleCangeName}
        value={name || ''}
      />
      <span className="popup__input-error name-error" />
      <input
        type="text"
        placeholder="О себе"
        name="about"
        id="about-yourself"
        minLength="2"
        maxLength="200"
        required
        className="popup__input popup__input_type_about-yourself"
        onChange={handleCangeAbout}
        value={description || ''}
      />
      <span className="popup__input-error about-yourself-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
