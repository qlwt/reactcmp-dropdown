import { useCtxStateOpen } from "#src/component/ctx-state/hook/view/open.js"
import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useOpen, type UseOpen_Params } from "#src/hook/open/view.js"

export type UseOpenInfer_Params = Omit<UseOpen_Params, (
    | "ctxstate_open"
    | "ctxstate_refs"
)>

export const useOpenInfer = function(params: UseOpenInfer_Params) {
    const ctxstate_refs = useCtxStateRefs()
    const ctxstate_open = useCtxStateOpen()

    return useOpen({
        ...params,

        ctxstate_open,
        ctxstate_refs,
    })
}
