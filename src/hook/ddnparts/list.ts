import type { CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export type UseDDNList_Params = {
    readonly visible: boolean

    readonly ctxstate_refs: CmpCtxState_StateRefs
}

export const useDDNList = function(params: UseDDNList_Params) {
    const { ctxstate_refs } = params

    r.useEffect((): VoidFunction | void => {
        if (params.visible) {
            ctxstate_refs.cascade_api.increment()

            return () => {
                ctxstate_refs.cascade_api.decrement()
            }
        }
    }, [params.visible, ctxstate_refs.cascade_api])
}
