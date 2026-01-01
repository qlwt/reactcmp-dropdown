import { CmpCtxState_Config } from "#src/component/ctx-state/element/config.js"
import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import { CmpCtxState_Refs } from "#src/component/ctx-state/element/refs.js"
import { useCtxStateInitConfig } from "#src/component/ctx-state/hook/init/config.js"
import { useCtxStateInitOpen } from "#src/component/ctx-state/hook/init/open.js"
import { useCtxStateInitRefs } from "#src/component/ctx-state/hook/init/refs.js"
import { useCloseEvtRoot } from "#src/hook/closeevt/root.js"
import { useDDNRoot } from "#src/hook/ddnparts/root.js"
import { useDDNShard } from "#src/hook/ddnparts/shard.js"
import { useRefMerge } from "#src/hook/ref/merge.js"
import { useRefO } from "#src/hook/ref/o.js"
import type { FnSetterStateful } from "#src/type/setter.js"
import { cl } from "#src/util/clname/merge.js"
import type { CloseEvt_ConfigFull } from "#src/util/closeevt/type/config.js"
import type { Focus_Config } from "#src/util/focus/config/type/config.js"
import { prop_clmap_def_container } from "#src/util/prop/clmap/def/container.js"
import { prop_clmap_new } from "#src/util/prop/clmap/new/index.js"
import type { PropClMap_Raw } from "#src/util/prop/clmap/type/prop.js"
import * as r from "react"

export type CmpContainer_Props = {
    readonly open?: boolean
    readonly open_set?: FnSetterStateful<boolean>

    readonly render_view?: (props: r.JSX.IntrinsicElements["div"]) => r.ReactNode

    readonly focus?: Partial<Focus_Config>
    readonly closeevt?: Partial<CloseEvt_ConfigFull>
    readonly clmap?: PropClMap_Raw<keyof typeof prop_clmap_def_container>

    readonly className?: string
    readonly children?: r.ReactNode
}

const render_view_default: NonNullable<CmpContainer_Props["render_view"]> = function(props) {
    return <div {...props} />
}

export const CmpContainer = r.memo(r.forwardRef<HTMLDivElement, CmpContainer_Props>((props, f_ref) => {
    const nprop_clmap = r.useMemo(() => prop_clmap_new(props.clmap, prop_clmap_def_container), [props.clmap])
    const nprop_render_view = props.render_view ?? render_view_default

    const l_ref = r.useRef<HTMLDivElement | null>(null)

    const ctxstate_open = useCtxStateInitOpen({
        open: props.open,
        open_set: props.open_set,
    })

    const ctxstate_refs = useCtxStateInitRefs({
        container_real: true
    })

    const ctxstate_config = useCtxStateInitConfig({
        focus: props.focus,
        closeevt: props.closeevt,
    })

    useDDNRoot({
        active: true,
        ref: useRefO(l_ref),

        ctxstate_refs,
    })

    useDDNShard({
        isolated: true,
        ref: useRefO(l_ref),

        ctxstate_refs,
        ctxstate_open,
        ctxstate_config,
    })

    useCloseEvtRoot({
        active: true,

        ctxstate_open,
        ctxstate_refs,
        ctxstate_config,
    })

    const ref = useRefMerge(l_ref, f_ref)

    return <CmpCtxState_Config.Provider value={ctxstate_config}>
        <CmpCtxState_Open.Provider value={ctxstate_open}>
            <CmpCtxState_Refs.Provider value={ctxstate_refs}>
                {nprop_render_view({
                    ref,

                    children: props.children,
                    className: cl(nprop_clmap.__qyuddn, nprop_clmap.container, props.className),
                })}
            </CmpCtxState_Refs.Provider>
        </CmpCtxState_Open.Provider>
    </CmpCtxState_Config.Provider>
}))
