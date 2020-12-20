//@ts-check

const messageSender = require("../messageSender")
const screens = require("./_screens")

function getName() {
    return "resultsState"
}

/**@return {{
 players: {id: string, name: any, score: number}[],
 maxPlayers: number,

 name: String,
 lastActionTime: number,
 nextActionTime: number,

 results: String
}}*/ 
function initialState(currentState){
    return {
        players: currentState.players.slice(0),
        maxPlayers: currentState.maxPlayers,

        name: getName(),
        lastActionTime: Date.now(),
        nextActionTime: Date.now() + (1000000 * 5),
        
        results: null,
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
 *  players: {name: string, score: number}[]
 * }
*/
function sendState(response, game, player) {
    messageSender.sendResponse(response, {
        gameid: game._id,
        playerId: player.id,

        game: game.game,
        state: game.state.name,
        screens: screens.wait,

        results: game.state.results,

        players: game.state.players.map(p => ({name: p.name, score: p.score}))
    })
}

function isCompleted(state) {
    if (state.response !== null) return true;
    if (state.nextActionTime <= Date.now()) return true;

    return false;
}

function submit(state, playerId, content) {

}

module.exports = {
    getName,
    initialState,
    sendState,
    isCompleted,
    submit
}