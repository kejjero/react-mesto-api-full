import PopupWithForm from "./PopupWithForm";
import {useRef, useEffect} from "react";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        props.onClose();
    }

    return (
        <PopupWithForm
            name={"edit-avatar"}
            title={"Обновить аватар"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__input popup__input_link-avatar"
                name="avatar"
                id="edit-avatar"
                placeholder="Ссылка на картинку"
                required
                ref={avatarRef}
            />
            <span
                id="edit-avatar-errors"
                className="popup__error popup__error_visible"
            >
            </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;