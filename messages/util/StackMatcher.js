const path = require("path")
const chrome = /^\s*at (.+)? ?\((.*):(\d+)(?::(\d+))\)\s*$/i

const matches = string => chrome.exec(string)

const format = (string, matches) => {
    string = `<m2><m2>at <green>${matches[1]}</green> (${path.resolve(
        process.cwd(),
        matches[2],
    )}:<blue>${matches[3]}</blue>:<dBlue>${matches[4]}</dBlue>)`
    return `<grey>${string}</grey>`
}

module.exports = {
    StackMatcher: matches,
    StackFormatter: format,
}
