import type { ListPosApi_Size } from "#src/hook/listpos/api/type/size.js";
import type { PropDirection } from "#src/util/prop/direction/type/prop.js";
import * as r from "react"

export type CSSProps_NewSize_Params = {
    readonly open: boolean
    readonly size: ListPosApi_Size
    readonly direction: PropDirection
}

export const cssprops_new_size = function(params: CSSProps_NewSize_Params): r.CSSProperties {
    const result: r.CSSProperties = {}

    switch (params.direction) {
        case "hor": {
            if (params.open) {
                result.width = params.size.width ?? 1
            } else {
                result.width = 1 
            }

            if (params.size.height) {
                result.height = params.size.height
            }

            break
        }
        case "ver": {
            if (params.open) {
                result.height = params.size.height ??1 
            } else {
                result.height = 1
            }

            if (params.size.width) {
                result.width = params.size.width
            }

            break
        }
    }

    return result
}
