import type { FnSetterStateful } from "#src/type/setter.js"
import * as r from "react"

export type CmpCtxState_StateOpen = Readonly<{
    ref: r.RefObject<HTMLDivElement | null>
    open: boolean
    open_set: FnSetterStateful<boolean>
}>
