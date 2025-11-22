import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import type { Align, AlignRaw, Direction, DirectionRaw, Justify, JustifyRaw } from "#src/type/params.js"
import type { FnSetterStateles } from "#src/type/setter.js"
import { cl } from "#src/util/cl.js"
import { nprop_align_new, nprop_direction_new, nprop_justify_new } from "#src/util/nprop/index.js"
import { stylemap_new_remap } from "#src/util/stylemap/new/remap.js"
import * as r from "react"

const stylemap = {
    listfix: "listfix",
    listfix_open: "listfix_open",
    listfix_justify_start: "listfix_justify_start",
    listfix_justify_end: "listfix_justify_end",
    listfix_align_start: "listfix_align_start",
    listfix_align_end: "listfix_align_end",
    listfix_align_center: "listfix_align_center",
    listfix_vertical: "listfix_vertical",
    listfix_horizontal: "listfix_horizontal",
} as const

export type CmpListFix_StyleModule = {
    [K in keyof typeof stylemap]?: string | null
}

type Normalize_Flow = Readonly<{
    position_set: FnSetterStateles<number | null>
}>

type Normalize_Axis = Readonly<{
    flow_direct: Normalize_Flow
    flow_reverse: Normalize_Flow
    space_set: FnSetterStateles<number | null>
    container_size: number
    container_pos: number
    screen_size: number
    list_size: number
}>

type NormalizeJustify_Params = Readonly<{
    gap: number
    justify: Justify
    direction: Direction
    reverse_align_set: FnSetterStateles<boolean>
    reverse_justify_set: FnSetterStateles<boolean>

    axis_main: Normalize_Axis
    axis_cross: Normalize_Axis
}>

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

    if (freespace_direct >= axis_main.list_size) {
        params.reverse_justify_set(false)
        axis_main.space_set(null)
        flow_direct.position_set(position_direct)
        flow_reverse.position_set(null)
    } else if (freespace_reverse >= axis_main.list_size) {
        params.reverse_justify_set(true)
        axis_main.space_set(null)
        flow_direct.position_set(null)
        flow_reverse.position_set(position_reverse)
    } else if (freespace_direct >= freespace_reverse) {
        params.reverse_justify_set(false)
        axis_main.space_set(freespace_direct)
        flow_direct.position_set(position_direct)
        flow_reverse.position_set(null)
    } else {
        params.reverse_justify_set(true)
        axis_main.space_set(freespace_reverse)
        flow_direct.position_set(null)
        flow_reverse.position_set(position_reverse)
    }
}

type NormalizeAlign_Params = Readonly<{
    align: Align
    direction: Direction
    reverse_align_set: FnSetterStateles<boolean>
    reverse_justify_set: FnSetterStateles<boolean>

    axis_main: Normalize_Axis
    axis_cross: Normalize_Axis
}>

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

    axis_main.space_set(null)

    switch (params.align) {
        case "center": {
            const offset = (axis_main.list_size - axis_main.container_size) / 2

            params.reverse_align_set(false)
            axis_main.flow_reverse.position_set(null)
            axis_main.flow_direct.position_set(Math.max(0, axis_main.container_pos - offset))

            break
        }
        case "start": {
            const freespace_direct = axis_main.screen_size - axis_main.container_pos
            const freespace_reverse = axis_main.container_pos + axis_main.container_size

            const flow_direct = axis_main.flow_direct
            const flow_reverse = axis_main.flow_reverse

            const position_direct = Math.max(0, (
                + axis_main.container_pos
                - Math.max(0, axis_main.list_size - freespace_direct)
            ))

            const position_reverse = Math.max(0, (
                + axis_main.screen_size
                - (axis_main.container_pos + axis_main.container_size)
                - Math.max(0, axis_main.list_size - freespace_reverse)
            ))

            if (freespace_direct >= axis_main.list_size || freespace_direct >= freespace_reverse) {
                params.reverse_align_set(false)

                flow_reverse.position_set(null)
                flow_direct.position_set(position_direct)
            } else {
                params.reverse_align_set(true)

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
                - Math.max(0, axis_main.list_size - freespace_direct)
            ))

            const position_reverse = Math.max(0, (
                + axis_main.container_pos
                - Math.max(0, axis_main.list_size - freespace_reverse)
            ))

            if (freespace_direct >= axis_main.list_size || freespace_direct >= freespace_reverse) {
                params.reverse_align_set(false)

                flow_reverse.position_set(null)
                flow_direct.position_set(position_direct)
            } else {
                params.reverse_align_set(true)

                flow_direct.position_set(null)
                flow_reverse.position_set(position_reverse)
            }

            break
        }
    }
}

export type CmpListFix_Props = Readonly<{
    gap?: number
    lazy?: boolean
    align?: AlignRaw
    justify?: JustifyRaw
    direction?: DirectionRaw

    className?: string
    stylemodule?: CmpListFix_StyleModule
    children?: r.ReactNode | (() => r.ReactNode)
}>

export const CmpListFix = r.memo(r.forwardRef<HTMLDivElement, CmpListFix_Props>((props, ref) => {
    const nprop_gap = props.gap ?? 0
    const nprop_lazy = props.lazy ?? false
    const nprop_align = nprop_align_new(props.align)
    const nprop_justify = nprop_justify_new(props.justify)
    const nprop_direction = nprop_direction_new(props.direction)
    const nprop_style = r.useMemo(() => (
        props.stylemodule ? stylemap_new_remap(stylemap, props.stylemodule) : stylemap
    ), [props.stylemodule])

    const ctxstate = r.useContext(CmpCtxState_Open)

    if (!ctxstate) { throw new Error(`Using DDN dependend component outside of DDN Context`) }

    const l_ref = r.useRef<HTMLDivElement | null>(null)

    const [visible, visible_set] = r.useState(false)
    const [revalign, revalign_set] = r.useState(false)
    const [revjustify, revjustify_set] = r.useState(false)
    const [maxheight, maxheight_set] = r.useState<null | number>(null)
    const [maxwidth, maxwidth_set] = r.useState<null | number>(null)

    const [top, top_set] = r.useState<null | number>(null)
    const [left, left_set] = r.useState<null | number>(null)
    const [right, right_set] = r.useState<null | number>(null)
    const [bottom, bottom_set] = r.useState<null | number>(null)

    r.useLayoutEffect(() => {
        const list = l_ref.current
        const container = ctxstate.ref.current

        if (list && container && ctxstate.open) {
            const container_rect = container.getBoundingClientRect()

            const axis_main: Normalize_Axis = {
                list_size: list.offsetHeight,
                space_set: maxheight_set,
                screen_size: document.documentElement.clientHeight,
                container_pos: container_rect.y,
                container_size: container_rect.height,

                flow_direct: {
                    position_set: top_set
                },

                flow_reverse: {
                    position_set: bottom_set
                },
            }

            const axis_cross: Normalize_Axis = {
                list_size: list.offsetWidth,
                space_set: maxwidth_set,
                screen_size: document.documentElement.clientWidth,
                container_pos: container_rect.x,
                container_size: container_rect.width,

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
                gap: nprop_gap,
                justify: nprop_justify,
                direction: nprop_direction,
                reverse_align_set: revalign_set,
                reverse_justify_set: revjustify_set,
            })

            normalize_align({
                axis_main,
                axis_cross,
                align: nprop_align,
                direction: nprop_direction,
                reverse_align_set: revalign_set,
                reverse_justify_set: revjustify_set,
            })
        }
    }, [ctxstate.open, ctxstate.ref, nprop_gap, nprop_align, nprop_justify, nprop_direction])

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

    const children = r.useMemo(() => {
        if (!nprop_lazy || visible || ctxstate.open) {
            if (typeof props.children === "function") {
                return props.children()
            }

            return props.children
        }

        return null
    }, [nprop_lazy, visible, ctxstate.open, props.children])

    return <div
        ref={mref}

        className={cl(
            "__qyuddn",
            props.className,
            nprop_style.listfix,
            ctxstate.open && nprop_style.listfix_open,
            ((nprop_align === "end" && !revalign) || (nprop_align === "start" && revalign)) && nprop_style.listfix_align_end,
            ((nprop_align === "start" && !revalign) || (nprop_align === "end" && revalign)) && nprop_style.listfix_align_start,
            nprop_align === "center" && nprop_style.listfix_align_center,
            ((nprop_justify === "end") !== revjustify) && nprop_style.listfix_justify_end,
            ((nprop_justify === "start") !== revjustify) && nprop_style.listfix_justify_start,
            nprop_direction === "hor" && nprop_style.listfix_horizontal,
            nprop_direction === "ver" && nprop_style.listfix_vertical,
        )}

        style={{
            ["--gap"]: `${nprop_gap}px`,

            top: top !== null ? `${top}px` : null,
            left: left !== null ? `${left}px` : null,
            right: right !== null ? `${right}px` : null,
            bottom: bottom !== null ? `${bottom}px` : null,
            maxWidth: maxwidth === null ? undefined : `${maxwidth}px`,
            maxHeight: maxheight === null ? undefined : `${maxheight}px`,
        } as r.CSSProperties}

        onTransitionStart={ev => {
            if (ev.propertyName === "opacity" && ctxstate.open) {
                visible_set(true)
            }
        }}

        onTransitionEnd={ev => {
            if (ev.propertyName === "opacity" && !ctxstate.open) {
                revalign_set(false)
                revjustify_set(false)
                maxwidth_set(null)
                maxheight_set(null)
                visible_set(false)

                top_set(null)
                bottom_set(null)
                left_set(null)
                right_set(null)
            }
        }}
    >
        {children}
    </div>
}))

export default CmpListFix
