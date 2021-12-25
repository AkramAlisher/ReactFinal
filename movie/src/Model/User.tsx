import Details from "./Details";

export default interface User{
    id: number,
    username: string,
    password: string,
    favourites: Details[]
}