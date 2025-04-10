import Movie from "~/components/Movie"
import Search from "~/components/Search"
import {movieClient} from "~/utils/movies"

type HomeProps = {
    searchParams: Promise<{search?: string}>
}

const Home = async (props: HomeProps) => {
    const searchParams = await props.searchParams
    const search = searchParams.search ?? ""
    const movies = await movieClient.getMovies({search})

    return (
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 min-h-screen">
            <header className="bg-slate-900 h-16 m-2 px-4 py-2 rounded-lg text-white"></header>

            <main className="grid grid-cols-[3fr_1fr] gap-4 mx-2">
                <section>
                    <Search />

                    <div className="flex flex-col gap-8">
                        {movies.map(movie => {
                            return <Movie key={movie.id} movie={movie} />
                        })}
                    </div>
                </section>

                <section className="border border-slate-900">sidebar</section>
            </main>

            <footer className="bg-slate-900 h-48 m-2 rounded-lg"></footer>
        </div>
    )
}

export default Home
