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
        pagination: Pagination
    }
}

type Pagination = {
    page: number
    perPage: number
    totalPages: number
}

type Movie = {
    datePublished: string
    duration: string
    genres: {
        id: string
        title: string
    }[]
    id: string
    posterUrl: string
    rating: string
    ratingValue: string
    summary: string
    title: string
}

type GetGenresResponse = {
    genres: {
        nodes: Genre[]
    }
}

type Genre = {
    id: string
    title: string
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
                    pagination {
                        page
                        perPage
                        totalPages
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
            return {
                movies: [],
                pagination: {
                    page,
                    perPage,
                    totalPages: 0,
                },
            }
        }

        return {
            movies: results.data.movies.nodes,
            pagination: results.data.movies.pagination,
        }
    }

    getGenres = async () => {
        const GET_GENRES = gql`
            query GetGenres {
                genres {
                    nodes {
                        id
                        title
                    }
                }
            }
        `

        const results = await this.client?.query<GetGenresResponse>({
            query: GET_GENRES,
        })

        if (!results) {
            return {genres: []}
        }

        return {genres: results?.data.genres.nodes}
    }

    getTitles = async () => {
        const response = await fetch(`${BASE_URL}/movies/titles`, {
            headers: {Authorization: `Bearer ${this.token}`},
        })

        const titles = await response.json()
        return titles
    }
}

const movieClient = new MovieClient()
await movieClient.init()

export default MovieClient
export {movieClient}
export type {Movie, Genre}
