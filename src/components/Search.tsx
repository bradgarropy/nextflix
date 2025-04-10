"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {Label} from "~/components/ui/label"
import {Input} from "~/components/ui/input"
import type {ChangeEvent} from "react"

const Search = () => {
    const params = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = async (search: string) => {
        const newParams = new URLSearchParams(params)

        if (search) {
            newParams.set("search", search)
        } else {
            newParams.delete("search")
        }

        replace(`${pathname}?${newParams.toString()}`)
    }

    return (
        <>
            <Label htmlFor="search">Search</Label>

            <Input
                id="search"
                name="search"
                type="text"
                defaultValue={params.get("search") ?? ""}
                placeholder="Search for a movie"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleSearch(event.target.value)
                }}
            />
        </>
    )
}

export default Search
