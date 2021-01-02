//@ts-check
const messageSender = require("../messageSender")

module.exports = function create(request, response) {
    const body = request.body

    if (!body.gamecode) {
        messageSender.sendError(response, 400, {error: "No gamecode"})
        return
    }
    if (!body.playername) {
        messageSender.sendError(response, 400, {error: "No playername"})
        return
    }

    /**@type {string}*/
    const gameCode = body.gamecode
    /**@type {string}*/
    const playerName = body.playername
}