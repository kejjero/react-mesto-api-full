const BASE_URL = 'https://api.kejero.nomoredomains.xyz';

// проверка наличия респонса и преобразование его в джейсон
const checkResponse = (response) => {
    try {
        if (response.ok) {
            return response.json()
        }
    }  catch (error) {
        return alert(error)
    }
}

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);
}

export const login = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
        .then(res => {
            console.log('res.roken', res.token)
            localStorage.setItem('jwt', res.token)
            return res
        })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then(checkResponse);
}