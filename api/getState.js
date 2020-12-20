//@ts-check

const messageSender = require("../messageSender")
const database = require("../database")
const getStateByName = require("../state/_getStateByName")
const destroyState = require("../state/destroyState")
const {interpretInitialState, interpretStateChange} = require("../game/gameInterpreter")

module.exports = function getState(request, response) {
    const headers = request.headers

    if (!headers.gameid) {
        messageSender.sendError(response, 400, {error: "No gameid"})
        return
    }
    if (!headers.playerid) {
        messageSender.sendError(response, 400, {error: "No playerid"})
        return
    }

    const gameId = headers.gameid
    const playerId = headers.playerid

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

        const players = gameInstance.state.players.filter(player => player.id === playerId)

        if (players.length <= 0) {
            messageSender.sendError(response, 404, {error: "Player not found"})
            return
        }

        const player = players[0]

        database.gameTemplate.findById(gameInstance.game, (err, game) => {
            if (err) {
                messageSender.sendError(response, 500, {error: "Internal Database Error"})
                return
            }
            if (!game) {
                messageSender.sendError(response, 404, {error: "Game Template not found"})
                return
            }

            let state = getStateByName(gameInstance.state.name)

            if (state === null) {
                messageSender.sendError(response, 500, {error: "Internal Server Error"})
                return
            }

            if (state.isCompleted(gameInstance.state)) {
                gameInstance.state = interpretStateChange(gameInstance.state, game)
                state = getStateByName(gameInstance.state.name)

                if (state === null) {
                    messageSender.sendError(response, 500, {error: "Internal Server Error"})
                    return
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
                            console.log({message: "Game changed state", ...gameInstance})
                        }
                    })
                }
            }

            state.sendState(response, gameInstance, player)
        })
    })
}