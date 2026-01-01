export const cl = function (...names: (string | false | null | undefined)[]): string | undefined {
    let result: string[] = []

    for (const name of names) {
        if (name) {
            result.push(name)
        }
    }

    if (result.length === 0) {
        return undefined
    }

    return result.join(" ")
}
