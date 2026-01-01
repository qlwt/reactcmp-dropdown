import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useDDNRoot, type UseDDNRoot_Params } from "#src/hook/ddnparts/root.js"

export type UseDDNRootInfer_Params = Omit<UseDDNRoot_Params, (
    | "ctxstate_refs"
)>

export const useDDNRootInfer = function(params: UseDDNRootInfer_Params) {
    const ctxstate_refs = useCtxStateRefs()

    useDDNRoot({
        ...params,

        ctxstate_refs,
    })
}
