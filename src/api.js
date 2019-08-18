export function getPlants(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    })
  }
  
export function getTreflePlants(apiUrl, authToken, searchTerm) {
    fetch(`${apiUrl}?token=${authToken}&q=${searchTerm}`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
    }).then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
}