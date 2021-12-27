import React, {ReactElement, useEffect, useState} from 'react'
import {useRouteMatch} from 'react-router-dom'
import movieApi from '../Api/MovieApi';
import Details from '../Model/Details';
import './MovieDetails.css'
import instance from "../db/axios";
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import {AuthAction} from "../Model/AuthAction.enum";

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const DEFAULT_IMAGE_URL = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/space-movie-poster-design-template-18133e937d93002c68b4649ea234d75f_screen.jpg?ts=1573539500'

interface Props {
}

const API_USERS = '/people'

export default function MovieDetails({}: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    const [movieDetails, setMovieDetails] = useState<Details>(
        {id: 0, title: "", poster_path: "", vote_average: 0, overview: ""}
    )
    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const [isAlreadyPresent, setIsAlreadyPresent] = useState<Boolean>(false)
    const details_query = '3/movie/' + match.params.id + '?api_key=b82c172e7bf6660516881c6a1ed616dd'
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchMovieDetails() {
            const response = await movieApi.get(details_query)
            const result = response.data
            let details: Details = {
                id: result.id,
                title: result.title,
                poster_path: result.poster_path,
                vote_average: result.vote_average,
                overview: result.overview
            }
            setMovieDetails(result)
            setIsAlreadyPresent(!!authState.user?.favourites.find((movie) => movie.id == details.id))
        }

        fetchMovieDetails()
    }, [])

    async function addToFavourites() {
        let user = authState.user
        let isMoviePresent = user?.favourites.find((movie) => movie.id === movieDetails.id) != null

        if (!isMoviePresent) {
            user?.favourites.push(movieDetails)
            dispatch({type: AuthAction.UPDATE, user: user})
        }

        setIsAlreadyPresent(true)
    }

    if (movieDetails.title === 'Ten') {
        throw new Error('Bad Movie')
    }
    return (
        <div className={'movie-details-container'}>
            <div className={'movie-details-mini-container'}>
                <div className={'movie-img-container'}>
                    <img
                        src={movieDetails.poster_path != null ? IMAGE_URL + movieDetails.poster_path : DEFAULT_IMAGE_URL}
                        alt='movie_poster'/>
                </div>
                <div className={'movie-text-container'}>
                    <h2>{movieDetails.title}</h2>
                    <h3><span className={'movie-text'}>Rating:</span> {movieDetails.vote_average}</h3>
                    <p><span className={'movie-text'}>Overview:</span><br/>{movieDetails.overview}</p>
                    {authState.isLogged && !isAlreadyPresent ?
                        <button onClick={() => addToFavourites()}>Add to Favourites</button> : null}
                    {authState.isLogged && isAlreadyPresent ?
                        <h3 className={'favourite-text'}>You have added the movie to your favourites list</h3> : null}
                </div>
            </div>
        </div>
    );
}
