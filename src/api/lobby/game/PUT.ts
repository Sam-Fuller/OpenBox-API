import { Game, GameResponse } from '../../../types/gameTypes';
import { getGamemodeById, getInitialState } from '../../../helpers/gamemode';
import {
    getGamemodeId,
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../../../helpers/requestValidation';
import {
    getLobbyById,
    setLobbyGame,
    websocketLobbyUpdate,
} from '../../../helpers/lobby';
import {
    getPlayer,
    verifyPlayer,
    verifyPlayerHost,
} from '../../../helpers/player';

import { Request } from 'express';
import { WebsocketActionType } from '../../../types/websocketTypes';
import { formatGameResponse } from '../../../helpers/game';

export const putLobbyGame = async (
    request: Request,
): Promise<{
    game?: GameResponse;
}> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);
    const gamemodeId = getGamemodeId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);

    const gamemode = await getGamemodeById(gamemodeId);

    const initialState = await getInitialState(gamemode, lobby);

    const game: Game = {
        gamemode_id: gamemodeId,
        currentState: initialState.currentState,
        playerViews: initialState.playerViews,
    };

    const updatedLobby = await setLobbyGame(lobbyId, game);

    await websocketLobbyUpdate(updatedLobby, {
        type: WebsocketActionType.GAME_CHANGED,
    });

    return {
        game: await formatGameResponse(updatedLobby.game),
    };
};
