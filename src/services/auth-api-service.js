import config from '../config';
// import AuthContext from '../contexts/AuthContext';


// TODO: WIP error handling -
    // how to get error message to the client?
    // how to NOT redirect to login page on anything other than status 201?

function handleErrors(response) {
    // if (!response.ok) {
    //     // response.json().then(e => Promise.reject(e))
    //     throw response
    // }
    if (response.status !== 201) {
        throw response
    }
    return response;
}

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.SERVER_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postUser(credentials) {
        return fetch(`${config.SERVER_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            // .then(res => {
            //     (!res.ok)
            //         ? res.json().then(e => Promise.reject(e))
            //         : res.json()
            // })
            .then(handleErrors)
            .then(response => console.log(response))
            .catch( error => {
                error.json().then(errorMessage => {
                    console.log(errorMessage)
                })
                Promise.reject(error.statusText)
            })
    }
}

export default AuthApiService