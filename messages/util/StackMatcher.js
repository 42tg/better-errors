const path = require("path")
const chrome = /^\s*at (.+)? ?\((.*):(\d+)(?::(\d+))\)\s*$/i

const matches = string => chrome.exec(string)

const format = (string, matches) => {
    string = `<m2><m2>at <green>${matches[1]}</green> (${path.resolve(
        process.cwd(),
        matches[2],
    )}:<magenta>${matches[3]}</magenta>:<dMagenta>${matches[4]}</dMagenta>)`
    return `<grey>${string}</grey>`
}

module.exports = {
    StackMatcher: matches,
    StackFormatter: format,
}
