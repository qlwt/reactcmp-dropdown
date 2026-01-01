import type { PropAlign } from "#src/util/prop/align/type/prop.js"
import type { PropDirection } from "#src/util/prop/direction/type/prop.js"
import type { PropJustify } from "#src/util/prop/justify/type/prop.js"

export type ListPosApi_Config = {
    readonly gap: number
    readonly align: PropAlign
    readonly justify: PropJustify
    readonly direction: PropDirection
}

export type ListPosApi_Api = {
    readonly clear: VoidFunction
    readonly rearrange: (config: ListPosApi_Config) => void
}
