import type { CmpCtxState_StateContent } from "#src/component/ctx-state/type/state.js"
import * as r from "react"

export const CmpCtxState_Content = r.createContext<null | CmpCtxState_StateContent>(null)
