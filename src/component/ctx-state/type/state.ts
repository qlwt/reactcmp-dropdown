import type { FnORefHTML } from "#src/type/fnref.js"
import type { FnSetterStateful } from "#src/type/setter.js"
import type { CloseEvt_ConfigFull } from "#src/util/closeevt/type/config.js"
import type { Focus_Config } from "#src/util/focus/config/type/config.js"
import type * as r from "react"

export type CmpCtxState_StateOpen = {
    readonly open_local: boolean
    readonly open_inherited: boolean
    readonly open_set: FnSetterStateful<boolean>
}

export type CmpCtxState_StateRefs_CascadeApi = {
    readonly increment: VoidFunction
    readonly decrement: VoidFunction
}

export type CmpCtxState_StateRefs_Register = {
    readonly it_up: Iterable<FnORefHTML>
    readonly it_down: Iterable<FnORefHTML>
    readonly it_full: Iterable<FnORefHTML>
    readonly it_local: Iterable<FnORefHTML>
    readonly it_context: Iterable<FnORefHTML>
    readonly add_own: (ref: FnORefHTML) => void
    readonly delete_own: (ref: FnORefHTML) => void
    readonly add_down: (ref: FnORefHTML) => void
    readonly delete_down: (ref: FnORefHTML) => void
}

export type CmpCtxState_StateRefs = {
    readonly rootref: ReadonlySet<FnORefHTML>
    readonly rootref_set: FnSetterStateful<ReadonlySet<FnORefHTML>>

    readonly cascade: number
    readonly cascade_api: CmpCtxState_StateRefs_CascadeApi

    readonly container_real: boolean
    readonly register: CmpCtxState_StateRefs_Register
    readonly shardevt_scroll: Set<(event: Event) => void>
}

export type CmpCtxState_StateConfig = {
    readonly focus: Partial<Focus_Config>
    readonly closeevt: Partial<CloseEvt_ConfigFull>
}

export type CmpCtxState_StateContent = {
    readonly ref_content: r.RefObject<HTMLElement | null>
}
