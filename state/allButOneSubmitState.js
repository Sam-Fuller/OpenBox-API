//@ts-check

const messageSender = require("../messageSender")
const screens = require("./_screens")

function getName() {
    return "allButOneSubmitState"
}

/**
 * @return {{
 players: {id: string, name: any, score: number}[],
 maxPlayers: number,

 name: String,
 lastActionTime: number,
 nextActionTime: number,

 notSubmittingPlayer: String,
 responses: {id: String, content: String}[]
}}*/
function initialState(currentState) {
    return {
        players: currentState.players.slice(0),
        maxPlayers: currentState.maxPlayers,

        name: getName(),
        lastActionTime: Date.now(),
        nextActionTime: Date.now() + (1000 * 60 * 10),

        notSubmittingPlayer: null,
        responses: []
    }
}

/**
 * @param {{id: string, name: any, score: number}} [player]
 * 
 * {
 *  gameId: string,
 *  playerId: string,
 *
 *  game: string,
 *  state: string,
 *  screen: {"wait" | "singleTextBox"},
 *
 *  submitted: {name: string}[],
 *
 *  notSubmittingPlayer: {name: string},
 *
 *  players: {name: string, score: number}[]
 * }
 */
function sendState(response, game, player) {
    const hasPlayerSubmitted = player.id === game.state.notSubmittingPlayer || game.state.responses.find(response => response.id === player.id) !== undefined
    const submitted = game.state.responses
        .map(response => game.state.players.find(player => player.id === response.id).name)
    const notSubmittingPlayer = game.state.players.find(player => player.id === game.state.notSubmittingPlayer).name

    messageSender.sendResponse(response, {
        gameid: game._id,
        playerId: player.id,

        game: game.game,
        state: game.state.name,
        screen: hasPlayerSubmitted? screens.wait: screens.singleTextBox,

        submitted: submitted,
        notSubmittingPlayer: notSubmittingPlayer,

        players: game.state.players.map(p => ({name: p.name, score: p.score}))
    })
}

function isCompleted(state) {
    if (state.players.length-1 === state.responses.length) return true;
    if (state.nextActionTime <= Date.now()) return true;

    return false;
}

/**
 * @param {String} playerId 
 * @param {String} content 
 */
function submit(state, playerId, content) {
    state.responses.push({id: playerId, content: content})

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