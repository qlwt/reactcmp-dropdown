import type { PropAlign, PropAlign_Raw } from "#src/util/prop/align/type/prop.js"

export const prop_align_new = function(raw: PropAlign_Raw): PropAlign {
    if (!raw) {
        return "start"
    }

    if (raw === true) {
        return "end"
    }

    return raw
}
