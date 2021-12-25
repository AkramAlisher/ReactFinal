import React, {ReactElement, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import User from '../Model/User';
import css from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import instance from "../db/axios";
import {AuthAction} from "../Model/AuthAction.enum";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface Props {
}

const API_USERS = '/people'

export default function Register({}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState<User[]>([])

    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUsers() {
            const result = await instance.get(API_USERS)
            setUsers([...result.data])
        }

        fetchUsers()
    }, [])

    async function createUser() {
        const isPresent = !!users.find((u) => u.username === username)
        if (isPresent) {
            // TODO handle case when the user is already registered
            return
        } else {
            let user: User = {id: users.length, username: username, password: password, favourites: []}
            const result = await instance.post(API_USERS, user)
            dispatch({type: AuthAction.REGISTER, user: user})
        }
    }

    function validate() {
        if (username.length == 0 || password.length == 0 && email.length == 0) {
            alert("There are some missing fields.")
            return
        }
        createUser()
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Registration</h1>
                <input type='text' placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => validate()}>Register</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    )
}