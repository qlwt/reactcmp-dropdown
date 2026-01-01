import type { CmpCtxState_StateConfig } from "#src/component/ctx-state/type/state.js";
import type { CloseEvt_ConfigFull } from "#src/util/closeevt/type/config.js";
import type { Focus_Config } from "#src/util/focus/config/type/config.js";
import * as r from "react";

export type UseCtxStateInitConfig_Params = {
    readonly focus?: Partial<Focus_Config>
    readonly closeevt?: Partial<CloseEvt_ConfigFull>
}

export const useCtxStateInitConfig = function(params: UseCtxStateInitConfig_Params): CmpCtxState_StateConfig {
    const nprop_focus = r.useMemo(() => params.focus ?? {}, [params.focus])
    const nprop_closeevt = r.useMemo(() => params.closeevt ?? {}, [params.closeevt])

    return r.useMemo(() => {
        return {
            focus: nprop_focus,
            closeevt: nprop_closeevt,
        }
    }, [nprop_closeevt, nprop_focus])
}
