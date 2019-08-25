import config from '../config'

const AddPlantApiService = {
    postPlant(data) {
        return fetch(`${config.SERVER_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
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
            .then(res => {
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    }
}

export default AddPlantApiService