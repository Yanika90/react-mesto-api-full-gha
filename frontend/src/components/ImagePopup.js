import React from 'react';

function ImagePopup({ name, card, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__card-container">
        <button
          aria-label="Закрыть"
          type="button"
          className="button popup__close-button"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
