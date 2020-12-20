//@ts-check

const messageSender = require("../messageSender")

function getName() {
    return "destroyState"
}

function initialState(currentState) {
    return {
        name: getName()
    }
}

function sendState(response, game, player) {
    messageSender.sendError(response, 404, {error: "Game has ended"})
}

function isCompleted(state) {

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