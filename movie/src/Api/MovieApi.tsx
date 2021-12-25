import axios from 'axios'

const movieApi = axios.create({
    baseURL: 'https://api.themoviedb.org'
})

export default movieApi