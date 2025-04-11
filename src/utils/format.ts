const formatDuration = (duration: string) => {
    const formattedDuration = duration
        .replace("PT", "")
        .toLowerCase()
        .split("h")
        .join("h ")

    return formattedDuration
}

const formatDate = (date: string) => {
    const formattedDate = new Date(date).getFullYear()
    return formattedDate
}

export {formatDuration, formatDate}
