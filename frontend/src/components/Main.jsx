import Card from "./Card"
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from "react";

function Main(props) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-wrapper">
                    <button
                        type="button"
                        className="profile__avatar-button"
                        onClick={props.openAvatar}
                    />
                    <div
                        className="profile__avatar"
                        style={{backgroundImage: `url(${currentUser.avatar})`}}
                    >
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__person">{currentUser.name}</h1>
                    <p className="profile__about-me">{currentUser.about}</p>
                    <button
                        type="button"
                        className="profile__edit-button"
                        aria-label="Редактировать профиль"
                        onClick={props.openEditProfile}
                        title={'Редактировать профиль'}
                        name={'edit-profile'}
                    />
                </div>
                <button
                    onClick={props.openAddPlace}
                    className="profile__add-button"
                    type="button"
                />
            </section>
            <section className="elements">
                {props.cards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            currentUser={currentUser}
                            openDeleteCard={props.openDeleteCard}
                            handleCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    )
                })
                }
            </section>
        </main>
    )
}

export default Main;