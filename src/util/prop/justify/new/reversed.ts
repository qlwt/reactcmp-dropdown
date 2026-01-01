import type { PropJustify } from "#src/util/prop/justify/type/prop.js"

export const prop_justify_new_reversed = function(src_justify: PropJustify): PropJustify {
    switch (src_justify) {
        case "start":
            return "end"
        case "end":
            return "start"
    }

    return src_justify
}
