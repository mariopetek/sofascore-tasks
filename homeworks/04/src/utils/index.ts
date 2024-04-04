export function capitalizeText(text: string) {
    return text.charAt(0).toUpperCase() + text.substring(1)
}

export function replaceNewlineAndFormFeed(text: string) {
    return text.replace(/\n|\f/g, ' ')
}
