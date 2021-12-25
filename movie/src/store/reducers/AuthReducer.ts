import AuthState from "../../Model/AuthState";
import {AuthAction} from "../../Model/AuthAction.enum";
import User from "../../Model/User";

const authReducer = (state: AuthState = {isLogged: false}, action: { type: AuthAction, user?: User }) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            if (action.user) {
                let authState: AuthState = {isLogged: true, user: action.user}
                return authState
            }
            return {isLogged: false}

        case AuthAction.LOGOUT:
            return {isLogged: false}


        case AuthAction.REGISTER:
            let authState: AuthState = {isLogged: true, user: action.user}
            return authState

        case AuthAction.UPDATE:
            return {isLogged: true, user: action.user}

        default:
            return state;
    }
}

export default authReducer