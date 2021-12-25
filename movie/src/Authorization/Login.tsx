import React, {ReactElement, useCallback, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import css from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import User from "../Model/User";
import instance from "../db/axios";
import {AuthAction} from "../Model/AuthAction.enum";

interface Props {

}

const API_USERS = '/people'

export default function Login({}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<User[]>([])
    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const dispatch = useDispatch()

    const loginOnChange = useCallback(e=>{
        setUsername(e.target.value)
    },[])
    const passwordOnChange = useCallback(e=>{
        setPassword(e.target.value)
    },[])


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
                <h1>Login</h1>
                <input type='text' placeholder='Username...' onChange={loginOnChange}/>
                <input type='password' placeholder='Password...' onChange={passwordOnChange}/>
                <button onClick={authenticateUser}>Login</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    );
}
