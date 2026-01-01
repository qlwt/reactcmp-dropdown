import type { PropClMap } from "#src/util/prop/clmap/type/prop.js"

export type PropClMap_DefListFix = PropClMap<keyof typeof prop_clmap_def_listfix>

export const prop_clmap_def_listfix = {
    __qyuddn: "__qyuddn",
    listfix: "listfix",
    _transition_nopos: "_transition_nopos",
    _transition_nosize: "_transition_nosize",
    _open: "_open",
    _justify_start: "_justify_start",
    _justify_end: "_justify_end",
    _align_start: "_align_start",
    _align_end: "_align_end",
    _align_center: "_align_center",
    _vertical: "_vertical",
    _horizontal: "_horizontal",
} as const
