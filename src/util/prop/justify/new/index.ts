import type { PropJustify, PropJustify_Raw } from "#src/util/prop/justify/type/prop.js"

export const prop_justify_new = function(raw: PropJustify_Raw): PropJustify {
    if (!raw) {
        return "end"
    }

    if (raw === true) {
        return "start"
    }

    return raw
}
