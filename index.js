const error = require("./messages/error")

process.on("uncaughtException", e => {
    console.log(error(e))
})
process.on("unhandledRejection", e => {
    console.log(error(e))
})
const broken = require("./tests/brokenImport")
function a() {
    const test = "string"
    function b() {
        throw new Error("this should happen!")
    }
    b()
}
a()
