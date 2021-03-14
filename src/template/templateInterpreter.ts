// // @ts-check
// const getStateByName = require('../state/_getStateByName');

// module.exports.interpretInitialState = function interpretInitialState(game) {
//     return intrepretState({}, {}, {}, game.game.initialState);
// };

// module.exports.interpretStateChange = function interpretStateChange(
//     state,
//     game,
// ) {
//     const stateConditions = game.game.stateChange;

//     for (let i = 0; i < stateConditions.length; i++) {
//         if (interpretType(state, {}, {}, stateConditions[i].condition)) {
//             const local = {};

//             if (stateConditions[i].prerequisites) {
//                 for (
//                     let j = 0;
//                     j < stateConditions[i].prerequisites.length;
//                     j++
//                 ) {
//                     interpretType(
//                         state,
//                         local,
//                         {},
//                         stateConditions[i].prerequisites[j],
//                     );
//                 }
//             }

//             console.log('interpretStateChange');
//             console.log(state);
//             console.log(stateConditions[i]);

//             const x = intrepretState(
//                 state,
//                 local,
//                 {},
//                 stateConditions[i].state,
//             );

//             console.log(x);

//             return x;
//         }
//     }
// };

// function intrepretState(state, local, parameter, object) {
//     const { overrides } = object;
//     const baseState = getStateByName(object.baseState);
//     const baseStateValues = baseState ? baseState.initialState(state) : {};

//     if (overrides) {
//         for (const [key, value] of Object.entries(overrides)) {
//             baseStateValues[key] = interpretType(
//                 state,
//                 local,
//                 parameter,
//                 value,
//             );
//         }
//     }

//     return baseStateValues;
// }

// function isOperationCompilable(operation) {}

// function isTypeCompilable(type) {}

// const types = [
//     {
//         name: undefined,
//         description: 'primitives',
//         isCompilable: (value) =>
//             value instanceof Number
//             || value instanceof String
//             || value instanceof Array,
//         function: (state, local, parameter, value) => {
//             if (value instanceof Number || value instanceof String)
//                 return value;

//             if (value instanceof Array)
//                 return value.map((x) => interpretType(x));
//         },
//     },
//     {
//         name: 'operation',
//         description: '',
//         isCompilable: (value) => isOperationCompilable(value),
//         function: (state, local, parameter, value) =>
//             interpretOperation(state, local, parameter, value),
//     },
//     {
//         name: 'state',
//         description: '',
//         isCompilable: (value) => isTypeCompilable(value),
//         function: (state, local, parameter, value) =>
//             state[interpretType(value)],
//     },
//     {
//         name: 'local',
//         description: '',
//         isCompilable: (value) => isTypeCompilable(value),
//         function: (state, local, parameter, value) =>
//             local[interpretType(value)],
//     },
//     {
//         name: 'parameter',
//         description: '',
//         isCompilable: (value) => isTypeCompilable(value),
//         function: (state, local, parameter, value) =>
//             parameter[interpretType(value)],
//     },
//     {
//         name: 'string',
//         description: '',
//         isCompilable: (value) => value instanceof String,
//         function: (state, local, parameter, value) =>
//             value instanceof String ? value : '',
//     },
//     {
//         name: 'number',
//         description: '',
//         isCompilable: (value) => value instanceof Number,
//         function: (state, local, parameter, value) =>
//             value instanceof Number ? value : 0,
//     },
//     {
//         name: 'array',
//         description: '',
//         isCompilable: (value) => value instanceof Array,
//         function: (state, local, parameter, value) =>
//             value instanceof Array ? value.map((x) => interpretType(x)) : [],
//     },
// ];

// const operations = [
//     {
//         name: 'currentState',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             state.name === interpretType(state, local, parameter, value),
//     },
//     {
//         name: 'assign',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             assign(state, local, parameter, value),
//     },
//     {
//         name: 'property',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) => {
//             if (!value || !(value instanceof Array) || value.length !== 2)
//                 return undefined;

//             return interpretType(state, local, parameter, value[0])[
//                 interpretType(state, local, parameter, value[1])
//             ];
//         },
//     },
//     {
//         name: 'shuffle',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             shuffle(state, local, parameter, value),
//     },
//     {
//         name: 'slice',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             slice(state, local, parameter, value),
//     },
//     {
//         name: 'and',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             interpretType(state, local, parameter, value[0])
//             && interpretType(state, local, parameter, value[1]),
//     },
//     {
//         name: 'or',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             interpretType(state, local, parameter, value[0])
//             || interpretType(state, local, parameter, value[1]),
//     },
//     {
//         name: 'trueEqual',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             interpretType(state, local, parameter, value[0])
//             === interpretType(state, local, parameter, value[1]),
//     },
//     {
//         name: 'equal',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             interpretType(state, local, parameter, value[0])
//             == interpretType(state, local, parameter, value[1]),
//     },
//     {
//         name: 'isEmpty',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             isEmpty(interpretType(state, local, parameter, value)),
//     },
//     {
//         name: 'map',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             map(state, local, parameter, value),
//     },
//     {
//         name: 'filter',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             map(state, local, parameter, value),
//     },
//     {
//         name: 'increaseScore',
//         description: '',
//         isCompilable: (value) => {},
//         function: (state, local, parameter, value) =>
//             increaseScore(state, local, parameter, value),
//     },
// ];

// function interpretType(state, local, parameter, object) {
//     const { type } = object;
//     const { value } = object;

//     if (!type && object instanceof String) return object;
//     if (!type && object instanceof Number) return object;

//     if (type === 'operation')
//         return interpretOperation(state, local, parameter, value);

//     if (type === 'state') return state[value];
//     if (type === 'local') return local[value];
//     if (type === 'parameter') return parameter[value];

//     if (type === 'string' && value instanceof String) return value;
//     if (type === 'number' && value instanceof Number) return value;

//     if (type === 'array') return value.map((x) => interpretType(x));
// }

// function interpretOperation(state, local, parameter, object) {
//     const { operation } = object;
//     const { data } = object;

//     if (operation === 'currentState')
//         return state.name === interpretType(state, local, parameter, data);

//     if (operation === 'assign') return assign(state, local, parameter, data);

//     if (operation === 'property')
//         return interpretType(state, local, parameter, data[0])[
//             interpretType(state, local, parameter, data[1])
//         ];
//     if (operation === 'shuffle') return shuffle(state, local, parameter, data);
//     if (operation === 'slice') return slice(state, local, parameter, data);

//     if (operation === 'and')
//         return (
//             interpretType(state, local, parameter, data[0])
//             && interpretType(state, local, parameter, data[1])
//         );
//     if (operation === 'or')
//         return (
//             interpretType(state, local, parameter, data[0])
//             || interpretType(state, local, parameter, data[1])
//         );
//     if (operation === 'trueEqual')
//         return (
//             interpretType(state, local, parameter, data[0])
//             === interpretType(state, local, parameter, data[1])
//         );
//     if (operation === 'equal')
//         return (
//             interpretType(state, local, parameter, data[0])
//             == interpretType(state, local, parameter, data[1])
//         );
//     if (operation === 'isEmpty')
//         return isEmpty(interpretType(state, local, parameter, data));

//     if (operation === 'map') return map(state, local, parameter, data);
//     if (operation === 'filter') return filter(state, local, parameter, data);

//     if (operation === 'increaseScore')
//         return increaseScore(state, local, parameter, data);
// }

// function isEmpty(array) {
//     return array && array instanceof Array && array.length === 0;
// }

// function assign(state, local, parameter, data) {
//     if (!data || !(data instanceof Array) || data.length !== 2)
//         return undefined;

//     const lh = data[0];
//     const rh = data[1];

//     const { type } = lh;
//     const property = interpretType(lh.value);
//     const value = interpretType(state, local, parameter, rh);

//     if (type === 'state') state[property] = value;
//     if (type === 'local') local[property] = value;

//     return value;
// }

// function shuffle(state, local, parameter, input) {
//     if (!input || !(input instanceof Array)) return undefined;

//     const newArray = interpretType(state, local, parameter, input).slice(0);

//     for (let i = newArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//     }

//     return newArray;
// }

// function slice(state, local, parameter, input) {
//     if (!input) return undefined;

//     if (input.length === 3) {
//         return interpretType(state, local, parameter, input[0]).slice(
//             interpretType(state, local, parameter, input[1]),
//             interpretType(state, local, parameter, input[2]),
//         );
//     }

//     if (input.length === 2) {
//         return interpretType(state, local, parameter, input[0]).slice(
//             interpretType(state, local, parameter, input[1]),
//         );
//     }

//     return undefined;
// }

// function map(state, local, parameter, input) {
//     if (!input || !(input instanceof Array) || input.length !== 3)
//         return undefined;

//     const array = interpretType(state, local, parameter, input[0]);
//     const param = interpretType(state, local, parameter, input[1]);

//     return array.map((element) => {
//         parameter = {
//             ...parameter,
//             [param]: element,
//         };

//         return interpretType(state, local, parameter, input[2]);
//     });
// }

// function filter(state, local, parameter, input) {
//     if (!input || !(input instanceof Array) || input.length !== 3)
//         return undefined;

//     const array = interpretType(state, local, parameter, input[0]);
//     const param = interpretType(state, local, parameter, input[1]);

//     return array.filter((element) => {
//         parameter = {
//             ...parameter,
//             [param]: element,
//         };

//         return interpretType(state, local, parameter, input[2]);
//     });
// }

// function increaseScore(state, local, parameter, input) {
//     if (!input || !(input instanceof Array) || input.length !== 2)
//         return undefined;

//     const winningPlayers = interpretType(state, local, parameter, input[0]);
//     const amount = interpretType(state, local, parameter, input[1]);

//     console.log(winningPlayers);
//     console.log(amount);

//     state.players = state.players.map((player) => {
//         if (winningPlayers.includes(player.id)) {
//             player.score += amount;
//         }

//         return player;
//     });

//     console.log(state.players);

//     return state.players;
// }
