import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmCardDeletePopup({ card, isOpen, onClose, onCardDelete, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="popupDeleteCard"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmCardDeletePopup;
