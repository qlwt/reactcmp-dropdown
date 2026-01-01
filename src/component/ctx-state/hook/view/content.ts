import { CmpCtxState_Content } from "#src/component/ctx-state/element/content.js"
import * as r from "react"

export const useCtxStateContent = function () {
    const ctxstate_content = r.useContext(CmpCtxState_Content)

    if (!ctxstate_content) { throw new Error(`Using DDN dependend component outside of DDNContent Context`) }

    return ctxstate_content
}
