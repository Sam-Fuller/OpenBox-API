import {
    formatLobbyResponse,
    getLobbyById,
    removePlayerFromLobby,
} from '../../helpers/lobby';
import {
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
    getTargetPlayerId,
} from '../../helpers/requestValidation';
import {
    getPlayer,
    verifyPlayer,
    verifyPlayerHost,
    verifyPlayerNotHost,
} from '../../helpers/player';

import { LobbyResponse } from '../../types/lobbyTypes';
import { Request } from 'express';

export const deleteLobbyPlayers = async (
    request: Request,
): Promise<{ lobby: LobbyResponse }> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const targetPlayerId = getTargetPlayerId(request);
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);
    const targetPlayer = getPlayer(lobby, targetPlayerId);

    verifyPlayer(player, playerSecret);
    if (player._id !== targetPlayer._id) {
        verifyPlayerHost(lobby, player);
    }
    verifyPlayerNotHost(lobby, targetPlayer);

    await removePlayerFromLobby(lobby, targetPlayer);
    const updatedLobby = await getLobbyById(lobbyId);

    return {
        lobby: formatLobbyResponse(updatedLobby),
    };
};
