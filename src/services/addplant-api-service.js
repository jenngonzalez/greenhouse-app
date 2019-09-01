import config from '../config'
import TokenService from '../services/token-service'

const AddPlantApiService = {
    postPlant(plant) {
        return fetch(`${config.SERVER_ENDPOINT}/plants`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(plant)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default AddPlantApiService