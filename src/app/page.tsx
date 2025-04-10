import Genre from "~/components/Genre"
import Movie from "~/components/Movie"
import Pagination from "~/components/Pagination"
import Search from "~/components/Search"
import {Separator} from "~/components/ui/separator"

import {movieClient} from "~/utils/movies"

type HomeProps = {
    searchParams: Promise<{
        search?: string
        page?: number
        perPage?: number
    }>
}

const Home = async (props: HomeProps) => {
    const searchParams = await props.searchParams
    const search = searchParams.search ?? ""
    const page = Number(searchParams.page) || undefined
    const perPage = Number(searchParams.perPage) || undefined

    const {movies, pagination} = await movieClient.getMovies({
        search,
        page,
        perPage,
    })

    const {genres} = await movieClient.getGenres()

    return (
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 min-h-screen">
            <header className="bg-slate-900 h-16 m-2 px-4 py-2 rounded-lg text-white"></header>

            <main className="grid grid-cols-[1fr_3fr] gap-16 mx-16">
                <section>
                    <p>Filter by genre</p>
                    <Separator className="mt-2 mb-8" />

                    <div className="flex flex-col gap-2">
                        {genres.map(genre => {
                            return <Genre key={genre.id} genre={genre} />
                        })}
                    </div>
                </section>

                <section>
                    <Search />

                    <div className="flex flex-col gap-8 mb-16">
                        {movies.map(movie => {
                            return <Movie key={movie.id} movie={movie} />
                        })}
                    </div>

                    <Pagination
                        page={pagination.page}
                        totalPages={pagination.totalPages}
                    />
                </section>
            </main>

            <footer className="bg-slate-900 h-48 m-2 rounded-lg"></footer>
        </div>
    )
}

export default Home
