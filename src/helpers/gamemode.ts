import { Component, PlayerView } from '../types/componentTypes';
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

const evaluateOutput = (
    output: string,
): {
    currentState: string;
    playerViews: PlayerView[];
} => {
    const outputObject = JSON.parse(output);

    return {
        currentState: outputObject.currentState as string,
        playerViews: outputObject.playerViews as PlayerView[],
    };
};

export const evaluateState = async (
    lobby: Lobby,
    code: string,
    globalCode?: string,
    currentState?: string,
    playerViews?: PlayerView[],
    context?: Component[],
): Promise<{
    currentState: string;
    playerViews: PlayerView[];
}> => {
    const allCode = `var lobby = ${await formatLobbyResponse(
        lobby,
    )}; var state = ${currentState}; var playerViews = ${
        playerViews || []
    }; var context = ${context};${globalCode || ``};${code || ``}`;

    console.log(allCode);

    let interpreter;
    try {
        interpreter = new Interpreter(allCode);
    } catch (e) {
        console.log(`error`, e);
    }

    interpreter.run();

    const result: string = interpreter.value;

    return evaluateOutput(result);
};

export const getInitialState = async (
    gamemode: Gamemode,
    lobby: Lobby,
): Promise<{
    currentState: string;
    playerViews: PlayerView[];
}> => {
    const initialState = evaluateState(
        lobby,
        gamemode.calculateState.initialState,
        gamemode.calculateState.sharedFunctions,
        lobby.game?.currentState,
    );

    return initialState;
};

export const submitAction = async (
    gamemode: Gamemode,
    lobby: Lobby,
    context: Component[],
): Promise<{
    currentState: string;
    playerViews: PlayerView[];
}> => {
    const initialState = evaluateState(
        lobby,
        gamemode.calculateState.initialState,
        gamemode.calculateState.sharedFunctions,
        lobby.game?.currentState,
        lobby?.game?.playerViews,
        context,
    );

    return initialState;
};

export const formatGamemodeResponse = (
    gamemode: Gamemode,
): GamemodeResponse => ({
    _id: gamemode._id,
    name: gamemode.name,
});
