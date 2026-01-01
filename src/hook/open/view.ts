import type { CmpCtxState_StateOpen, CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export type UseOpen_Params = {
    readonly ctxstate_open: CmpCtxState_StateOpen
    readonly ctxstate_refs: CmpCtxState_StateRefs
}

export const useOpen = function(params: UseOpen_Params) {
    const { ctxstate_open, ctxstate_refs } = params

    return r.useMemo(() => {
        return ctxstate_open.open_inherited || ctxstate_refs.cascade > 1
    }, [ctxstate_open.open_inherited, ctxstate_refs.cascade])
}
