import {
    addPlayerToLobby,
    formatLobbyResponse,
    websocketLobbyUpdate,
} from '../../../helpers/lobby';
import {
    createPlayer,
    formatPlayerResponse,
    formatPlayerSecretResponse,
} from '../../../helpers/player';
import { getLobbyId, getPlayerName } from '../../../helpers/requestValidation';

import { LobbyResponse } from '../../../types/lobbyTypes';
import { PlayerResponse } from '../../../types/playerTypes';
import { Request } from 'express';
import { websocketActionType } from '../../../types/websocketTypes';

export const putLobbyPlayers = async (
    request: Request,
): Promise<{
    player: PlayerResponse;
    lobby: LobbyResponse;
}> => {
    const playerName = getPlayerName(request);
    const lobbyId = getLobbyId(request);

    const { player, secret } = createPlayer(playerName);
    const lobby = await addPlayerToLobby(lobbyId, player);

    await websocketLobbyUpdate(lobby, {
        type: websocketActionType.PLAYER_JOINED,
        player: formatPlayerResponse(player),
    });

    return {
        player: formatPlayerSecretResponse(player, secret),
        lobby: await formatLobbyResponse(lobby),
    };
};
