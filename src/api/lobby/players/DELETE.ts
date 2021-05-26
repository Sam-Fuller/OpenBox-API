import {
    formatLobbyResponse,
    getLobbyById,
    removePlayerFromLobby,
    websocketLobbyUpdate,
} from '../../../helpers/lobby';
import {
    formatPlayerResponse,
    getPlayer,
    verifyPlayer,
    verifyPlayerHost,
    verifyPlayerNotHost,
} from '../../../helpers/player';
import {
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
    getTargetPlayerId,
} from '../../../helpers/requestValidation';

import { LobbyResponse } from '../../../types/lobbyTypes';
import { Request } from 'express';
import { WebsocketActionType } from '../../../types/websocketTypes';

export const deleteLobbyPlayers = async (
    request: Request,
): Promise<{ lobby: LobbyResponse }> => {
    console.log(`DELETE /lobby/players`);

    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const targetPlayerId = getTargetPlayerId(request);
    const lobbyId = getLobbyId(request);

    console.log({ playerId, playerSecret, targetPlayerId, lobbyId });

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);
    const targetPlayer = getPlayer(lobby, targetPlayerId);

    console.log({ lobby, player, targetPlayer });

    verifyPlayer(player, playerSecret);
    if (player._id !== targetPlayer._id) {
        verifyPlayerHost(lobby, player);
    }
    verifyPlayerNotHost(lobby, targetPlayer);

    await removePlayerFromLobby(lobbyId, targetPlayer);
    const updatedLobby = await getLobbyById(lobbyId);

    console.log({ updatedLobby });

    const actionType
        = player._id === targetPlayer._id ?
            WebsocketActionType.PLAYER_LEFT
            : WebsocketActionType.PLAYER_REMOVED;
    await websocketLobbyUpdate(lobby, {
        type: actionType,
        player: formatPlayerResponse(targetPlayer),
    });

    return {
        lobby: await formatLobbyResponse(updatedLobby),
    };
};
