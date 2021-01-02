//@ts-check

const messageSender = require("../messageSender")
const database = require("../database")
const getStateByName = require("../state/_getStateByName")
const destroyState = require("../state/destroyState")
const {interpretInitialState, interpretStateChange} = require("../template/templateInterpreter")

const fs = require("fs")

const timeNumbersInGameId = 4
const randomNumbersInGameId = 0;

const timeNumbersInPlayerId = 4
const randomNumbersInPlayerId = 4;

module.exports = function createGame(request, response) {
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

    database.gameTemplate.findById(gameCode,
        /** @param {{_doc: object}} [gameTemplate]*/
        (err, gameTemplate) => {
            if (err) {
                messageSender.sendError(response, 500, {error: "Internal Database Error"})
                return
            }
            if (!gameTemplate) {
                messageSender.sendError(response, 400, {error: "Invalid gamecode"})
                return
            }

            let game = gameTemplate._doc

            const id = (Date.now()%(Math.pow(36,timeNumbersInGameId))).toString(36).toUpperCase() //+ "" + Math.floor(Math.random() * randomNumbersInGameId).toString(36).toUpperCase()
        
            const initialGameState = {
                _id: id,
                game: gameCode,
                state: interpretInitialState(game)
            }

            const playerID = (Date.now() % Math.pow(36, timeNumbersInPlayerId))
                    .toString(36)
                    .toUpperCase() 
                + ""
                + Math.floor(Math.random() * Math.pow(36, randomNumbersInPlayerId))
                    .toString(36)
                    .toUpperCase()
            
            const player = {
                id: playerID,
                name: playerName,
                score: 0
            }

            initialGameState.state.players.push(player)
        
            if (destroyState.getName() !== initialGameState.state.name) {
                new database.gameInstance(initialGameState).save((err, createdGame) => {
                    if (err) {
                        messageSender.sendError(response, 500, {error: "Internal Database Error"})
                        return
                    }
                    else {
                        console.log({message: "Created new game", ...initialGameState})
                        const state = getStateByName(initialGameState.state.name)
        
                        if (state === null) {
                            messageSender.sendError(response, 500, {error: "Internal Server Error"})
                            return
                        }
        
                        state.sendState(response, initialGameState, player)
                    }
                }
            )
        }
    })
}