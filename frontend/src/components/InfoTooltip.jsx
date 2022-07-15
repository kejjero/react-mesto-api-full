import PopupWithForm from "./PopupWithForm";
import iconFail from "../images/infoTooltip__fail.svg"
import iconSuccess from "../images/infoTooltip__success.svg"

function InfoTooltip(props) {
    const statusTooltip = props.isSuccess ?
        {
            icon: iconSuccess,
            alt: 'Иконка галочки',
            message: 'Вы успешно зарегистрировались!',
        }
     :
        {
            icon: iconFail,
            alt: 'Иконка ошибки',
            message: 'Что-то пошло не так! Попробуйте ещё раз.'
        }

    return (
        <PopupWithForm
            name={"info-tooltip"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            isInfoTooltip={true}
        >
            <img
                className="popup__icon-tooltip"
                src={statusTooltip.icon}
                alt={statusTooltip.alt}
            />
            <p className="popup__message-tooltip">{statusTooltip.message}</p>
        </PopupWithForm>
    )
}

export default InfoTooltip;