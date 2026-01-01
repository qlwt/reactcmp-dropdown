import type { CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import type { FnORefHTML } from "#src/type/fnref.js"
import * as r from "react"

export type UseDDNRoot_Params = {
    readonly active: boolean
    readonly ref: FnORefHTML
    readonly ctxstate_refs: CmpCtxState_StateRefs
}

export const useDDNRoot = function(params: UseDDNRoot_Params) {
    const { ctxstate_refs } = params

    r.useLayoutEffect((): VoidFunction | void => {
        if (params.active) {
            ctxstate_refs.rootref_set(old_rootref => {
                const now_rootref = new Set(old_rootref)

                now_rootref.add(params.ref)

                return now_rootref
            })

            return () => {
                ctxstate_refs.rootref_set(old_rootref => {
                    const now_rootref = new Set(old_rootref)

                    now_rootref.delete(params.ref)

                    return now_rootref
                })
            }
        }
    }, [ctxstate_refs.rootref_set, params.ref, params.active])
}
