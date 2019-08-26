import config from '../config'


const GetPlantsApiService = {
    getPlants(username) {
        return fetch(`${config.SERVER_ENDPOINT}/plants/${username}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default GetPlantsApiService