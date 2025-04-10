import Movie from "~/components/Movie"
import Pagination from "~/components/Pagination"
import Search from "~/components/Search"

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

    return (
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 min-h-screen">
            <header className="bg-slate-900 h-16 m-2 px-4 py-2 rounded-lg text-white"></header>

            <main className="grid grid-cols-[3fr_1fr] gap-4 mx-2">
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

                <section className="border border-slate-900">sidebar</section>
            </main>

            <footer className="bg-slate-900 h-48 m-2 rounded-lg"></footer>
        </div>
    )
}

export default Home
