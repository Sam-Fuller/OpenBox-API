import {
    deleteLobby as deleteLobbyFunction,
    getLobbyById,
} from '../../helpers/lobby';
import {
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../../helpers/requestValidation';
import {
    getPlayer,
    verifyPlayer,
    verifyPlayerHost,
} from '../../helpers/player';

import { Request } from 'express';
import { WebsocketActionType } from '../../types/websocketTypes';
import { sendToLobby } from '../../helpers/websocket';

export const deleteLobby = async (request: Request): Promise<void> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);

    await deleteLobbyFunction(lobby);

    sendToLobby(lobby, {
        action: { type: WebsocketActionType.LOBBY_DELETED },
    });
};
