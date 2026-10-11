import type { PropPortal, PropPortal_Raw } from "#src/util/prop/portal/type/prop.js"

export const prop_portal_new = function(portal: PropPortal_Raw): PropPortal {
    if (typeof portal === "string") {
        if (typeof document !== "undefined") {
            return document.getElementById(portal) ?? null
        }

        return null
    }

    if (portal) {
        return portal
    }

    return null
}
