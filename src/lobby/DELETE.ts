import {
    deleteLobby as deleteLobbyFunction,
    formatLobbyResponse,
    getLobbyById,
} from '../helpers/lobby';
import {
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../helpers/requestValidation';
import { getPlayer, verifyPlayer, verifyPlayerHost } from '../helpers/player';

import { LobbyResponse } from '../types/lobbyTypes';
import { Request } from 'express';

export const deleteLobby = async (request: Request): Promise<unknown> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);

    await deleteLobbyFunction(lobby);

    return {};
};
