import React from 'react'

export const nullPlant = {
  name: '',
  family: '',
  watered: '',
  notes: '',
  image: ''
}

const PlantContext = React.createContext({
  plant: nullPlant,
  error: null,
  setError: () => {},
  addPlant: () => {},
  deletePlant: () => {},
})

export default PlantContext