const error = require("../messages/error")

process.on("uncaughtException", e => {
    console.error(error(e))
})
process.on("unhandledRejection", e => {
    console.error(error(e))
})
const broken = require("./brokenImport")
function a() {
    const test = "string"
    function b() {
        throw new Error("this should happen!")
    }
    b()
}
a()
