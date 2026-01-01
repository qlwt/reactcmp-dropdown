import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import * as r from "react"

export const useCtxStateOpen = function () {
    const ctxstate_open = r.useContext(CmpCtxState_Open)

    if (!ctxstate_open) { throw new Error(`Using DDN dependend component outside of DDNOpen Context`) }

    return ctxstate_open
}
