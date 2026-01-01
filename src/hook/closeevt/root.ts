import type { CmpCtxState_StateConfig, CmpCtxState_StateOpen, CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import { useOpen } from "#src/hook/open/view.js"
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

const element_outside = function(element: Element, shards: Iterable<HTMLElement>): boolean {
    for (const ref of shards) {
        if (ref === element || ref.contains(element)) {
            return false
        }
    }

    return true
}

export type UseCloseEvtRoot_Params = {
    readonly active: boolean

    readonly ctxstate_open: CmpCtxState_StateOpen
    readonly ctxstate_refs: CmpCtxState_StateRefs
    readonly ctxstate_config: CmpCtxState_StateConfig
}

export const useCloseEvtRoot = function(params: UseCloseEvtRoot_Params) {
    const { ctxstate_open, ctxstate_refs, ctxstate_config } = params

    const nconfig_blur = ctxstate_config.closeevt.blur ?? true
    const nconfig_click = ctxstate_config.closeevt.click ?? true
    const nconfig_resize = ctxstate_config.closeevt.resize ?? true
    const nconfig_escape = ctxstate_config.closeevt.escape ?? true

    const open = useOpen({ ctxstate_open, ctxstate_refs, })

    r.useEffect((): VoidFunction | void => {
        if (params.active && open) {
            const controller = new AbortController()

            if (nconfig_blur) {
                document.addEventListener("focusin", ev => {
                    if (ev.target instanceof Element) {
                        if (ev.target.hasAttribute("data-focusguard")) {
                            if (element_outside(ev.target, refs_unpack(ctxstate_refs.register.it_down))) {
                                ctxstate_open.open_set(false)
                            }
                        } else if (element_outside(ev.target, refs_unpack(ctxstate_refs.register.it_context))) {
                            ctxstate_open.open_set(false)
                        }
                    }
                }, { signal: controller.signal })
            }

            if (nconfig_click) {
                document.addEventListener("click", ev => {
                    const shards = refs_unpack(ctxstate_refs.register.it_context)

                    if (ev.target instanceof Element) {
                        if (element_outside(ev.target, shards)) {
                            ctxstate_open.open_set(false)
                        }
                    }
                }, { signal: controller.signal })
            }

            if (nconfig_escape) {
                document.addEventListener("keydown", ev => {
                    if (ev.key.toLowerCase() === "escape") {
                        ctxstate_open.open_set(false)
                    }
                }, { signal: controller.signal })
            }

            if (nconfig_resize) {
                window.addEventListener("resize", () => {
                    ctxstate_open.open_set(false)
                }, { signal: controller.signal })
            }

            return () => {
                controller.abort()
            }
        }
    }, [
        open,
        ctxstate_refs.register,
        ctxstate_open.open_set,
        params.active,
        nconfig_click,
        nconfig_resize,
        nconfig_escape,
        nconfig_blur,
    ])
}
