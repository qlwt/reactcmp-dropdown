import { useCtxStateConfig } from "#src/component/ctx-state/hook/view/config.js"
import { useCtxStateOpen } from "#src/component/ctx-state/hook/view/open.js"
import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useCloseEvtShard, type UseCloseEvtShard_Params } from "#src/hook/closeevt/shard.js"

export type UseCloseEvtShardInfer_Params = Omit<UseCloseEvtShard_Params, (
    | "ctxstate_open"
    | "ctxstate_refs"
    | "ctxstate_config"
)>

export const useCloseEvtShardInfer = function (params: UseCloseEvtShardInfer_Params) {
    const ctxstate_refs = useCtxStateRefs()
    const ctxstate_open = useCtxStateOpen()
    const ctxstate_config = useCtxStateConfig()

    useCloseEvtShard({
        ...params,

        ctxstate_refs,
        ctxstate_open,
        ctxstate_config,
    })
}
