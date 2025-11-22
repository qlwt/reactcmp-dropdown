export type StyleMap<ClName extends keyof any> = {
    [K in ClName]: string | null
}
