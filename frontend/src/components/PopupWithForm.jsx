import React from "react";

function PopupWithForm({isOpen, name, title, buttonText, children, onClose, onSubmit, isInfoTooltip}) {

    const buttonName = `${buttonText ? buttonText : 'Сохранить'}`;

    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={onClose}
                >
                </button>
                {isInfoTooltip ? <></> : <h2 className="popup__title">{title}</h2>}
                <form
                    className={"popup__form"}
                    method={"post"}
                    name={name}
                    onSubmit={onSubmit}
                >
                    {children}
                    {isInfoTooltip ? <></>:
                        <button
                        type="submit"
                        className={`popup__button popup__button__save popup_${name}`}
                        value={buttonName}
                        >
                        {buttonName}
                    </button>}
                </form>
            </div>
            <div className="popup__overlay" onClick={onClose}>
            </div>
        </div>
    )
}

export default PopupWithForm;