import { useCtxStateConfig } from "#src/component/ctx-state/hook/view/config.js"
import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useFocusCapture, type UseFocusCapture_Params } from "#src/hook/focus/capture.js"

export type UseFocusCaptureInfer_Params = Omit<UseFocusCapture_Params, (
    | "ctxstate_config"
    | "ctxstate_refs"
)>

export const useFocusCaptureInfer = function (params: UseFocusCaptureInfer_Params) {
    const ctxstate_refs = useCtxStateRefs()
    const ctxstate_config = useCtxStateConfig()

    useFocusCapture({
        ...params,

        ctxstate_refs,
        ctxstate_config,
    })
}
