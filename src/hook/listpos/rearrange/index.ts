import { useCtxStateRefs } from "#src/component/ctx-state/hook/view/refs.js";
import type { ListPosRearrange_Config } from "#src/hook/listpos/rearrange/type/config.js";
import type { ListPosApi_Api, ListPosApi_Config } from "#src/hook/listpos/api/type/api.js";
import * as r from "react"

export type UseListPosRearrange_Params = {
    readonly open: boolean
    readonly active: boolean
    readonly api: ListPosApi_Api
    readonly api_config: ListPosApi_Config
    readonly rearrange_config?: Partial<ListPosRearrange_Config>
}

export const useListPosRearrange = function(params: UseListPosRearrange_Params): void {
    const nprop_rearrange_open = params.rearrange_config?.open ?? true
    const nprop_rearrange_scroll = params.rearrange_config?.scroll ?? true
    const nprop_rearrange_resize = params.rearrange_config?.resize ?? true
    const nprop_rearrange_polling = params.rearrange_config?.polling ?? false

    const ctxstate_refs = useCtxStateRefs()

    const rearrange = r.useCallback(() => {
        params.api.rearrange(params.api_config)
    }, [
        params.api,
        params.api_config.gap,
        params.api_config.align,
        params.api_config.justify,
        params.api_config.direction,
    ])

    r.useLayoutEffect(() => {
        if (params.rearrange_config?.deps && params.open) {
            rearrange()
        }
    }, [...params.rearrange_config?.deps ?? []])

    r.useLayoutEffect(() => {
        if (nprop_rearrange_open && params.open) {
            rearrange()
        }
    }, [rearrange, params.open])

    r.useLayoutEffect((): VoidFunction | void => {
        if (nprop_rearrange_resize && params.active) {
            document.addEventListener("resize", rearrange)

            return () => {
                document.addEventListener("resize", rearrange)
            }
        }
    }, [rearrange, params.active, nprop_rearrange_resize])

    r.useLayoutEffect((): VoidFunction | void => {
        if (nprop_rearrange_scroll && params.active) {
            ctxstate_refs.shardevt_scroll.add(rearrange)

            return () => {
                ctxstate_refs.shardevt_scroll.delete(rearrange)
            }
        }
    }, [rearrange, params.active, nprop_rearrange_scroll])

    r.useLayoutEffect((): VoidFunction | void => {
        if (nprop_rearrange_polling && params.active) {
            let frame_id: number
            
            const frame_cb = () => {
                rearrange()

                frame_id = requestAnimationFrame(frame_cb)
            }

            requestAnimationFrame(frame_cb)

            return () => {
                cancelAnimationFrame(frame_id)
            }
        }
    }, [rearrange, params.active, nprop_rearrange_polling, ctxstate_refs])
}
