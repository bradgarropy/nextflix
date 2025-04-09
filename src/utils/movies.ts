const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com"

type HealthCheckResponse = {
    contentful: boolean
}

type Movie = {
    id: string
    title: string
    posterUrl: string
    summary: string
    duration: string
    directors: string[]
    mainActors: string[]
    genres: Omit<Genre, "movies">[]
    datePublished: string
    rating: string
    ratingValue: number
    bestRating: number
    worstRating: number
    writers: string[]
}

type Genre = {
    id: string
    title: string | null
    movies: Array<Partial<Movie>>
}

type AuthTokenResponse = {
    token: string
}

class MovieClient {
    token: string | null

    constructor() {
        this.token = null
    }

    init = async () => {
        const token = await this.getAuthToken()
        this.token = token
    }

    getAuthToken = async () => {
        const response = await fetch(`${BASE_URL}/auth/token`)
        const {token}: AuthTokenResponse = await response.json()

        return token
    }

    healthCheck = async () => {
        const response = await fetch(`${BASE_URL}/healthcheck`)
        const {contentful}: HealthCheckResponse = await response.json()

        return contentful
    }

    getMoviesByGenre = async () => {
        const response = await fetch(`${BASE_URL}/genres/movies`, {
            headers: {Authorization: `Bearer ${this.token}`},
        })

        const genres = await response.json()
        return genres
    }

    getMovie = async (id: Movie["id"]) => {
        const response = await fetch(`${BASE_URL}/movies/${id}`, {
            headers: {Authorization: `Bearer ${this.token}`},
        })

        const movie = await response.json()
        return movie
    }

    getMovies = async () => {
        const response = await fetch(`${BASE_URL}/movies`, {
            headers: {Authorization: `Bearer ${this.token}`},
        })

        const movies = await response.json()
        return movies
    }

    getTitles = async () => {
        const response = await fetch(`${BASE_URL}/movies/titles`, {
            headers: {Authorization: `Bearer ${this.token}`},
        })

        const titles = await response.json()
        return titles
    }

    getGenre = async (id: Genre["id"]) => {
        const response = await fetch(`${BASE_URL}/movies/genres/${id}`, {
            headers: {Authorization: `Bearer ${this.token}`},
        })

        const genre = await response.json()
        return genre
    }
}

const movieClient = new MovieClient()
await movieClient.init()

export default MovieClient
export {movieClient}
