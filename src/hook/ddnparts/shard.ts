import type { CmpCtxState_StateConfig, CmpCtxState_StateOpen, CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import { useCloseEvtShard } from "#src/hook/closeevt/shard.js"
import * as r from "react"

export type UseDDNShard_Params = {
    readonly isolated: boolean
    readonly ref: () =>HTMLElement | null 

    readonly ctxstate_open: CmpCtxState_StateOpen
    readonly ctxstate_refs: CmpCtxState_StateRefs
    readonly ctxstate_config: CmpCtxState_StateConfig
}

export const useDDNShard = function(params: UseDDNShard_Params){
    const { ctxstate_open, ctxstate_refs, ctxstate_config } = params

    useCloseEvtShard({
        ref: params.ref,
        active: params.isolated || !ctxstate_refs.container_real,

        ctxstate_open,
        ctxstate_refs,
        ctxstate_config,
    })

    r.useLayoutEffect((): VoidFunction | void => {
        if (params.isolated || !ctxstate_refs.container_real) {
            ctxstate_refs.register.add_own(params.ref)

            return () => {
                ctxstate_refs.register.delete_own(params.ref)
            }
        }
    }, [ctxstate_refs.register, ctxstate_refs.container_real, params.isolated, params.ref])
}
