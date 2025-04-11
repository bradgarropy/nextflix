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
import {Badge} from "~/components/ui/badge"
import {motion} from "motion/react"
import {useSearchParams} from "next/navigation"
import {formatDate, formatDuration} from "~/utils/format"

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
    return (
        <motion.div variants={item}>
            <Card>
                <CardContent className="grid grid-cols-[auto_auto_1fr] gap-12">
                    {movie.posterUrl ? (
                        <Image
                            src={movie.posterUrl}
                            alt={`${movie.title} poster`}
                            width={100}
                            height={100}
                        />
                    ) : (
                        <div />
                    )}

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

                        <div className="flex justify-between items-end text-muted-foreground">
                            <div className="flex gap-2">
                                {movie.genres.map(genre => (
                                    <Badge key={genre.id} variant="outline">
                                        {genre.title}
                                    </Badge>
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
