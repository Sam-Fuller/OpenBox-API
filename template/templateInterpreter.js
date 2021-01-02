//@ts-check
const getStateByName = require("../state/_getStateByName")

module.exports.interpretInitialState = function interpretInitialState(game) {
    return intrepretState({}, {}, {}, game.game.initialState)
}

module.exports.interpretStateChange = function interpretStateChange(state, game) {
    const stateConditions = game.game.stateChange

    for(let i = 0; i < stateConditions.length; i++) {
        if (interpretType(state, {}, {}, stateConditions[i].condition)) {
            const local = {}

            if (stateConditions[i].prerequisites) {
                for (let j = 0; j < stateConditions[i].prerequisites.length; j++) {
                    interpretType(state, local, {}, stateConditions[i].prerequisites[j])
                }
            }

            console.log("interpretStateChange")
            console.log(state)
            console.log(stateConditions[i])

            const x = intrepretState(state, local, {}, stateConditions[i].state)

            console.log(x)

            return x
        }
    }
}

function intrepretState(state, local, parameter, object) {
    const overrides = object.overrides
    const baseState = getStateByName(object.baseState)
    const baseStateValues = baseState? baseState.initialState(state): {}

    if (overrides) {
        for (const [key, value] of Object.entries(overrides)) {
            baseStateValues[key] = interpretType(state, local, parameter, value)
        }
    }

    return baseStateValues
}

function interpretType(state, local, parameter, object) {
    const type = object.type
    const value = object.value

    if (!type && object instanceof String) return object
    if (!type && object instanceof Number) return object

    if (type === "operation") return interpretOperation(state, local, parameter, value)

    if (type === "state") return state[value]
    if (type === "local") return local[value]
    if (type === "parameter") return parameter[value]

    if (type === "string" && value instanceof String) return value
    if (type === "number" && value instanceof Number) return value

    if (type === "array") return value.map(x => interpretType(x))
}

function interpretOperation(state, local, parameter, object) {
    const operation = object.operation
    const data = object.data

    if (operation === "currentState") return state.name === interpretType(state, local, parameter, data)

    if (operation === "assign") return assign(state, local, parameter, data[0], data[1])

    if (operation === "property") return interpretType(state, local, parameter, data[0])[interpretType(state, local, parameter, data[1])]
    if (operation === "shuffle") return shuffle(state, local, parameter, data)
    if (operation === "slice") return slice(state, local, parameter, data)

    if (operation === "and") return interpretType(state, local, parameter, data[0]) && interpretType(state, local, parameter, data[1])
    if (operation === "or") return interpretType(state, local, parameter, data[0]) || interpretType(state, local, parameter, data[1])
    if (operation === "trueEqual") return interpretType(state, local, parameter, data[0]) === interpretType(state, local, parameter, data[1])
    if (operation === "equal") return interpretType(state, local, parameter, data[0]) == interpretType(state, local, parameter, data[1])
    if (operation === "isEmpty") return isEmpty(interpretType(state, local, parameter, data))

    if (operation === "map") return map(state, local, parameter, data)
    if (operation === "filter") return filter(state, local, parameter, data)

    if (operation === "increaseScore") return increaseScore(state, local, parameter, data)
}

function isEmpty(array) {
    return array && array.length === 0
}

function assign(state, local, parameter, lh, rh) {
    const type = lh.type
    const property = lh.value
    const value = interpretType(state, local, parameter, rh)

    if (type === "state") state[property] = value
    if (type === "local") local[property] = value

    return value
}

function shuffle(state, local, parameter, input) {
    let newArray = interpretType(state, local, parameter, input).slice(0)

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray
}

function slice(state, local, parameter, input) {
    if (input.length === 3) {
        return interpretType(state, local, parameter, input[0]).slice(interpretType(state, local, parameter, input[1]), interpretType(state, local, parameter, input[2]))
        
    } else {
        return interpretType(state, local, parameter, input[0]).slice(interpretType(state, local, parameter, input[1]))
    }
}

function map(state, local, parameter, input) {
    const array = interpretType(state, local, parameter, input[0])
    const param = interpretType(state, local, parameter, input[1])

    return array.map((element) => {
        parameter = {
            ...parameter,
            [param]: element
        }

        return interpretType(state, local, parameter, input[2])
    })
}

function filter(state, local, parameter, input) {
    const array = interpretType(state, local, parameter, input[0])
    const param = interpretType(state, local, parameter, input[1])

    return array.filter((element) => {
        parameter = {
            ...parameter,
            [param]: element
        }

        return interpretType(state, local, parameter, input[2])
    })
}

function increaseScore(state, local, parameter, input) {
    const winningPlayers = interpretType(state, local, parameter, input[0])
    const amount = interpretType(state, local, parameter, input[1])

    console.log(winningPlayers)
    console.log(amount)

    state.players = state.players.map((player) => {
        if (winningPlayers.includes(player.id)) {
            player.score += amount
        }

        return player
    })

    console.log(state.players)

    return state.players
}