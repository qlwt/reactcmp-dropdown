import { useCloseEvtRoot, type UseCloseEvtRoot_Params } from "#src/hook/closeevt/root.js"
import { useCtxStateConfig } from "#src/component/ctx-state/hook/view/config.js"
import { useCtxStateOpen } from "#src/component/ctx-state/hook/view/open.js"
import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"

export type UseCloseEvtRootInfer_Params = Omit<UseCloseEvtRoot_Params, (
    | "ctxstate_open"
    | "ctxstate_refs"
    | "ctxstate_config"
)>

export const useCloseEvtRootInfer = function(params: UseCloseEvtRootInfer_Params) {
    const ctxstate_refs = useCtxStateRefs()
    const ctxstate_open = useCtxStateOpen()
    const ctxstate_config = useCtxStateConfig()

    useCloseEvtRoot({
        ...params,

        ctxstate_refs,
        ctxstate_open,
        ctxstate_config,
    })
}
