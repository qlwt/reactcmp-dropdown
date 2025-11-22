import { useDropdownCloseEvents, type UseDropdownCloseEvents_Config } from "#src/component/container/hook/useDropdownCloseEvents.js"
import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import type { CmpCtxState_StateOpen } from "#src/component/ctx-state/type/state.js"
import type { FnSetterStateful } from "#src/type/setter.js"
import { cl } from "#src/util/cl.js"
import { stylemap_new_remap } from "#src/util/stylemap/new/remap.js"
import * as r from "react"

const stylemap = {
    container: "container"
} as const

export type CmpContainer_StyleModule = {
    [K in keyof typeof stylemap]?: string | null
}

export type CmpContainer_Props = Readonly<{
    open?: boolean
    open_set?: FnSetterStateful<boolean>

    className?: string
    children?: r.ReactNode
    stylemodule?: CmpContainer_StyleModule
    closeevents?: UseDropdownCloseEvents_Config
}>

export const CmpContainer = r.memo(r.forwardRef<HTMLDivElement, CmpContainer_Props>((props, ref) => {
    const nprop_style = r.useMemo(() => (
        props.stylemodule ? stylemap_new_remap(stylemap, props.stylemodule) : stylemap
    ), [props.stylemodule])

    const l_ref = r.useRef<HTMLDivElement | null>(null)

    const [open, open_set] = r.useState(false)

    const l_open = props.open ?? open
    const l_open_set = props.open_set ?? open_set

    const ctxstate = r.useMemo<CmpCtxState_StateOpen>(() => {
        return {
            open: l_open,
            ref: l_ref,
            open_set: l_open_set,
        }
    }, [l_open, l_open_set])

    const mref = r.useMemo(() => {
        return (element: HTMLDivElement | null) => {
            l_ref.current = element

            if (ref) {
                if (typeof ref === "object") {
                    ref.current = element
                } else {
                    ref(element)
                }
            }
        }
    }, [ref])

    useDropdownCloseEvents({
        config: props.closeevents,
        ref: r.useCallback(() => l_ref.current, []),
        open: ctxstate.open,
        open_set: ctxstate.open_set,
    })

    return <div
        ref={mref}
        className={cl("__qyuddn", props.className, nprop_style.container)}
    >
        <CmpCtxState_Open.Provider value={ctxstate}>
            {props.children}
        </CmpCtxState_Open.Provider>
    </div>
}))
