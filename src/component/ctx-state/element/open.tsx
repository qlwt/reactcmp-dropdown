import type { CmpCtxState_StateOpen } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export const CmpCtxState_Open = r.createContext<null | CmpCtxState_StateOpen>(null)
