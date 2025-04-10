import {
    ApolloClient,
    gql,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client"

const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com"

type HealthCheckResponse = {
    contentful: boolean
}

type GetMoviesResponse = {
    movies: {
        nodes: Movie[]
    }
}

type Movie = {
    datePublished: string
    duration: string
    genres: {
        id: string
        title: string
    }
    id: string
    posterUrl: string
    rating: string
    ratingValue: string
    summary: string
    title: string
}

type Genre = {
    id: string
    title: string | null
    movies: Array<Partial<Movie>>
}

type AuthTokenResponse = {
    token: string
}

type GetMoviesParams = {
    page?: number
    perPage?: number
    search?: string
    genre?: string
}

class MovieClient {
    token: string | null
    client: ApolloClient<NormalizedCacheObject> | null

    constructor() {
        this.token = null
        this.client = null
    }

    init = async () => {
        this.token = await this.getAuthToken()

        this.client = new ApolloClient({
            uri: `${BASE_URL}/graphql`,
            cache: new InMemoryCache(),
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        })
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

    getMovies = async ({
        page = 1,
        perPage = 10,
        search,
        genre,
    }: GetMoviesParams) => {
        const GET_MOVIES = gql`
            query GetMovies(
                $where: MovieFilterInput
                $pagination: PaginationInput
            ) {
                movies(where: $where, pagination: $pagination) {
                    nodes {
                        datePublished
                        duration
                        genres {
                            id
                            title
                        }
                        id
                        posterUrl
                        rating
                        ratingValue
                        summary
                        title
                    }
                }
            }
        `

        const results = await this.client?.query<GetMoviesResponse>({
            query: GET_MOVIES,
            variables: {
                where: {
                    search,
                    genre,
                },
                pagination: {
                    page,
                    perPage,
                },
            },
        })

        if (!results) {
            return []
        }

        const movies = results.data.movies.nodes
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
export type {Movie, Genre}
