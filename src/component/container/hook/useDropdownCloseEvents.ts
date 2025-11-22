import type { FnSetterStateful } from "#src/type/setter.js"
import * as r from "react"

export type UseDropdownCloseEvents_Config = Readonly<{
    blur?: boolean
    click?: boolean
    scroll?: boolean
    resize?: boolean
    escape?: boolean
}>

export type UseDropdownCloseEvents_Params = Readonly<{
    ref: () => HTMLElement | null
    open: boolean
    open_set: FnSetterStateful<boolean>
    config?: UseDropdownCloseEvents_Config
}>

export const useDropdownCloseEvents = function(params: UseDropdownCloseEvents_Params) {
    const nconfig_blur = params.config?.blur ?? true
    const nconfig_click = params.config?.click ?? true
    const nconfig_scroll = params.config?.scroll ?? true
    const nconfig_resize = params.config?.resize ?? true
    const nconfig_escape = params.config?.escape ?? true

    r.useEffect((): VoidFunction | void => {
        const container = params.ref()

        if (params.open && container) {
            const controller = new AbortController()

            if (nconfig_blur) {
                container.addEventListener("focusout", ev => {
                    if (!(ev.relatedTarget instanceof Element) || !container.contains(ev.relatedTarget)) {
                        params.open_set(false)
                    }
                }, { signal: controller.signal })
            }

            if (nconfig_click) {
                document.addEventListener("click", ev => {
                    const path = ev.composedPath()

                    if (!container || !path.includes(container)) {
                        params.open_set(false)
                    }
                }, { signal: controller.signal })
            }

            if (nconfig_escape) {
                document.addEventListener("keydown", ev => {
                    if (!ev.defaultPrevented && ev.key.toLowerCase() === "escape") {
                        params.open_set(false)
                        ev.preventDefault()
                    }
                }, { signal: controller.signal })
            }

            if (nconfig_resize) {
                window.addEventListener("resize", () => {
                    params.open_set(false)
                }, { signal: controller.signal })
            }

            if (nconfig_scroll) {
                let parent = container.parentElement

                while (parent) {
                    parent.addEventListener("scroll", () => {
                        params.open_set(false)
                    }, { signal: controller.signal })

                    parent = parent.parentElement
                }

                document.addEventListener("scroll", () => {
                    params.open_set(false)
                }, { signal: controller.signal })
            }

            return () => {
                controller.abort()
            }
        }

    }, [
        params.ref,
        params.open,
        params.open_set,
        nconfig_click,
        nconfig_scroll,
        nconfig_resize,
        nconfig_escape
    ])
}
