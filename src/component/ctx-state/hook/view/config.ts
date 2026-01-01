import { CmpCtxState_Config } from "#src/component/ctx-state/element/config.js"
import * as r from "react"

export const useCtxStateConfig = function () {
    const ctxstate_open = r.useContext(CmpCtxState_Config)

    if (!ctxstate_open) { throw new Error(`Using DDN dependend component outside of DDNConfig Context`) }

    return ctxstate_open
}
