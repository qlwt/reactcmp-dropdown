import type { PropAlign } from "#src/util/prop/align/type/prop.js"

export const prop_align_new_reversed = function(src_align: PropAlign): PropAlign {
    switch (src_align) {
        case "start":
            return "end"
        case "end":
            return "start"
    }

    return src_align
}
