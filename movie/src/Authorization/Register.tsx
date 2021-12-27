import React, {ReactElement, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import User from '../Model/User';
import css from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import {AuthAction} from "../Model/AuthAction.enum";
import {Stack, TextField} from "@mui/material";
import usersArray from '../db/users.json';
import { useHistory } from "react-router-dom";


interface Props {
}

export default function Register({}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<User[]>([])
    let history = useHistory();

    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const dispatch = useDispatch()

    useEffect(() => {
        setUsers([...usersArray.people])
    }, [])

    async function createUser() {
        const isPresent = !!users.find((u) => u.username === username)
        if (isPresent) {
            history.push('/login')
            return
        } else {
            let user: User = {id: users.length, username: username, password: password, favourites: []}
            dispatch({type: AuthAction.REGISTER, user: user})
        }
    }

    function validate() {
        if (username.length === 0 || password.length === 0) {
            alert("There are some missing fields.")
            return
        }
        createUser()
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Registration</h1>
                <Stack sx={{ width: '60%' }}>
                    <TextField type='text' placeholder='Enter the username' onChange={(e) => setUsername(e.target.value)}/>
                </Stack>
                <Stack sx={{ width: '60%', mt: 3 }}>
                    <TextField type='password' placeholder='Enter the password.' onChange={(e) => setPassword(e.target.value)}/>
                </Stack>
                <button onClick={() => validate()}>Register</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    )
}
