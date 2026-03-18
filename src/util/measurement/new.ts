export type Measurement_New_Kind = (
    | "offset"
    | "precise"
)

export type Measurement_New_Config = {
    readonly kind: Measurement_New_Kind
}

export type Measurement_New_Result = {
    readonly width: number
    readonly height: number
}

export const measurement_new = function(element: HTMLElement, config: Measurement_New_Config): Measurement_New_Result {
    switch (config.kind) {
        case "offset": {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight,
            }
        }
        case "precise": {
            const rect = element.getBoundingClientRect()

            return {
                width: rect.width,
                height: rect.height,
            }
        }
    }
}
