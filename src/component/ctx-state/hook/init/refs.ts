import { CmpCtxState_Refs } from "#src/component/ctx-state/element/refs.js";
import type { CmpCtxState_StateRefs, CmpCtxState_StateRefs_CascadeApi, CmpCtxState_StateRefs_Register } from "#src/component/ctx-state/type/state.js";
import type { FnORefHTML } from "#src/type/fnref.js";
import * as r from "react";

const useCascade = function(): [number, CmpCtxState_StateRefs_CascadeApi] {
    const [cascade, cascade_set] = r.useState(0)
    const ctxstate_refs = r.useContext(CmpCtxState_Refs)

    return [
        cascade,
        r.useMemo(() => {
            return {
                increment: () => {
                    cascade_set(n => n + 1)
                    ctxstate_refs?.cascade_api?.increment()
                },

                decrement: () => {
                    cascade_set(n => n - 1)
                    ctxstate_refs?.cascade_api?.decrement()
                },
            }
        }, [ctxstate_refs?.cascade_api])
    ]
}

const useRegister = function(): CmpCtxState_StateRefs_Register {
    const ctxstate_refs = r.useContext(CmpCtxState_Refs)
    const l_register_local = r.useMemo(() => new Set<FnORefHTML>(), [])
    const l_register_down = r.useMemo(() => new Set<FnORefHTML>(), [])

    return r.useMemo(() => {
        return {
            add_own: ref => {
                l_register_local.add(ref)
                ctxstate_refs?.register.add_down(ref)
            },

            delete_own: ref => {
                l_register_local.delete(ref)
                ctxstate_refs?.register.delete_down(ref)
            },

            add_down: ref => {
                l_register_down.add(ref)
                ctxstate_refs?.register.add_down(ref)
            },

            delete_down: ref => {
                l_register_down.delete(ref)
                ctxstate_refs?.register.delete_down(ref)
            },

            it_full: {
                [Symbol.iterator]: function*() {
                    if (ctxstate_refs) {
                        yield* ctxstate_refs.register.it_up
                        yield* ctxstate_refs.register.it_context
                    }

                    yield* l_register_local
                    yield* l_register_down
                }
            },

            it_local: {
                [Symbol.iterator]: function*() {
                    yield* l_register_local
                }
            },

            it_up: {
                [Symbol.iterator]: function*() {
                    if (ctxstate_refs) {
                        yield* ctxstate_refs.register.it_up
                        yield* ctxstate_refs.register.it_context
                    }
                }
            },

            it_down: {
                [Symbol.iterator]: function*() {
                    yield* l_register_down
                }
            },

            it_context: {
                [Symbol.iterator]: function*() {
                    yield* l_register_local
                    yield* l_register_down
                }
            }
        }
    }, [ctxstate_refs?.register, l_register_local, l_register_down])
}

export type UseCtxStateInitRefs_Params = {
    readonly container_real: boolean
}

export const useCtxStateInitRefs = function(params: UseCtxStateInitRefs_Params): CmpCtxState_StateRefs {
    const register = useRegister()
    const [cascade, cascade_api] = useCascade()
    const [rootref, rootref_set] = r.useState(() => new Set() as ReadonlySet<FnORefHTML>)

    const shardevt_scroll = r.useMemo(() => new Set<(event: Event) => void>(), [])

    return r.useMemo(() => {
        return {
            register,
            container_real: params.container_real,

            shardevt_scroll,

            rootref,
            rootref_set,

            cascade,
            cascade_api,
        }
    }, [params.container_real, register, rootref, shardevt_scroll, cascade, cascade_api])
}
