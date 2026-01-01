import type { CmpCtxState_StateConfig } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export const CmpCtxState_Config = r.createContext<null | CmpCtxState_StateConfig>(null)
