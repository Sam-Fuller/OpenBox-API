//@ts-check

const messageSender = require("../messageSender")
const screens = require("./_screens")

function getName() {
    return "loginState"
}

/**@return {{
 players: {id: string, name: any, score: number}[],
 maxPlayers: number,

 name: String,
 lastActionTime: number,
 nextActionTime: number
}}*/ 
function initialState(currentState) {
    return {
        players: [],
        maxPlayers: 8,

        name: getName(),
        lastActionTime: Date.now(),
        nextActionTime: Date.now() + (1000 * 60 * 10),
    }
}

/**@param {{id: string, name: any, score: number}} [player]
 * {
 *  gameId: string,
 *  playerId: string,
 *
 *  game: string,
 *  state: string,
 *  screen: {"wait"},
 *
 *  maxPlayers: number,
 *
 *  players: {name: string, score: number}[]
 * }
*/
function sendState(response, game, player) {
    messageSender.sendResponse(response, {
        gameId: game._id,
        playerId: player.id,

        game: game.game,
        state: game.state.name,
        screen: screens.wait,

        maxPlayers: game.maxPlayers,
        
        players: game.state.players.map(p => ({name: p.name, score: p.score}))
    })
}

function isCompleted(state) {
    if (state.players.length === state.maxPlayers) return true;
    if (state.nextActionTime <= Date.now()) return true;

    return false;
}

function submit(state, playerId, content) {
    return {
        ...state
    }
}

module.exports = {
    getName,
    initialState,
    sendState,
    isCompleted,
    submit
}