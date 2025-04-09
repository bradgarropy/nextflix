const Home = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 min-h-screen">
            <header className="bg-slate-900 h-16 m-2 px-4 py-2 rounded-lg text-white"></header>

            <main className="grid grid-cols-[3fr_1fr] gap-4 mx-2">
                <section className="border border-slate-900">main</section>
                <section className="border border-slate-900">sidebar</section>
            </main>

            <footer className="bg-slate-900 h-48 m-2 rounded-lg"></footer>
        </div>
    )
}

export default Home
