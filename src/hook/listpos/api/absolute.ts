import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import type { ListPosApi_Api } from "#src/hook/listpos/api/type/api.js"
import type { ListPosApi_Reverse } from "#src/hook/listpos/api/type/reverse.js"
import type { ListPosApi_Size } from "#src/hook/listpos/api/type/size.js"
import type { FnSetterStateles } from "#src/type/setter.js"
import type { PropAlign } from "#src/util/prop/align/type/prop.js"
import type { PropClMap_DefContent } from "#src/util/prop/clmap/def/content.js"
import type { PropDirection } from "#src/util/prop/direction/type/prop.js"
import type { PropJustify } from "#src/util/prop/justify/type/prop.js"
import * as r from "react"

type Normalize_Axis = {
    readonly container_size: number
    readonly container_pos: number
    readonly screen_size: number
    readonly list_size: number

    readonly size_set: FnSetterStateles<number | null>
}

type NormalizeJusitfy_Params = {
    readonly gap: number
    readonly justify: PropJustify
    readonly direction: PropDirection
    readonly reverse_set: FnSetterStateles<boolean>

    readonly axis_main: Normalize_Axis
    readonly axis_cross: Normalize_Axis
}

const normalize_justify = function(params: NormalizeJusitfy_Params) {
    let axis_main: Normalize_Axis

    switch (params.direction) {
        case "ver": {
            axis_main = params.axis_main

            break
        }
        case "hor": {
            axis_main = params.axis_cross

            break
        }
    }

    let freespace_direct
    let freespace_reverse

    switch (params.justify) {
        case "start": {
            freespace_direct = axis_main.container_pos - params.gap
            freespace_reverse = axis_main.screen_size - params.gap - (axis_main.container_pos + axis_main.container_size)

            break
        }
        case "end": {
            freespace_direct = axis_main.screen_size - params.gap - (axis_main.container_pos + axis_main.container_size)
            freespace_reverse = axis_main.container_pos - params.gap

            break
        }
    }

    if (freespace_direct >= axis_main.list_size || freespace_direct >= freespace_reverse) {
        params.reverse_set(false)
        axis_main.size_set(Math.min(freespace_direct, axis_main.list_size))
    } else {
        params.reverse_set(true)
        axis_main.size_set(Math.min(freespace_reverse, axis_main.list_size))
    }
}

type NormalizeAlign_Params = {
    readonly align: PropAlign
    readonly direction: PropDirection
    readonly reverse_set: FnSetterStateles<boolean>

    readonly axis_main: Normalize_Axis
    readonly axis_cross: Normalize_Axis
}

const normalize_align = function(params: NormalizeAlign_Params) {
    let axis_main: Normalize_Axis

    switch (params.direction) {
        case "hor": {
            axis_main = params.axis_main

            break
        }
        case "ver": {
            axis_main = params.axis_cross

            break
        }
    }

    let freespace_direct
    let freespace_reverse

    switch (params.align) {
        case "center": {
            const point = axis_main.container_pos + (axis_main.container_size / 2)
            const freespace = Math.max(Math.min(point, axis_main.screen_size - point), 0) * 2

            params.reverse_set(false)
            axis_main.size_set(Math.min(freespace, axis_main.list_size))

            return
        }
        case "start": {
            freespace_direct = axis_main.screen_size - axis_main.container_pos
            freespace_reverse = axis_main.container_pos + axis_main.container_size

            break
        }
        case "end": {
            freespace_direct = axis_main.container_pos + axis_main.container_size
            freespace_reverse = axis_main.screen_size - axis_main.container_pos

            break
        }
    }

    if (freespace_direct >= axis_main.list_size || freespace_direct >= freespace_reverse) {
        params.reverse_set(false)
        axis_main.size_set(Math.min(freespace_direct, axis_main.list_size))
    } else {
        params.reverse_set(true)
        axis_main.size_set(Math.min(freespace_reverse, axis_main.list_size))
    }
}

export type UseListPosAbsolute_Return = {
    readonly api: ListPosApi_Api
    readonly size: ListPosApi_Size
    readonly reverse: ListPosApi_Reverse
}

export type UseListPosAbsolute_Params = {
    readonly ref_list: () => HTMLElement | null
    readonly ref_content: () => HTMLElement | null

    readonly clmap_content: PropClMap_DefContent
}

export const useListPosApiAbsolute = function(params: UseListPosAbsolute_Params): UseListPosAbsolute_Return {
    const ctxstate_refs = useCtxStateRefs()

    const [align_reverse, align_reverse_set] = r.useState(false)
    const [justify_reverse, justify_reverse_set] = r.useState(false)

    const [width, width_set] = r.useState<null | number>(null)
    const [height, height_set] = r.useState<null | number>(null)

    return {
        size: r.useMemo(() => ({
            width: width,
            height: height,
        } as const), [width, height]),

        reverse: r.useMemo(() => ({
            align: align_reverse,
            justify: justify_reverse,
        }), [align_reverse, justify_reverse]),

        api: r.useMemo(() => ({
            clear: () => {
                align_reverse_set(false)
                justify_reverse_set(false)

                width_set(null)
                height_set(null)
            },

            rearrange: config => {
                const list = params.ref_list()
                const content = params.ref_content()
                const container = [...ctxstate_refs.rootref].map(ref => ref()).find(el => el !== null)

                if (list && container && content) {
                    if (params.clmap_content._tracking) {
                        content.classList.add(params.clmap_content._tracking)
                    }

                    const container_rect = container.getBoundingClientRect()

                    const axis_main: Normalize_Axis = {
                        size_set: height_set,
                        list_size: content.offsetHeight,
                        screen_size: document.documentElement.clientHeight,
                        container_pos: container_rect.y,
                        container_size: container_rect.height,
                    }

                    const axis_cross: Normalize_Axis = {
                        size_set: width_set,
                        list_size: content.offsetWidth,
                        screen_size: document.documentElement.clientWidth,
                        container_pos: container_rect.x,
                        container_size: container_rect.width,
                    }

                    normalize_justify({
                        axis_main,
                        axis_cross,
                        gap: config.gap,
                        justify: config.justify,
                        direction: config.direction,
                        reverse_set: justify_reverse_set,
                    })

                    normalize_align({
                        axis_main,
                        axis_cross,
                        align: config.align,
                        direction: config.direction,
                        reverse_set: align_reverse_set,
                    })

                    if (params.clmap_content._tracking) {
                        content.classList.remove(params.clmap_content._tracking)
                    }
                }
            },
        }), [ctxstate_refs.rootref, params.ref_list, params.ref_content, params.clmap_content])
    }
}
