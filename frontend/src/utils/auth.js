export const BASE_URL = 'https://api.kejero.nomoredomains.xyz';

export const checkResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject('Error' + res.status)
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

export const authorize = ({email, password}) => {
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

export const getContent = (token) => {
    console.log(token, 'tokencheck')
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