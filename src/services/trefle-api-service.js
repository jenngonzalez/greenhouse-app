import config from '../config'


const TrefleApiService= {
    getTreflePlants(searchTerm) {
        return fetch(`${config.SERVER_ENDPOINT}/trefle?q=${searchTerm}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default TrefleApiService