import type { PropDirection, PropDirection_Raw } from "#src/util/prop/direction/type/prop.js"

export const prop_direction_new = function(raw: PropDirection_Raw): PropDirection {
    if (!raw) {
        return "ver"
    }

    if (raw === true) {
        return "hor"
    }

    return raw
}
