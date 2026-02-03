import type { PropStretch, PropStretch_Raw } from "#src/util/prop/stretch/type/prop.js";

export const prop_stretch_new = function(raw: PropStretch_Raw): PropStretch {
    if (!raw) {
        return "none"
    }

    if (raw === true) {
        return "min"
    }

    return raw
}
