import React from 'react'
import AuthState from '../Model/AuthState'

const AuthContext = React.createContext<AuthState>({isLogged: false})

export default AuthContext