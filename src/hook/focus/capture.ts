import type { CmpCtxState_StateConfig, CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import type { FnORefHTML } from "#src/type/fnref.js"
import * as r from "react"

const refs_unpack = function*(src: Iterable<FnORefHTML>): IterableIterator<HTMLElement> {
    for (const ref of src) {
        const element = ref()

        if (element) {
            yield element
        }
    }
}

const element_inside = function(element: HTMLElement, shards: Iterable<HTMLElement>): boolean {
    for (const ref of shards) {
        if (ref === element || ref.contains(element)) {
            return true
        }
    }

    return false
}

export type UseFocusCapture_Api = {
    readonly capture: VoidFunction
    readonly restore: VoidFunction
}

export type UseFocusCapture_Return = {
    readonly api: UseFocusCapture_Api
}

export type UseFocusCapture_Params = {
    readonly open: boolean
    readonly ref_target: FnORefHTML

    readonly ctxstate_refs: CmpCtxState_StateRefs
    readonly ctxstate_config: CmpCtxState_StateConfig
}

export function useFocusCapture(params: UseFocusCapture_Params) {
    const { ctxstate_config, ctxstate_refs } = params

    const nprop_move = ctxstate_config.focus.capture ?? true
    const nprop_restore = ctxstate_config.focus.capture ?? true
    const nprop_capture_options = r.useMemo(() => {
        return ctxstate_config.focus.capture_options ?? {
            preventScroll: true,
        }
    }, [ctxstate_config.focus.capture_options])
    const nprop_restore_options = r.useMemo(() => {
        return ctxstate_config.focus.restore_options ?? {
            preventScroll: true,
        }
    }, [ctxstate_config.focus.restore_options])

    const ref_restorecapture = r.useRef<HTMLElement | null>(null)

    r.useLayoutEffect(() => {
        if (params.open) {
            if (document.activeElement instanceof HTMLElement) {
                ref_restorecapture.current = document.activeElement
            }

            if (nprop_move) {
                params.ref_target()?.focus(nprop_capture_options)
            }
        } else {
            const active = document.activeElement
            const restorecapture = ref_restorecapture.current

            {
                ref_restorecapture.current = null
            }

            if (nprop_restore && restorecapture && active instanceof HTMLElement) {
                const active_inside = element_inside(
                    active,
                    refs_unpack(ctxstate_refs.register.it_context)
                )

                if (active_inside) {
                    restorecapture.focus(nprop_restore_options)
                }
            }
        }
    }, [params.open])
}
