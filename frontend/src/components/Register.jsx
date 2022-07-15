import '../blocks/auth/auth.css'
import {useState} from "react";
import {Link} from "react-router-dom";

function Register({onRegister}) {

    const [state, setState] = useState({
        password: '',
        email: ''
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = state;
        console.log(state)
        if (onRegister && email) {
            onRegister(email, password)
        }
    }

    return (
        <section className='auth'>
            <h1 className='auth__title'>Регистрация</h1>
            <form className='auth__form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='auth__input'
                    placeholder='Email'
                    name='email'
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className='auth__input'
                    placeholder='Пароль'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                />
                <button type="submit" className="auth__submit">Зарегистрироваться</button>
            </form>
            <Link to='/sign-in' className='auth__authorization'>Уже зарегистрированы? Войти</Link>
        </section>
    )
}

export default Register;