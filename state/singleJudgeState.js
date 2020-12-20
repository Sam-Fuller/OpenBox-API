//@ts-check

const { error } = require("console")
const messageSender = require("../messageSender")
const screens = require("./_screens")

function getName()/**@type {String} */ {
    return "singleJudgeState"
}

/**@return {{
 players: {id: string, name: any, score: number}[],
 maxPlayers: number,

 name: String,
 lastActionTime: number,
 nextActionTime: number,

 choices: {id: String, content: String}[],
 judge: String,

 response: String
}}*/
function initialState(currentState) {
    return {
        players: currentState.players.slice(0),
        maxPlayers: currentState.maxPlayers,

        name: getName(),
        lastActionTime: Date.now(),
        nextActionTime: Date.now() + (1000 * 60 * 10),
        
        choices: null,
        judge: null,

        response: null
    }
}
/**@param {{id: string, name: any, score: number}} [player]
 * {
 *  gameId: string,
 *  playerId: string,
 *
 *  game: string,
 *  state: string,
 *  screen: {"wait" | "multipleTextChoice"},
 *
 *  judge: string,
 *  choices: string[],
 *
 *  players: {name: string, score: number}[]
 * }
 * */ 
function sendState(response, game, player) {
    const isJudge = game.state.judge === player.id
    const judge = game.state.players.find(player => player.id === game.state.judge).name

    messageSender.sendResponse(response, {
        gameid: game._id,
        playerId: player.id,

        game: game.game,
        state: game.state.name,
        screens: isJudge? screens.multipleTextChoice: screens.wait,

        judge: judge,
        choices: game.state.choices.map(choice => choice.content),

        players: game.state.players.map(p => ({name: p.name, score: p.score}))
    })
}

function isCompleted(state) {
    if (state.response !== null) return true;
    if (state.nextActionTime <= Date.now()) return true;

    return false;
}

function submit(state, playerId, content) {
    return {
        ...state,
        response: content
    }
}

module.exports = {
    getName,
    initialState,
    sendState,
    isCompleted,
    submit
}