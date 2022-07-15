import {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,props.isOpen]);

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({name, description})
    }

    return (
        <PopupWithForm
            name={"edit-profile"}
            title={"Редактировать профиль"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_person"
                id="person"
                name="person"
                onChange={handleChangeName}
                value={name || ''}
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
            />
            <span
                id="person-errors"
                className="popup__error popup__error_visible">
            </span>
            <input
                type="text"
                className="popup__input popup__input_about-me"
                id="about-me"
                name="aboutMe"
                onChange={handleChangeDescription}
                value={description || ''}
                placeholder="Деятельность"
                required
                minLength="2"
                maxLength="200"
            />
            <span
                id="about-me-errors"
                className="popup__error popup__error_visible">
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;