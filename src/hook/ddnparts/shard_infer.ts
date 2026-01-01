import { useCtxStateConfig } from "#src/component/ctx-state/hook/view/config.js"
import { useCtxStateOpen } from "#src/component/ctx-state/hook/view/open.js"
import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useDDNShard, type UseDDNShard_Params } from "#src/hook/ddnparts/shard.js"

export type UseDDNShardInfer_Params = Omit<UseDDNShard_Params, (
    | "ctxstate_open"
    | "ctxstate_refs"
    | "ctxstate_config"
)>

export const useDDNShardInfer = function(params: UseDDNShardInfer_Params) {
    const ctxstate_open = useCtxStateOpen()
    const ctxstate_refs = useCtxStateRefs()
    const ctxstate_config = useCtxStateConfig()

    useDDNShard({
        ...params,

        ctxstate_refs,
        ctxstate_open,
        ctxstate_config,
    })
}
