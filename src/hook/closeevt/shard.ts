import type { CmpCtxState_StateConfig, CmpCtxState_StateOpen, CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export type UseCloseEvtShard_Params = {
    readonly active: boolean
    readonly ref: () => HTMLElement | null

    readonly ctxstate_refs: CmpCtxState_StateRefs
    readonly ctxstate_open: CmpCtxState_StateOpen
    readonly ctxstate_config: CmpCtxState_StateConfig
}

export const useCloseEvtShard = function(params: UseCloseEvtShard_Params) {
    const { ctxstate_refs, ctxstate_open, ctxstate_config, } = params

    const nconfig_scroll = ctxstate_config.closeevt.scroll ?? true

    r.useEffect((): VoidFunction | void => {
        if (params.active) {
            const element = params.ref()
            const controller = new AbortController()

            if (element) {
                let parent = element.parentElement

                const scroll_handler = (event: Event) => {
                    if (nconfig_scroll) {
                        ctxstate_open.open_set(false)
                    }

                    ctxstate_refs.shardevt_scroll.forEach(cb => cb(event))
                }

                while (parent) {
                    parent.addEventListener("scroll", scroll_handler, { signal: controller.signal })

                    parent = parent.parentElement
                }

                document.addEventListener("scroll", scroll_handler, { signal: controller.signal })
            }

            return () => {
                controller.abort()
            }
        }
    }, [
        params.ref,
        params.active,
        ctxstate_open.open_set,
        nconfig_scroll,
        ctxstate_refs.shardevt_scroll,
    ])
}
