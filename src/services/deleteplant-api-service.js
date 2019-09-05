import config from '../config'
import TokenService from '../services/token-service'

const DeletePlantApiService = {
    deletePlant(username, plant) {
        return fetch(`${config.SERVER_ENDPOINT}/plants/${username}/${plant}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
    }
}

export default DeletePlantApiService