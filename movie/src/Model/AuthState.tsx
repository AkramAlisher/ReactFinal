import User from "./User";

export default interface AuthState {
    isLogged: boolean,
    user?: User
}