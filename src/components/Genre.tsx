"use client"

import Link from "next/link"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import type {FC, MouseEvent} from "react"
import {badgeVariants} from "~/components/ui/badge"
import type {Genre} from "~/utils/movies"

type GenreProps = {
    genre: Genre
}

const Genre: FC<GenreProps> = ({genre}) => {
    const params = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const isActive = params.get("genre") === genre.title.toLowerCase()

    const handleFilter = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        const newParams = new URLSearchParams(params)

        if (isActive) {
            newParams.delete("genre")
        } else {
            newParams.set("genre", genre.title.toLowerCase())
        }

        replace(`${pathname}?${newParams.toString()}`)
    }

    return (
        <>
            <Link
                href=""
                onClick={handleFilter}
                className={badgeVariants({
                    variant: isActive ? "default" : "outline",
                })}
            >
                {genre.title}
            </Link>
        </>
    )
}

export default Genre
