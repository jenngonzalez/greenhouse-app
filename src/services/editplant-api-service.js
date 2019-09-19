import config from '../config'
import TokenService from '../services/token-service'

const EditPlantApiService = {
    patchPlant(username, plantId, editedPlant) {
        return fetch(`${config.SERVER_ENDPOINT}/plants/${username}/${plantId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(editedPlant)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default EditPlantApiService