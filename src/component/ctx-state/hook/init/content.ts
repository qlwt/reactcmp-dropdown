import type { CmpCtxState_StateContent } from "#src/component/ctx-state/type/state.js";
import * as r from "react";

export type UseCtxStateInitContent_Params = {
    readonly ref_content: r.RefObject<HTMLElement | null>
}

export const useCtxStateInitContent = function(params: UseCtxStateInitContent_Params): CmpCtxState_StateContent {
    return r.useMemo(() => {
        return {
            ref_content: params.ref_content,
        }
    }, [params.ref_content])
}
