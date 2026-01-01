export type CloseEvt_KeysShard = (
    | "scroll"
)

export type CloseEvt_KeysRoot = (
    | "blur"
    | "click"
    | "escape"
    | "resize"
)

export type CloseEvt_ConfigShard = {
    readonly [K in CloseEvt_KeysShard]: boolean
}

export type CloseEvt_ConfigRoot = {
    readonly [K in CloseEvt_KeysRoot]: boolean
}

export type CloseEvt_ConfigFull = {
    readonly [K in CloseEvt_KeysRoot | CloseEvt_KeysShard]: boolean
}
