const BASE_URl = 'https://auth.nomoreparties.co'

// запрос на регистрацию
export const register = (password, email) => {
    return fetch(`${BASE_URl}/signup`,{
        method : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify ({password, email})
    })
        .then(checkResponse)
}

// запрос на авторизацию
export const login = (password, email) => {
    return fetch(`${BASE_URl}/signin`,{
        method : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify ({password, email})
    })
        .then(checkResponse)
}

// запрос на проверку токена
export const checkToken = (token) => {
    return fetch(`${BASE_URl}/users/me`,{
        method : "GET",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
}

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