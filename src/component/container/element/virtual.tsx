import { CmpCtxState_Config } from "#src/component/ctx-state/element/config.js"
import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import { CmpCtxState_Refs } from "#src/component/ctx-state/element/refs.js"
import { useCtxStateInitConfig } from "#src/component/ctx-state/hook/init/config.js"
import { useCtxStateInitOpen } from "#src/component/ctx-state/hook/init/open.js"
import { useCtxStateInitRefs } from "#src/component/ctx-state/hook/init/refs.js"
import { useCloseEvtRoot } from "#src/hook/closeevt/root.js"
import type { FnSetterStateful } from "#src/type/setter.js"
import type { CloseEvt_ConfigFull } from "#src/util/closeevt/type/config.js"
import type { Focus_Config } from "#src/util/focus/config/type/config.js"
import * as r from "react"

export type CmpContainerVirtual_Props = {
    readonly open?: boolean
    readonly open_set?: FnSetterStateful<boolean>

    readonly className?: string
    readonly children?: r.ReactNode
    readonly focus?: Partial<Focus_Config>
    readonly closeevt?: Partial<CloseEvt_ConfigFull>
}

export const CmpContainerVirtual = r.memo<CmpContainerVirtual_Props>((props) => {
    const ctxstate_open = useCtxStateInitOpen({
        open: props.open,
        open_set: props.open_set,
    })

    const ctxstate_refs = useCtxStateInitRefs({
        container_real: false,
    })

    const ctxstate_config = useCtxStateInitConfig({
        focus: props.focus,
        closeevt: props.closeevt,
    })

    useCloseEvtRoot({
        active: true,

        ctxstate_refs,
        ctxstate_open,
        ctxstate_config,
    })

    return <CmpCtxState_Config.Provider value={ctxstate_config}>
        <CmpCtxState_Open.Provider value={ctxstate_open}>
            <CmpCtxState_Refs.Provider value={ctxstate_refs}>
                {props.children}
            </CmpCtxState_Refs.Provider>
        </CmpCtxState_Open.Provider>
    </CmpCtxState_Config.Provider>
})
