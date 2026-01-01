import type { CmpCtxState_StateRefs } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export const CmpCtxState_Refs = r.createContext<null | CmpCtxState_StateRefs>(null)
