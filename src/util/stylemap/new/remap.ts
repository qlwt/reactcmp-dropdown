import type { StyleMap } from "#src/util/stylemap/type/StyleMap.js"

export const stylemap_new_remap = function <Def extends Readonly<Record<string, string>>>(
    def: Def, remap: Readonly<Record<string, string | null>>
): StyleMap<keyof Def> {
    const result: Partial<StyleMap<keyof Def>> = {}

    for (const clname of Object.keys(def)) {
        const remaped = remap[clname]

        if (remaped !== undefined) {
            result[clname as keyof Def] = remaped

            continue
        }

        {
            result[clname as keyof Def] = clname
        }
    }

    return result as StyleMap<keyof Def>
}
