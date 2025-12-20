import type { Align, AlignRaw, Direction, DirectionRaw, Justify, JustifyRaw } from "#src/type/params.js"

export const nprop_align_new = function(raw: AlignRaw): Align {
    if (!raw) {
        return "start"
    }

    if (raw === true) {
        return "end"
    }

    return raw
}

export const nprop_justify_new = function(raw: JustifyRaw): Justify {
    if (!raw) {
        return "end"
    }

    if (raw === true) {
        return "start"
    }

    return raw
}

export const nprop_direction_new = function(raw: DirectionRaw): Direction {
    if (!raw) {
        return "ver"
    }

    if (raw === true) {
        return "hor"
    }

    return raw
}

export const nprop_portal_new = function(portal: string | HTMLElement | undefined | null): HTMLElement | null {
    if (typeof portal === "string") {
        return document.getElementById(portal) ?? null
    }

    if (portal) {
        return portal
    }

    return null
}
