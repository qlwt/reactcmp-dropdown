import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js";
import type { CmpCtxState_StateOpen } from "#src/component/ctx-state/type/state.js";
import type { FnSetterStateful } from "#src/type/setter.js";
import * as r from "react";

export type UseCtxStateInitOpen_Params = {
    readonly open?: boolean
    readonly open_set?: FnSetterStateful<boolean>
}

export const useCtxStateInitOpen = function(params: UseCtxStateInitOpen_Params): CmpCtxState_StateOpen {
    const ctxstate_open = r.useContext(CmpCtxState_Open)

    const [l_open, l_open_set] = r.useState(false)

    const open = params.open ?? l_open
    const open_set = params.open_set ?? l_open_set

    return r.useMemo(() => {
        return {
            open_local: open,
            open_inherited: open && (ctxstate_open?.open_inherited ?? true),

            open_set
        }
    }, [open, open_set, ctxstate_open?.open_inherited])
}
