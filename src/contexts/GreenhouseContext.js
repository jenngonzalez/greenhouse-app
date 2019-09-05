import React from 'react';

const GreenhouseContext = React.createContext({
    plants: [],
    addPlant: () => {},
    deletePlant: () => {},
    updatePlant: () => {},
    addPlants: () => {}
})

export default GreenhouseContext

export class GreenhouseProvider extends React.Component { 
    state = {
        plants: []
    }

    addPlant = plant => {
        this.setState({plants: [...this.state.plants, plant]})
    }

    deletePlant = plant => {
        this.setState({plants: [...this.state.plants.filter(p => {
            return p.id !== plant.id 
        })]})
    }


    // deletePlant = plant => {
    //     const newPlants = this.state.plants.filter(p =>
    //     p.id !== plant.id
    //     )
    //     this.setState({
    //     plants: newPlants
    //     })
    // }

    updatePlant = plant => {
        this.setState({plants: [...this.state.plants.map(p => {
            return p.id === plant.id ? {...p, ...plant} : plant
        })]})
    }

    addPlants = plants => {
        this.setState({ plants })
    }

    render() {
        const value = {
            plants: this.state.plants,
            addPlant: this.addPlant,
            removePlant: this.removePlant,
            updatePlant: this.updatePlant,
            addPlants: this.addPlants
        }

        return (
            <GreenhouseContext.Provider value={value}>
                {this.props.children}
            </GreenhouseContext.Provider>
        )
    }
}