import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmitDelete(props.card);
    }

    return (
        <PopupWithForm
            name={"card-delete"}
            title={"Вы уверены?"}
            onSubmit={handleSubmit}
            buttonText={"Да"}
            isOpen={props.isOpen}
            onClose={props.onClose}
        />
    )
}

export default ConfirmDeletePopup;