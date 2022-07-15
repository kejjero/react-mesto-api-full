import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

function AddPlacePopup(props) {
    const [namePlace, setNamePlace] = useState('');
    const [linkPlace, setLinkPlace] = useState('');

    useEffect(() => {
        setNamePlace('')
        setLinkPlace('')
    }, [props.isOpen])

    function handleNamePlace(evt) {
        setNamePlace(evt.target.value);
    }

    function handleLinkPlace(evt) {
        setLinkPlace(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddCard({namePlace, linkPlace})
    }

    return (
        <PopupWithForm
            name={"add-place"}
            title={"Добавить место"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_name-place"
                name="name"
                id="name-place"
                value={namePlace}
                onChange={handleNamePlace}
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
            />
            <span
                id="name-place-errors"
                className="popup__error popup__error_visible">
            </span>
            <input
                type="url"
                className="popup__input popup__input_link-place"
                name="link"
                id="link-place"
                value={linkPlace}
                onChange={handleLinkPlace}
                placeholder="Ссылка на картинку"
                required
            />
            <span
                id="link-place-errors"
                className="popup__error popup__error_visible">
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;