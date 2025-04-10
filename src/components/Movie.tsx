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

type MovieProps = {
    movie: MovieType
}

const Movie: FC<MovieProps> = ({movie}) => {
    return (
        <div>
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
                            <p>{movie.datePublished}</p>
                            <p>{movie.duration}</p>
                            <p>{movie.rating}</p>
                        </CardDescription>
                    </div>

                    <div className="grid grid-rows=[auto_1fr] gap-2">
                        <p>{movie.summary}</p>

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
        </div>
    )
}

export default Movie
