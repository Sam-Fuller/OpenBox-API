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
): Promise<unknown> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const targetPlayerId = getTargetPlayerId(request);
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);
    const targetPlayer = getPlayer(lobby, targetPlayerId);

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);
    verifyPlayerNotHost(lobby, targetPlayer);

    const updatedLobby = await removePlayerFromLobby(lobby, targetPlayer);

    return {};
};
