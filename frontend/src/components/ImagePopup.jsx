import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div
            onClick={onClose}
            className={`popup popup_type_image ${card.hasOwnProperty('name') && "popup_opened"}`}
        >
            <div className="popup__image-container">
                <button type="button" className="popup__close-button popup__close-button_zoom-image"
                        aria-label="Закрыть">
                </button>
                <img src={card.image} alt={card.name}
                     className="popup__image"/>
                <p className="popup__subtitle">{card.name}</p>
            </div>
            <div className="popup__overlay">
            </div>
        </div>
    )
}

export default ImagePopup;