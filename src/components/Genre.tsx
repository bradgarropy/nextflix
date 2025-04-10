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

    const isActive = params.get("genre") === genre.title.toLowerCase()

    const handleFilter = () => {
        const newParams = new URLSearchParams(params)

        if (isActive) {
            newParams.delete("genre")
        } else {
            newParams.set("genre", genre.title.toLowerCase())
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
