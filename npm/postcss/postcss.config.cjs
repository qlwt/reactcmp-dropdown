module.exports = {
    plugins: [
        require("postcss-prefix-selector")({
            prefix: ".__qyuddn",
            transform: (prefix, selector) => {
                return `${prefix}${selector}`
            }
        })
    ],
}
