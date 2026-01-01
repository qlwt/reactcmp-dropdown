import type { ListPosApi_Position } from "#src/hook/listpos/api/type/position.js";
import * as r from "react"

export const cssprops_new_position = function (params: ListPosApi_Position): r.CSSProperties {
    const result: r.CSSProperties = {}

    if (params.top !== null) {
        result.top= `${params.top}px`
    }

    if (params.left !== null) {
        result.left= `${params.left}px`
    }

    if (params.right !== null) {
        result.right= `${params.right}px`
    }

    if (params.bottom !== null) {
        result.bottom= `${params.bottom}px`
    }

    return result
}
