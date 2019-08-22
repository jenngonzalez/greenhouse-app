import React from 'react'

const AuthContext = React.createContext({
    loggedIn: () => {},
    loggedOut: () => {}
})

export default AuthContext