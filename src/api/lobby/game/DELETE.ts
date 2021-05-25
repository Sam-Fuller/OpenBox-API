import {
    getLobbyById,
    setLobbyGame,
    websocketLobbyUpdate,
} from '../../../helpers/lobby';
import {
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../../../helpers/requestValidation';
import {
    getPlayer,
    verifyPlayer,
    verifyPlayerHost,
} from '../../../helpers/player';

import { GameResponse } from '../../../types/gameTypes';
import { Request } from 'express';
import { WebsocketActionType } from '../../../types/websocketTypes';
import { formatGameResponse } from '../../../helpers/game';

export const deleteLobbyGame = async (
    request: Request,
): Promise<{
    game?: GameResponse;
}> => {
    console.log(`DELETE /lobby/game`);

    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);

    console.log({ playerId, playerSecret, lobbyId });

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    console.log({ lobby, player });

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);

    const updatedLobby = await setLobbyGame(lobbyId, undefined);

    await websocketLobbyUpdate(updatedLobby, {
        type: WebsocketActionType.GAME_REMOVED,
    });

    return {
        game: await formatGameResponse(updatedLobby.game),
    };
};
