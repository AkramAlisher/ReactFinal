import React, {ReactElement, useCallback, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import css from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import User from "../Model/User";
import instance from "../db/axios";
import {AuthAction} from "../Model/AuthAction.enum";
import {Button, Stack, TextField} from "@mui/material";

interface Props {

}

const API_USERS = '/people'

export default function Login({}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<User[]>([])
    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const dispatch = useDispatch()

    const loginOnChange = useCallback(e => {
        setUsername(e.target.value)
    }, [])
    const passwordOnChange = useCallback(e => {
        setPassword(e.target.value)
    }, [])


    useEffect(() => {
        async function fetchUsers() {
            const result = await instance.get(API_USERS)
            setUsers([...result.data])
        }

        fetchUsers()
    }, [])

    function authenticateUser() {
        const isPresent = users.find((user) => user.username === username && user.password === password) != null
        const user = users.find((user) => user.username === username && user.password === password)
        console.log("clicked")
        if (isPresent) {
            dispatch({type: AuthAction.LOGIN, user: user})
        } else {
            dispatch({type: AuthAction.LOGIN})
        }
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Authorization</h1>
                <Stack sx={{ width: '60%' }}>
                    <TextField type='text' placeholder='Enter the username' onChange={loginOnChange}/>
                </Stack>
                <Stack sx={{ mt: 3, width: '60%' }}>
                    <TextField type='password' placeholder='Enter the password' onChange={passwordOnChange}/>
                </Stack>
                <button onClick={authenticateUser}>Login</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    );
}
