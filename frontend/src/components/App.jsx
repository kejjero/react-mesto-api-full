import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import {useEffect, useState} from "react";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {userContext} from "../utils/utils"
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth"
import InfoTooltip from "./InfoTooltip";

function App() {
    // стейт открытия попапа "Редактировать профиль"
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    // стейт открытия попапа "Добавить карточку"
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    // стейт открытия попапа "Добавить аватар"
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    // стейт открытия попапа "Удалить карточку"
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    // стейт открытия попапа InfoTooltip
    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false)
    // стейт статуса запросов для InfoTooltip
    const [isSuccess, setIsSuccess] = useState(false)
    // стейт селектора карточки для imagePopup
    const [selectedCard, setSelectedCard] = useState({})
    // стейт определения пользователя
    const [currentUser, setCurrentUser] = useState(userContext)
    // стейт карточек
    const [cards, setCards] = useState([])
    // стейт определения карточки для удалаения
    const [cardToRemove, setCardToRemove] = useState({})
    // стейт определения авторизации пользователя
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // стейт определения почты
    const [userEmail, setUserEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        checkToken()
    }, [])

    useEffect(() => {
        if(isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData)
                    setCards(cardsData)
                })
                .catch((err) => {
                    alert(err)
                })
        }
        }, [isLoggedIn])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleDeleteCardClick() {
        setIsDeleteCardPopupOpen(true)
    }

    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard)
    }

    // Закрытие всех попапов
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsDeleteCardPopupOpen(false)
        setIsOpenInfoTooltip(false)
        setSelectedCard({})
        setCardToRemove({})
    }

    // функция лайка карточки
    function handleCardLike(card) {
        // Ищем айди пользователя в массиве лайкнувших карточку
        const isLiked = card.likes.some(item => item._id === currentUser._id);
        if (isLiked) {
            api.deleteLike(card._id)
                .then((res) => {
                    setCards((cards) =>
                        cards.map((item) => (item._id === card._id ? res : item)))
                })
                .catch((err) => {
                    alert(err)
                })
        } else {
            api.addLike(card._id)
                .then((res) => {
                    setCards((cards) =>
                        // добавляем лайк исходя из нового массива лайкнувших карточку
                        cards.map((item) => (item._id === card._id ? res : item)))
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }

    // Открытие попапа с получением нужной для удаления карточки
    function confirmDeleteCard(card) {
        handleDeleteCardClick();
        setCardToRemove(card);
    }

    // запрос на удаление карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(
                setCards((cards) =>
                    // исключаем удаленную карточку из нового массива карточек
                    cards.filter((item) => (item._id !== card._id))
                ), () => {closeAllPopups()})
            .catch((err) => {
                alert(err)
            })
    }

    // запрос на апдейт профиля пользователя с новыми данными
    function handleUpdateUser({name, description}) {
        api.editProfile(name, description)
            .then((res) => setCurrentUser(res), () => {closeAllPopups()})
            .catch((err) => {
                alert(err)
            })
    }

    // запрос на апдейт аватара пользователя с новой картинкой
    function handleUpdateAvatar({avatar}) {
        api.editAvatar(avatar)
            .then((res) => setCurrentUser(res), () => {closeAllPopups()})
            .catch((err) => {
                alert(err)
            })
    }

    // запрос на добавление новой карточки
    function handleAddPlaceSubmit({namePlace, linkPlace}) {
        api.sendCard(namePlace, linkPlace)
            .then((newCard) => setCards([newCard, ...cards]), () => {closeAllPopups()})
            .catch((err) => {
                alert(err)
            })
    }

    // ----------------------------------------------------------------
    //  Регистрация и авторизация пользователя
    // ----------------------------------------------------------------

    // регистрация пользователя
    function handleRegister(email, password) {
        auth.register(password, email)
            .then((res) => {
                if (res.data) {
                    // если в респонсе возвращается объект с данными пользователя:
                    // уведомляем пользователя об удачной регистрации и меняем url на авторизацию
                    setIsSuccess(true)
                    setIsOpenInfoTooltip(true);
                    navigate('/sign-in')
                } else {
                    // иначе уведомляем об ошибке
                    setIsSuccess(false)
                    setIsOpenInfoTooltip(true)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsSuccess(false)
                setIsOpenInfoTooltip(true)
            })
    }

    // авторизация пользователя
    function handleLogin(email, password) {
        auth.login(password, email)
            .then(res => {
                // в респонсе проверяем наличие токена
                // добавляем токен в локал сторедж и меняем стейт авторизации
                // направляем пользователя на главную страницу
                if (res.token) {
                    localStorage.setItem('token', res.token)
                    setIsLoggedIn(true)
                    navigate('/')
                    setUserEmail(email)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsSuccess(false)
                setIsOpenInfoTooltip(true)
            })
    }

    // проверка наличия токена
    function checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            // если есть токен - отправляем его на авторизацию
            // в респонсе получаем данные пользователя
            auth.checkToken(token)
                .then(response => {
                    setUserEmail(response.data.email)
                    setIsLoggedIn(true)
                    navigate('/')
                })
                .catch(err => console.log(err))
        }
    }

    // удаление токена из локал сторедж
    function handleSignOut() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/sign-in')
        setUserEmail('')
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header isLoggedIn={isLoggedIn} userEmail={userEmail} handleSignOut={handleSignOut}/>
            <Routes>
                <Route exact path='/sign-up' element={<Register onRegister={handleRegister}/>}/>
                <Route exact path='/sign-in' element={<Login onLogin={handleLogin}/>}/>
                <Route path='/' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Main
                            openEditProfile={handleEditProfileClick}
                            openAddPlace={handleAddPlaceClick}
                            openAvatar={handleEditAvatarClick}
                            openDeleteCard={handleDeleteCardClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={confirmDeleteCard}
                            cards={cards}
                        />
                        <Footer/>
                    </ProtectedRoute>
                }
                />
            </Routes>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddPlaceSubmit}
            />
            <ConfirmDeletePopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                card={cardToRemove}
                onSubmitDelete={handleCardDelete}
            />
            <InfoTooltip
                isOpen={isOpenInfoTooltip}
                onClose={closeAllPopups}
                isSuccess={isSuccess}
            />
        </CurrentUserContext.Provider>
    )
}

export default App;
