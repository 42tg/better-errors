const { highlight, highlightFileSync } = require("cardinal")

console.log()

function SyntaxHighlighter(error) {
    const code = error.stack.slice(
        0,
        error.stack.findIndex((line, i) =>
            line.includes(error.message) ? i : null,
        ),
    )

    const syntax = code
        .map(line => {
            try {
                return highlight(line).replace(/\s/g, "<m1>")
            } catch (e) {
                return line
            }
        })
        .map(line => `<m2>${line}`)

    return syntax
}
module.exports = SyntaxHighlighter
