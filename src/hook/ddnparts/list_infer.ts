import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useDDNList, type UseDDNList_Params } from "#src/hook/ddnparts/list.js"

export type UseDDNListInfer_Params = Omit<UseDDNList_Params, (
    | "ctxstate_refs"
)>

export const useDDNListInfer = function(params: UseDDNListInfer_Params) {
    const ctxstate_refs = useCtxStateRefs()

    useDDNList({
        ...params,

        ctxstate_refs,
    })
}
