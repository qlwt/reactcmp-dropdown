import { CmpCtxState_Content } from "#src/component/ctx-state/element/content.js"
import { useCtxStateInitContent } from "#src/component/ctx-state/hook/init/content.js"
import { useDDNListInfer } from "#src/hook/ddnparts/list_infer.js"
import { useDDNShardInfer } from "#src/hook/ddnparts/shard_infer.js"
import { useFocusCaptureInfer } from "#src/hook/focus/capture_infer.js"
import { useListPosApiAbsolute } from "#src/hook/listpos/api/absolute.js"
import { useListPosRearrange } from "#src/hook/listpos/rearrange/index.js"
import type { ListPosRearrange_Config } from "#src/hook/listpos/rearrange/type/config.js"
import { useOpenInfer } from "#src/hook/open/view_infer.js"
import { useRefMerge } from "#src/hook/ref/merge.js"
import { useRefO } from "#src/hook/ref/o.js"
import { cl } from "#src/util/clname/merge.js"
import { cssprops_new_size } from "#src/util/cssprops/new/size.js"
import { prop_align_new } from "#src/util/prop/align/new/index.js"
import { prop_align_new_reversed } from "#src/util/prop/align/new/reversed.js"
import type { PropAlign_Raw } from "#src/util/prop/align/type/prop.js"
import { prop_clmap_def_content } from "#src/util/prop/clmap/def/content.js"
import { prop_clmap_def_listabs } from "#src/util/prop/clmap/def/listabs.js"
import { prop_clmap_new } from "#src/util/prop/clmap/new/index.js"
import type { PropClMap_Raw } from "#src/util/prop/clmap/type/prop.js"
import { prop_direction_new } from "#src/util/prop/direction/new/index.js"
import type { PropDirection_Raw } from "#src/util/prop/direction/type/prop.js"
import { prop_justify_new } from "#src/util/prop/justify/new/index.js"
import { prop_justify_new_reversed } from "#src/util/prop/justify/new/reversed.js"
import type { PropJustify_Raw } from "#src/util/prop/justify/type/prop.js"
import * as r from "react"

export type CmpListAbs_Props = {
    readonly gap?: number
    readonly lazy?: boolean

    readonly align?: PropAlign_Raw
    readonly justify?: PropJustify_Raw
    readonly direction?: PropDirection_Raw

    readonly transition_nosize?: boolean

    readonly rearrange?: Partial<ListPosRearrange_Config>

    readonly clmap?: PropClMap_Raw<keyof typeof prop_clmap_def_listabs>
    readonly clmap_content?: PropClMap_Raw<keyof typeof prop_clmap_def_content>

    readonly event_visible_change?: (visible: boolean) => void
    readonly event_transition_change?: (name: string, active: boolean) => void

    readonly render_view?: (props: r.JSX.IntrinsicElements["div"]) => r.ReactNode

    readonly className?: string
    readonly children?: r.ReactNode | (() => r.ReactNode)
}

const render_view_default: NonNullable<CmpListAbs_Props["render_view"]> = function(props) {
    return <div {...props} />
}

export const CmpListAbs = r.memo(r.forwardRef<HTMLDivElement, CmpListAbs_Props>((props, f_ref) => {
    const nprop_gap = props.gap ?? 0
    const nprop_lazy = props.lazy ?? true
    const nprop_align = prop_align_new(props.align)
    const nprop_justify = prop_justify_new(props.justify)
    const nprop_direction = prop_direction_new(props.direction)
    const nprop_render_view = props.render_view ?? render_view_default
    const nprop_clmap = r.useMemo(() => prop_clmap_new(props.clmap, prop_clmap_def_listabs), [props.clmap])
    const nprop_clmap_content = r.useMemo(() => prop_clmap_new(props.clmap_content, prop_clmap_def_content), [props.clmap_content])
    const nprop_transition_nosize = props.transition_nosize ?? false

    const l_ref = r.useRef<HTMLDivElement | null>(null)
    const l_ref_content = r.useRef<HTMLElement | null>(null)
    const ref_list = useRefO(l_ref)
    const ref_content = useRefO(l_ref_content)

    const open = useOpenInfer({})
    const [visible, visible_set] = r.useState(false)
    const listapi = useListPosApiAbsolute({ ref_list, ref_content, clmap_content: nprop_clmap_content })

    const ctxstate_content = useCtxStateInitContent({
        ref_content: l_ref_content,
    })

    useDDNListInfer({
        visible,
    })

    useDDNShardInfer({
        isolated: false,

        ref: useRefO(l_ref),
    })

    useListPosRearrange({
        open,
        api: listapi.api,
        active: visible || open,
        rearrange_config: props.rearrange,

        api_config: {
            gap: nprop_gap,
            align: nprop_align,
            justify: nprop_justify,
            direction: nprop_direction,
        },
    })

    useFocusCaptureInfer({
        open,

        ref_target: useRefO(ctxstate_content.ref_content),
    })

    const ref = useRefMerge(l_ref, f_ref)

    const children = r.useMemo(() => {
        if (!nprop_lazy || visible || open) {
            if (typeof props.children === "function") {
                return props.children()
            }

            return props.children
        }

        return null
    }, [nprop_lazy, visible, open, props.children])

    const view_align = listapi.reverse.align ? prop_align_new_reversed(nprop_align) : nprop_align
    const view_justify = listapi.reverse.justify ? prop_justify_new_reversed(nprop_justify) : nprop_justify

    return <CmpCtxState_Content value={ctxstate_content}>
        {nprop_render_view({
            ref,
            children,

            className: cl(
                nprop_clmap.__qyuddn,
                nprop_clmap.listabs,
                open && nprop_clmap._open,
                nprop_transition_nosize && nprop_clmap._transition_nosize,
                view_align === "end" && nprop_clmap._align_end,
                view_align === "start" && nprop_clmap._align_start,
                view_align === "center" && nprop_clmap._align_center,
                view_justify === "end" && nprop_clmap._justify_end,
                view_justify === "start" && nprop_clmap._justify_start,
                nprop_direction === "hor" && nprop_clmap._horizontal,
                nprop_direction === "ver" && nprop_clmap._vertical,

                props.className,
            ),

            style: {
                ["--gap"]: `${nprop_gap}px`,

                ...cssprops_new_size({
                    size: listapi.size,
                    open: open,
                    direction: nprop_direction,
                }),
            } as r.CSSProperties,

            onTransitionStart: ev => {
                props.event_transition_change?.(ev.nativeEvent.propertyName, true)

                if (ev.nativeEvent.propertyName === "opacity" && open) {
                    visible_set(true)
                    props.event_visible_change?.(true)
                }
            },

            onTransitionEnd: ev => {
                props.event_transition_change?.(ev.nativeEvent.propertyName, false)

                if (ev.nativeEvent.propertyName === "opacity" && !open) {
                    listapi.api.clear()

                    visible_set(false)
                    props.event_visible_change?.(false)
                }
            },
        })}
    </CmpCtxState_Content>
}))

export default CmpListAbs
