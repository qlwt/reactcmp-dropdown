import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js"
import type { ListPosApi_Api } from "#src/hook/listpos/api/type/api.js"
import type { ListPosApi_Position } from "#src/hook/listpos/api/type/position.js"
import type { ListPosApi_Reverse } from "#src/hook/listpos/api/type/reverse.js"
import type { ListPosApi_Size } from "#src/hook/listpos/api/type/size.js"
import type { FnORefHTML } from "#src/type/fnref.js"
import type { FnSetterStateles } from "#src/type/setter.js"
import type { PropAlign } from "#src/util/prop/align/type/prop.js"
import type { PropClMap_DefContent } from "#src/util/prop/clmap/def/content.js"
import type { PropDirection } from "#src/util/prop/direction/type/prop.js"
import type { PropJustify } from "#src/util/prop/justify/type/prop.js"
import { prop_stretch_new } from "#src/util/prop/stretch/new/index.js"
import type { PropStretch, PropStretch_Raw } from "#src/util/prop/stretch/type/prop.js"
import * as r from "react"

const stretch_apply = function(stretch: PropStretch, target: number, container: number): number {
    switch (stretch) {
        case "none":
            return target
        case "min":
            return Math.max(target, container)
        case "strict":
            return container
    }
}

type Normalize_Flow = {
    readonly position_set: FnSetterStateles<number | null>
}

type Normalize_Axis = {
    readonly flow_direct: Normalize_Flow
    readonly flow_reverse: Normalize_Flow
    readonly container_size: number
    readonly container_pos: number
    readonly screen_size: number
    readonly list_size: number

    readonly size_set: FnSetterStateles<number | null>
}

type NormalizeJustify_Params = {
    readonly gap: number
    readonly justify: PropJustify
    readonly direction: PropDirection
    readonly reverse_set: FnSetterStateles<boolean>

    readonly axis_main: Normalize_Axis
    readonly axis_cross: Normalize_Axis
}

const normalize_justify = function(params: NormalizeJustify_Params) {
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

    let flow_direct
    let flow_reverse
    let freespace_direct
    let freespace_reverse
    let position_direct
    let position_reverse

    switch (params.justify) {
        case "start": {
            freespace_reverse = axis_main.screen_size - params.gap - (axis_main.container_pos + axis_main.container_size)
            freespace_direct = axis_main.container_pos - params.gap
            flow_direct = axis_main.flow_reverse
            flow_reverse = axis_main.flow_direct
            position_direct = axis_main.screen_size - axis_main.container_pos + params.gap
            position_reverse = axis_main.container_pos + axis_main.container_size + params.gap

            break
        }
        case "end": {
            freespace_direct = axis_main.screen_size - params.gap - (axis_main.container_pos + axis_main.container_size)
            freespace_reverse = axis_main.container_pos - params.gap
            flow_direct = axis_main.flow_direct
            flow_reverse = axis_main.flow_reverse
            position_direct = axis_main.container_pos + axis_main.container_size + params.gap
            position_reverse = axis_main.screen_size - axis_main.container_pos + params.gap

            break
        }
    }

    if (freespace_direct >= axis_main.list_size || freespace_direct >= freespace_reverse) {
        params.reverse_set(false)

        axis_main.size_set(Math.min(freespace_direct, axis_main.list_size))

        flow_direct.position_set(position_direct)
        flow_reverse.position_set(null)
    } else {
        params.reverse_set(true)

        axis_main.size_set(Math.min(freespace_reverse, axis_main.list_size))

        flow_direct.position_set(null)
        flow_reverse.position_set(position_reverse)
    }
}

type NormalizeAlign_Params = {
    readonly align: PropAlign
    readonly direction: PropDirection
    readonly reverse_set: FnSetterStateles<boolean>

    readonly stretch: PropStretch
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

    const list_size_normalized = stretch_apply(params.stretch, axis_main.list_size, axis_main.container_size)

    switch (params.align) {
        case "center": {
            if (list_size_normalized >= axis_main.screen_size) {
                params.reverse_set(false)

                axis_main.size_set(axis_main.screen_size)

                axis_main.flow_direct.position_set(0)
                axis_main.flow_reverse.position_set(null)
            } else {
                const point = axis_main.container_pos + axis_main.container_size / 2
                const spacereq = list_size_normalized / 2
                const freespace_reverse = point
                const freespace_direct = axis_main.screen_size - point

                if (spacereq >= freespace_reverse) {
                    params.reverse_set(false)

                    axis_main.flow_direct.position_set(0)
                    axis_main.flow_reverse.position_set(null)

                    axis_main.size_set(list_size_normalized)
                } else if (spacereq >= freespace_direct) {
                    params.reverse_set(true)

                    axis_main.flow_reverse.position_set(0)
                    axis_main.flow_direct.position_set(null)

                    axis_main.size_set(list_size_normalized)
                } else {
                    params.reverse_set(false)

                    axis_main.flow_direct.position_set(point - spacereq)
                    axis_main.flow_reverse.position_set(null)

                    axis_main.size_set(list_size_normalized)
                }
            }

            break
        }
        case "start": {
            const freespace_direct = axis_main.screen_size - axis_main.container_pos
            const freespace_reverse = axis_main.container_pos + axis_main.container_size

            const flow_direct = axis_main.flow_direct
            const flow_reverse = axis_main.flow_reverse

            const position_direct = Math.max(0, (
                + axis_main.container_pos
                - Math.max(0, list_size_normalized - freespace_direct)
            ))

            const position_reverse = Math.max(0, (
                + axis_main.screen_size
                - (axis_main.container_pos + axis_main.container_size)
                - Math.max(0, list_size_normalized - freespace_reverse)
            ))

            if (freespace_direct >= list_size_normalized || freespace_direct >= freespace_reverse) {
                params.reverse_set(false)

                axis_main.size_set(Math.min(freespace_direct, list_size_normalized))

                flow_direct.position_set(position_direct)
            } else {
                params.reverse_set(true)

                axis_main.size_set(Math.min(freespace_reverse, list_size_normalized))

                flow_direct.position_set(null)
                flow_reverse.position_set(position_reverse)
            }

            break
        }
        case "end": {
            const freespace_direct = axis_main.container_pos + axis_main.container_size
            const freespace_reverse = axis_main.screen_size - axis_main.container_pos

            const flow_direct = axis_main.flow_reverse
            const flow_reverse = axis_main.flow_direct

            const position_direct = Math.max(0, (
                + axis_main.screen_size
                - (axis_main.container_pos + axis_main.container_size)
                - Math.max(0, list_size_normalized - freespace_direct)
            ))

            const position_reverse = Math.max(0, (
                + axis_main.container_pos
                - Math.max(0, list_size_normalized - freespace_reverse)
            ))

            if (freespace_direct >= list_size_normalized || freespace_direct >= freespace_reverse) {
                params.reverse_set(false)

                axis_main.size_set(Math.min(freespace_direct, list_size_normalized))

                flow_reverse.position_set(null)
                flow_direct.position_set(position_direct)
            } else {
                params.reverse_set(true)

                axis_main.size_set(Math.min(freespace_reverse, list_size_normalized))

                flow_direct.position_set(null)
                flow_reverse.position_set(position_reverse)
            }

            break
        }
    }
}

export type UseListPosFixed_Return = {
    readonly api: ListPosApi_Api
    readonly size: ListPosApi_Size
    readonly reverse: ListPosApi_Reverse
    readonly position: ListPosApi_Position
}

export type UseListPosFixed_Params = {
    readonly ref_list: FnORefHTML
    readonly ref_content: FnORefHTML

    readonly clmap_content: PropClMap_DefContent

    readonly stretch?: PropStretch_Raw
}

export const useListPosApiFixed = function(params: UseListPosFixed_Params): UseListPosFixed_Return {
    const nprop_stretch = prop_stretch_new(params.stretch)

    const ctxstate_refs = useCtxStateRefs()

    const [align_reverse, align_reverse_set] = r.useState(false)
    const [justify_reverse, justify_reverse_set] = r.useState(false)

    let [width, width_set] = r.useState<null | number>(null)
    let [height, height_set] = r.useState<null | number>(null)

    const [top, top_set] = r.useState<null | number>(null)
    const [left, left_set] = r.useState<null | number>(null)
    const [right, right_set] = r.useState<null | number>(null)
    const [bottom, bottom_set] = r.useState<null | number>(null)

    return {
        reverse: r.useMemo(() => ({
            align: align_reverse,
            justify: justify_reverse,
        }), [align_reverse, justify_reverse]),

        size: r.useMemo(() => ({
            width: width,
            height: height,
        }), [width, height]),

        position: r.useMemo(() => ({
            top,
            left,
            right,
            bottom,
        }), [top, left, right, bottom]),

        api: r.useMemo(() => ({
            clear: () => {
                align_reverse_set(false)
                justify_reverse_set(false)

                top_set(null)
                left_set(null)
                right_set(null)
                bottom_set(null)
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
                        list_size: content.offsetHeight,
                        screen_size: document.documentElement.clientHeight,
                        container_pos: container_rect.y,
                        container_size: container_rect.height,

                        size_set: height_set,

                        flow_direct: {
                            position_set: top_set
                        },

                        flow_reverse: {
                            position_set: bottom_set
                        },
                    }

                    const axis_cross: Normalize_Axis = {
                        list_size: content.offsetWidth,
                        screen_size: document.documentElement.clientWidth,
                        container_pos: container_rect.x,
                        container_size: container_rect.width,

                        size_set: width_set,

                        flow_direct: {
                            position_set: left_set
                        },

                        flow_reverse: {
                            position_set: right_set
                        },
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
                        stretch: nprop_stretch,
                        direction: config.direction,
                        reverse_set: align_reverse_set,
                    })

                    if (params.clmap_content._tracking) {
                        content.classList.remove(params.clmap_content._tracking)
                    }
                }
            },
        }), [ctxstate_refs.rootref, params.ref_list, params.ref_content, nprop_stretch])
    } as const
}
