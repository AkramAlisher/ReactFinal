import React, {useContext, useReducer} from 'react'
import {Redirect} from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import './Account.css'
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import {AuthAction} from "../Model/AuthAction.enum";
import css from './Register.module.css'

interface Props {
}

export default function Account({}: Props) {
    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const dispatch = useDispatch()

    function logout() {
        dispatch({type: AuthAction.LOGOUT})
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Account Details</h1>
                <h2><span>Current state:</span> {authState.isLogged && 'Authorized'}</h2>
                <h2><span>Username:</span> {authState.user?.username}</h2>
                <h2><span>Password:</span> {authState.user?.password}</h2>
                <button onClick={logout}>Logout</button>
                {!authState.isLogged ? <Redirect to='/'/> : null}
            </div>
        </div>
    )
}
