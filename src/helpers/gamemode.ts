import { Gamemode, GamemodeResponse } from '../types/gamemodeTypes';

import { APIError } from '../types/types';
import { Lobby } from '../types/lobbyTypes';
import { formatLobbyResponse } from './lobby';
import { gamemodeDB } from '../database/database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Interpreter = require(`js-interpreter`);

export const getGamemodeById = async (id: string): Promise<Gamemode> => {
    const gamemode = await gamemodeDB.findById(id);

    if (!gamemode) {
        throw new APIError(404, `Gamemode not found`);
    }

    return gamemode;
};

export const evaluateState = async (
    lobby: Lobby,
    code: string,
    globalCode?: string,
    currentState?: string,
): Promise<string> => {
    const allCode = `var lobby = ${JSON.stringify(
        await formatLobbyResponse(lobby),
    )}; var state = ${JSON.stringify(currentState)};${globalCode || ``}${
        code || ``
    };`;

    let interpreter;
    try {
        interpreter = new Interpreter(allCode);
    } catch (e) {
        console.log(`error`, e);
    }

    interpreter.run();

    const result: string = JSON.stringify(interpreter.value);

    return result;
};

export const getInitialState = async (
    gamemode: Gamemode,
    lobby: Lobby,
): Promise<string> => {
    const initialState = evaluateState(
        lobby,
        gamemode.calculateState.initialState,
        gamemode.calculateState.sharedFunctions,
        lobby.game?.currentState,
    );

    return initialState;
};

export const formatGamemodeResponse = (
    gamemode: Gamemode,
): GamemodeResponse => ({
    _id: gamemode._id,
    name: gamemode.name,
});
