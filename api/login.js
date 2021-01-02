//@ts-check

const messageSender = require("../messageSender")
const database = require("../database")
const getStateByName = require("../state/_getStateByName")
const destroyState = require("../state/destroyState")
const {interpretInitialState, interpretStateChange} = require("../template/templateInterpreter")

const timeNumbersInPlayerId = 4
const randomNumbersInPlayerId = 4;

module.exports = function login(request, response) {
    const headers = request.headers
    const body = request.body

    if (!headers.gameid) {
        messageSender.sendError(response, 400, {error: "No gameid"})
        return
    }
    if (!body.playername) {
        messageSender.sendError(response, 400, {error: "No playername"})
        return
    }

    const gameId = headers.gameid
    const playerName = body.playername

    database.gameInstance.findById(gameId, 
        /** @param {{_doc: {_id: String, game: String, state: any}}} [gameRecord]*/
        (err, gameRecord) => {

            if (err) {
                messageSender.sendError(response, 500, {error: "Internal Database Error"})
                return
            }
            if (!gameRecord) {
                messageSender.sendError(response, 404, {error: "Game Instance not found"})
                return
            }

            /**@type {{
             _id: String,
                game: String,
                state: {
                    players: any[],
                    maxPlayers: number,
                
                    name: String
                    lastActionTime: number,
                    nextActionTime: number,

                    [x: string]: any
                }
            }}*/
            const gameInstance = gameRecord._doc
            const otherPlayerNames = gameInstance.state.players.map(player => player.name)

            if (otherPlayerNames.includes(playerName)) {
                messageSender.sendError(response, 400, {error: "Duplicate playername"})
                return
            }

            const player = {
                id: (Date.now()%(Math.pow(36,timeNumbersInPlayerId))).toString(36).toUpperCase() + "" + Math.floor(Math.random() * Math.pow(36,randomNumbersInPlayerId)).toString(36).toUpperCase(),
                name: playerName,
                score: 0
            }

            database.gameTemplate.findById(gameInstance.game, (err, game) => {
                if (game === null) {
                    messageSender.sendError(response, 404, {error: "Game instance not found"})
                    return
                }

                let state = getStateByName(gameInstance.state.name)

                if (state === null) {
                    messageSender.sendError(response, 500, {error: "Internal Server Error"})
                    return
                }

                gameInstance.state.players.push(player)

                if (state.isCompleted(gameInstance.state)) {
                    gameInstance.state = interpretStateChange(gameInstance.state, game)
                    state = getStateByName(gameInstance.state.name)
                }

                if (destroyState.getName() === gameInstance.state.name) {
                    database.gameInstance.findByIdAndDelete(gameInstance._id, (err, gameInstance) => {
                        if (err) {
                            messageSender.sendError(response, 500, {error: "Internal Database Error"})
                            return
                        }

                        console.log({message: "Game destroyed", ...gameInstance})
                    })

                } else {
                    database.gameInstance.findByIdAndUpdate(
                        {_id: gameInstance._id},
                        {state: gameInstance.state},
                        (err, updatedGame) => {
                        if (err) {
                            messageSender.sendError(response, 500, {error: "Internal Database Error"})
                            return
                        }
                        else {
                            console.log({message: "Player logged in", ...gameInstance})
                        }
                    })
                }

                state.sendState(response, gameInstance, player)
            }
        )
    })
}