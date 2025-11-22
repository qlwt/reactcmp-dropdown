import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import type { Align, AlignRaw, Direction, DirectionRaw, Justify, JustifyRaw } from "#src/type/params.js"
import type { FnSetterStateles } from "#src/type/setter.js"
import { cl } from "#src/util/cl.js"
import { nprop_align_new, nprop_direction_new, nprop_justify_new } from "#src/util/nprop/index.js"
import { stylemap_new_remap } from "#src/util/stylemap/new/remap.js"
import * as r from "react"

const stylemap = {
    listabs: "listabs",
    listabs_open: "listabs_open",
    listabs_justify_start: "listabs_justify_start",
    listabs_justify_end: "listabs_justify_end",
    listabs_align_start: "listabs_align_start",
    listabs_align_end: "listabs_align_end",
    listabs_align_center: "listabs_align_center",
    listabs_vertical: "listabs_vertical",
    listabs_horizontal: "listabs_horizontal",
} as const

export type CmpListAbs_StyleModule = {
    [K in keyof typeof stylemap]?: string | null
}

type Normalize_Axis = Readonly<{
    space_set: FnSetterStateles<number | null>
    container_size: number
    container_pos: number
    screen_size: number
    list_size: number
}>

type NormalizeJusitfy_Params = Readonly<{
    gap: number
    justify: Justify
    direction: Direction
    reverse_align_set: FnSetterStateles<boolean>
    reverse_justify_set: FnSetterStateles<boolean>

    axis_main: Normalize_Axis
    axis_cross: Normalize_Axis
}>

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

    if (freespace_direct >= axis_main.list_size) {
        params.reverse_justify_set(false)
        axis_main.space_set(null)
    } else if (freespace_reverse >= axis_main.list_size) {
        params.reverse_justify_set(true)
        axis_main.space_set(null)
    } else if (freespace_direct >= freespace_reverse) {
        params.reverse_justify_set(false)
        axis_main.space_set(freespace_direct)
    } else {
        params.reverse_justify_set(true)
        axis_main.space_set(freespace_reverse)
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

    let freespace_direct
    let freespace_reverse

    switch (params.align) {
        case "center": {
            params.reverse_align_set(false)
            axis_main.space_set(null)

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

    if (freespace_direct >= axis_main.list_size) {
        params.reverse_align_set(false)
        axis_main.space_set(null)
    } else if (freespace_reverse >= axis_main.list_size) {
        params.reverse_align_set(true)
        axis_main.space_set(null)
    } else if (freespace_direct >= freespace_reverse) {
        params.reverse_align_set(false)
        axis_main.space_set(freespace_direct)
    } else {
        params.reverse_align_set(true)
        axis_main.space_set(freespace_reverse)
    }
}

export type CmpListAbs_Props = Readonly<{
    gap?: number
    lazy?: boolean
    align?: AlignRaw
    justify?: JustifyRaw
    direction?: DirectionRaw

    className?: string
    stylemodule?: CmpListAbs_StyleModule
    children?: r.ReactNode | (() => r.ReactNode)
}>

export const CmpListAbs = r.memo(r.forwardRef<HTMLDivElement, CmpListAbs_Props>((props, ref) => {
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
            }

            const axis_cross: Normalize_Axis = {
                list_size: list.offsetWidth,
                space_set: maxwidth_set,
                screen_size: document.documentElement.clientWidth,
                container_pos: container_rect.x,
                container_size: container_rect.width,
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
            nprop_style.listabs,
            ctxstate.open && nprop_style.listabs_open,
            ((nprop_align === "end" && !revalign) || (nprop_align === "start" && revalign)) && nprop_style.listabs_align_end,
            ((nprop_align === "start" && !revalign) || (nprop_align === "end" && revalign)) && nprop_style.listabs_align_start,
            nprop_align === "center" && nprop_style.listabs_align_center,
            ((nprop_justify === "end") !== revjustify) && nprop_style.listabs_justify_end,
            ((nprop_justify === "start") !== revjustify) && nprop_style.listabs_justify_start,
            nprop_direction === "hor" && nprop_style.listabs_horizontal,
            nprop_direction === "ver" && nprop_style.listabs_vertical,
        )}

        style={{
            ["--gap"]: `${nprop_gap}px`,

            maxWidth: maxwidth === null ? undefined : `${maxwidth}px`,
            maxHeight: maxheight === null ? undefined : `${maxheight}px`,
        } as r.CSSProperties}

        onTransitionStart={ev => {
            if (ev.nativeEvent.propertyName === "opacity" && ctxstate.open) {
                visible_set(true)
            }
        }}

        onTransitionEnd={ev => {
            if (ev.nativeEvent.propertyName === "opacity" && !ctxstate.open) {
                revalign_set(false)
                revjustify_set(false)
                maxwidth_set(null)
                maxheight_set(null)
                visible_set(false)
            }
        }}
    >
        {children}
    </div>
}))

export default CmpListAbs
