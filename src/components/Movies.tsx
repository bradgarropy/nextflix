"use client"

import type {FC} from "react"
import {Movie as MovieType} from "~/utils/movies"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "~/components/ui/card"
import Image from "next/image"
import {Badge, badgeVariants} from "~/components/ui/badge"
import {motion} from "motion/react"
import {useSearchParams} from "next/navigation"
import {formatDate, formatDuration} from "~/utils/format"
import Link from "next/link"

type MoviesProps = {
    movies: MovieType[]
}

const container = {
    initial: {},
    show: {
        transition: {
            staggerChildren: 0.05,
        },
    },
}

const item = {
    initial: {opacity: 0, y: -20},
    show: {opacity: 1, y: 0},
}

const Movies: FC<MoviesProps> = ({movies}) => {
    const params = useSearchParams()

    return (
        <motion.div
            className="flex flex-col gap-8 mb-16"
            variants={container}
            initial="initial"
            animate="show"
        >
            {movies.map(movie => {
                return (
                    <Movie
                        key={`${movie.id}-${params.toString()}`}
                        movie={movie}
                    />
                )
            })}
        </motion.div>
    )
}

type MovieProps = {
    movie: MovieType
}

const Movie: FC<MovieProps> = ({movie}) => {
    const imagePlaceholder =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII="

    return (
        <motion.div variants={item} whileHover={{scale: 1.02}}>
            <Card>
                <CardContent className="grid grid-cols-[auto_1fr_3fr] gap-12">
                    <Link
                        href={`https://youtube.com/results?search_query=${movie.title.split(" ").join("+")}+trailer`}
                        target="_blank"
                    >
                        <div className="w-[128px] h-[192px] relative rounded-lg shadow-lg overflow-hidden">
                            <Image
                                src={movie.posterUrl ?? imagePlaceholder}
                                placeholder={imagePlaceholder}
                                alt={`${movie.title} poster`}
                                fill
                            />
                        </div>
                    </Link>

                    <div>
                        <CardTitle className="mb-2">{movie.title}</CardTitle>

                        <CardDescription>
                            <p>{formatDuration(movie.duration)}</p>
                            <p>{formatDate(movie.datePublished)}</p>
                            <p>{movie.rating}</p>
                        </CardDescription>
                    </div>

                    <div className="grid grid-rows=[auto_1fr] gap-2">
                        {movie.summary ? (
                            <p>{movie.summary}</p>
                        ) : (
                            <p className="italic">No summary provided.</p>
                        )}

                        <div className="flex justify-between gap-2 items-end text-muted-foreground">
                            <div className="flex gap-2">
                                {movie.genres.map(genre => (
                                    <Link
                                        key={genre.id}
                                        href={`/genres/${genre.id}`}
                                        className={badgeVariants({
                                            variant: "outline",
                                        })}
                                    >
                                        {genre.title}
                                    </Link>
                                ))}
                            </div>

                            <Badge variant="outline">{`${movie.ratingValue} ⭐️`}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default Movies
