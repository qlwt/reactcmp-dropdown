import { useCtxStateOpen } from "#src/component/ctx-state/hook/view/open.js"
import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import { useDDNRootInfer } from "#src/hook/ddnparts/root_infer.js"
import { useDDNShardInfer } from "#src/hook/ddnparts/shard_infer.js"
import { useRefMerge } from "#src/hook/ref/merge.js"
import * as r from "react"

export type CmpButton_Props = {
    readonly isroot?: boolean
    readonly render_view?: (props: r.JSX.IntrinsicElements["button"]) => r.ReactNode

    readonly disabled?: boolean
    readonly className?: string
    readonly children?: r.ReactNode
}

const render_view_default: NonNullable<CmpButton_Props["render_view"]> = function(props) {
    return <button {...props} />
}

export const CmpButton = r.memo(r.forwardRef<HTMLButtonElement, CmpButton_Props>((props, f_ref) => {
    const nprop_render_view = props.render_view ?? render_view_default

    const ctxstate_refs = useCtxStateRefs()
    const ctxstate_open = useCtxStateOpen()

    const l_ref = r.useRef<HTMLButtonElement | null>(null)

    const event_click = r.useCallback(() => {
        ctxstate_open.open_set(t => !t)
    }, [])

    useDDNShardInfer({
        isolated: false,
        ref: r.useCallback(() => l_ref.current, []),
    })

    useDDNRootInfer({
        ref: r.useCallback(() => l_ref.current, []),
        active: props.isroot ?? !ctxstate_refs.container_real,
    })

    const ref = useRefMerge<HTMLButtonElement>(l_ref, f_ref)

    return nprop_render_view({
        ref,

        onClick: event_click,
        disabled: props.disabled,
        children: props.children,
        className: props.className,
    })
}))

export default CmpButton
