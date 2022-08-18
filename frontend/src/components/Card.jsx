import React from "react";

function Card({card, currentUser, handleCardClick, onCardLike, onCardDelete}) {

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_active' : 'element__trash_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(userId => userId === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : 'element__like_hidden'}`;

    function handleClick() {
        handleCardClick({name: card.name, image: card.link})
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <article
            className="element"
        >
            <div className="element__contain">
                <button
                    className={cardDeleteButtonClassName}
                    type="button"
                    onClick={handleDeleteClick}
                >
                </button>
                <img
                    className="element__image"
                    onClick={handleClick}
                    alt={card.title}
                    src={card.link}
                />
            </div>
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-wrapper">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
                    </button>
                    <span className="element__like-value">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;
