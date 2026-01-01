import { useCtxStateContent } from "#src/component/ctx-state/hook/view/content.js"
import { useRefMerge } from "#src/hook/ref/merge.js"
import { cl } from "#src/util/clname/merge.js"
import { prop_clmap_def_content, type PropClMap_DefContent } from "#src/util/prop/clmap/def/content.js"
import { prop_clmap_new } from "#src/util/prop/clmap/new/index.js"
import * as r from "react"

export type CmpContent_Props = {
    readonly focus_noguards?: boolean

    readonly clmap?: PropClMap_DefContent

    readonly className?: string
    readonly children?: r.ReactNode

    readonly render_view?: (props: r.JSX.IntrinsicElements["div"]) => r.ReactNode
}

const render_view_default: NonNullable<CmpContent_Props["render_view"]> = function(props) {
    return <div {...props} />
}

export const CmpContent = r.memo(r.forwardRef<HTMLDivElement, CmpContent_Props>((props, f_ref) => {
    const nprop_container = props.render_view ?? render_view_default
    const nprop_clmap = r.useMemo(() => prop_clmap_new(props.clmap, prop_clmap_def_content), [props.clmap])

    const ctxstate_content = useCtxStateContent()

    const ref = useRefMerge(f_ref, ctxstate_content.ref_content as r.Ref<HTMLDivElement | null>)

    return <>
        {
            props.focus_noguards
                ? null
                : <input
                    data-focusguard

                    tabIndex={0}
                    className={cl(nprop_clmap.__qyuddn, nprop_clmap.focusguard)}
                />
        }

        {nprop_container({
            ref: ref,
            children: props.children,

            tabIndex: 0,
            className: cl(nprop_clmap.__qyuddn, nprop_clmap.content, props.className),
        })}

        {
            props.focus_noguards
                ? null
                : <input
                    data-focusguard

                    tabIndex={0}
                    className={cl(nprop_clmap.__qyuddn, nprop_clmap.focusguard)}
                />
        }
    </>
}))

export default CmpContent
