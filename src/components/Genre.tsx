"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import type {FC} from "react"
import {Badge} from "~/components/ui/badge"
import type {Genre} from "~/utils/movies"

type GenreProps = {
    genre: Genre
}

const Genre: FC<GenreProps> = ({genre}) => {
    const params = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const genres = params.getAll("genre")
    const isActive = genres.includes(genre.id)

    const handleFilter = () => {
        const newParams = new URLSearchParams(params)
        const genres = newParams.getAll("genre")

        if (genres.includes(genre.id)) {
            const newGenres = genres.filter(id => id !== genre.id)

            newParams.delete("genre")
            newGenres.forEach(id => newParams.append("genre", id))
        } else {
            newParams.append("genre", genre.id)
        }

        replace(`${pathname}?${newParams.toString()}`)
    }

    return (
        <Badge
            variant={isActive ? "default" : "outline"}
            onClick={handleFilter}
        >
            {genre.title}
        </Badge>
    )
}

export default Genre
