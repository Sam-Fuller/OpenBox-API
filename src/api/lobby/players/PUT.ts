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
import { WebsocketActionType } from '../../../types/websocketTypes';

export const putLobbyPlayers = async (
    request: Request,
): Promise<{
    player: PlayerResponse;
    lobby: LobbyResponse;
}> => {
    console.log(`PUT /lobby/player`);

    const playerName = getPlayerName(request);
    const lobbyId = getLobbyId(request);

    console.log({ playerName, lobbyId });

    const { player, secret } = createPlayer(playerName);
    const lobby = await addPlayerToLobby(lobbyId, player);

    console.log({ player, secret, lobby });

    await websocketLobbyUpdate(lobby, {
        type: WebsocketActionType.PLAYER_JOINED,
        player: formatPlayerResponse(player),
    });

    return {
        player: formatPlayerSecretResponse(player, secret),
        lobby: await formatLobbyResponse(lobby),
    };
};
