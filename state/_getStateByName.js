//@ts-check

const loginState = require("./loginState")

const allButOneSubmit = require("./allButOneSubmitState")
const singleJudge = require("./singleJudgeState")

const resultsState = require("./resultsState")
const destroyState = require("./destroyState")


const states = [
    loginState,

    allButOneSubmit,
    singleJudge,
    
    resultsState,
    destroyState
]

module.exports = function getStateByName(stateName) {
    for (let state of states) {
        if (state.getName() === stateName) {
            return state
        }
    }

    return null
}