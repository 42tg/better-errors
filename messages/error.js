const RenderKid = require("renderkid")
const Path = require("path")
const r = new RenderKid()
const config = require("../config")
const { StackMatcher, StackFormatter } = require("./util/StackMatcher")
const SyntaxHighlighter = require("./util/SyntaxHighlighter")

r.style(require("./style/base.js"))

function error({ name, message, stack }) {
    const layout = [
        `<m2><bgRed> <yellow>${name}</yellow> </bgRed>  <yellow> ${message}</yellow>`,
    ]
    let betterStack = stack.split("\n")
    if (!config.internals) {
        betterStack = stack
            .split("\n")
            .filter(line => !line.includes("(internal/"))
    }
    betterStack = betterStack.slice(1) //always cut first line
    let finalStack = []
    if (
        name.includes("SyntaxError") ||
        name.includes("TypeError") ||
        name.includes("AssertionError")
    ) {
        const highlighted = SyntaxHighlighter({
            name,
            message,
            stack: betterStack,
        })
        finalStack = [...finalStack, ...highlighted]
        betterStack = betterStack.slice(highlighted.length + 1)
    }

    finalStack = [
        ...finalStack,
        ...betterStack.map(line => {
            const match = StackMatcher(line.trim())
            if (match) {
                return StackFormatter(line.trim(), match)
            } else return line
        }),
    ]

    return r.render([...layout, ...finalStack].join(`</br>`))
}

module.exports = error
