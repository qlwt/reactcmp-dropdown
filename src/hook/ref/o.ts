import type { FnORef } from "#src/type/fnref.js"
import * as r from "react"

export const useRefO = function <T>(ref: r.RefObject<T>): FnORef<T> {
    return r.useCallback(() => ref.current, [ref])
}
