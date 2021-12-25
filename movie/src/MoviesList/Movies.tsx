import React, {Fragment, ReactElement, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import movieApi from '../Api/MovieApi'
import Movie from '../Model/Movie'
import './Movies.css'

const api_key = 'b82c172e7bf6660516881c6a1ed616dd'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const DEFAULT_IMAGE_URL = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/space-movie-poster-design-template-18133e937d93002c68b4649ea234d75f_screen.jpg?ts=1573539500'

function Movies(): ReactElement {
    console.log("Movies")
    const [movies, setMovies] = useState<Movie[]>([])
    const [query, setQuery] = useState('')
    const movies_query = '/3/discover/movie?api_key=' + api_key
    const find_query = '/3/search/movie?api_key=' + api_key + '&language=en-US&query=' + query

    useEffect(() => {
        fetchMovies()
    }, [])

    async function fetchMovies() {
        const response = await movieApi.get(movies_query)
        const movies = response.data.results
        setMovies(movies)
    }

    useEffect(() => {
        async function find() {
            const response = await movieApi.get(find_query)
            const movies = response.data.results
            setMovies(movies)
        }

        if (query.length > 0) {
            find()
        } else {
            fetchMovies()
        }

    }, [query])

    function getVoteAverageClass(average: number): string {
        if (average > 7)
            return 'green-title'
        if (average >= 5)
            return 'yellow-title'
        return 'red-title'
    }

    return (
        <div className='movies-page-container'>
            <div className="search-container">
                <input type='text' placeholder='Find Movie...' onChange={(e) => setQuery(e.target.value)}/>
            </div>
            <div className={'movies-container'}>
                {movies && movies.map(({id, title, poster_path, vote_average}) => (
                    <Fragment key={id}>
                        <Link to={'/' + id} className={'movie-item'}>
                            <div className={'movie-item-image-container'}>
                                <img className={'movie-item-image'}
                                     src={poster_path != null ? IMAGE_URL + poster_path : DEFAULT_IMAGE_URL}/>
                            </div>
                            <div className={'movie-item-title-container'}>
                                <h3 className={'movie-item-title'}>{title}</h3>
                                <h4 className={getVoteAverageClass(vote_average)}>{vote_average}</h4>
                            </div>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default Movies