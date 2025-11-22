export const cl = function(...clnames: (string | false | undefined | null)[]): string {
    let result: string[] = []

    for (const clname of clnames) {
        if (clname) {
            result.push(clname)
        }
    }

    return result.join(" ")
}
