import { CmpCtxState_Refs } from "#src/component/ctx-state/element/refs.js"
import * as r from "react"

export const useCtxStateRefs = function () {
    const ctxstate_open = r.useContext(CmpCtxState_Refs)

    if (!ctxstate_open) { throw new Error(`Using DDN dependend component outside of DDNRefs Context`) }

    return ctxstate_open
}
