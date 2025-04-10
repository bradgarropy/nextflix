"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import type {FC} from "react"
import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination"

type PaginationProps = {
    page: number
    totalPages: number
}

const Pagination: FC<PaginationProps> = ({page, totalPages}) => {
    const params = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handlePage = async (page: number) => {
        const newParams = new URLSearchParams(params)

        if (page) {
            newParams.set("page", page.toString())
        } else {
            newParams.delete("page")
        }

        replace(`${pathname}?${newParams.toString()}`)
    }

    return (
        <PaginationComponent>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={
                            page === 1
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                        onClick={() => handlePage(page - 1)}
                    />
                </PaginationItem>

                {page > 2 ? (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                ) : null}

                {page > 1 ? (
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePage(page - 1)}>
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem>
                ) : null}

                <PaginationItem>
                    <PaginationLink onClick={() => handlePage(page)} isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>

                {page < totalPages ? (
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePage(page + 1)}>
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                ) : null}

                {page < totalPages - 1 ? (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                ) : null}

                <PaginationItem>
                    <PaginationNext
                        className={
                            page === totalPages
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                        onClick={() => handlePage(page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationComponent>
    )
}

export default Pagination
