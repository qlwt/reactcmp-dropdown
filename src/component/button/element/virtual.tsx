import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useDDNRootInfer } from "#src/hook/ddnparts/root_infer.js"
import { useDDNShardInfer } from "#src/hook/ddnparts/shard_infer.js"
import type { FnORefHTML } from "#src/type/fnref.js"
import * as r from "react"

export type CmpButtonVirtual_Props = {
    readonly target: FnORefHTML

    readonly isroot?: boolean

    readonly children?: r.ReactNode
}

export const CmpButtonVirtual = r.memo<CmpButtonVirtual_Props>(props => {
    const { target: ref_target } = props

    const ctxstate_refs = useCtxStateRefs()

    useDDNShardInfer({
        ref: ref_target,
        isolated: false,
    })

    useDDNRootInfer({
        ref: ref_target,
        active: props.isroot ?? !ctxstate_refs.container_real,
    })

    return props.children
})

export default CmpButtonVirtual
