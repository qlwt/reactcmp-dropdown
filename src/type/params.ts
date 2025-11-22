export type Direction = (
    | "hor"
    | "ver"
)

export type Justify = (
    | "start"
    | "end"
)

export type Align = (
    | "start"
    | "center"
    | "end"
)

export type DirectionRaw = (
    | Direction
    | null
    | boolean
    | undefined
)

export type JustifyRaw = (
    | Justify
    | null
    | boolean
    | undefined
)

export type AlignRaw = (
    | Align
    | null
    | boolean
    | undefined
)
