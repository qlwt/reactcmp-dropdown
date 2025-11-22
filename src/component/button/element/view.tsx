import { CmpCtxState_Open } from "#src/component/ctx-state/element/open.js"
import * as r from "react"

export type Cmp_Button_Props = Readonly<{
    className?: string
    children?: r.ReactNode
}>

export const CmpButton: r.FC<Cmp_Button_Props> = props => {
    const ctxstate = r.useContext(CmpCtxState_Open)

    if (!ctxstate) { throw new Error(`Using DropdownStateOpen dependend component outside of DropdownStateOpen Context`) }

    const event_click = r.useCallback(() => {
        ctxstate.open_set(t => !t)
    }, [])

    return <button
        onClick={event_click}
        className={props.className}
    >
        {props.children}
    </button>
}

export default CmpButton
