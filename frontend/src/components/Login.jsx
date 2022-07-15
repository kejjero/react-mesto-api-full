import {useState} from "react";

function Login({onLogin}) {

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
        if (onLogin && email) {
            onLogin(email, password)
        }
    }

    return(
        <section className='auth'>
            <h1 className='auth__title'>Вход</h1>
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
                <button type="submit" className="auth__submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;