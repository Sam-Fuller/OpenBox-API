import { createLobby, formatLobbyResponse } from '../helpers/lobby';
import { createPlayer, formatPlayerSecretResponse } from '../helpers/player';

import { LobbyResponse } from '../types/lobbyTypes';
import { PlayerSecretResponse } from '../types/playerTypes';
import { Request } from 'express';
import { getPlayerName } from '../helpers/requestValidation';

export const postLobby = (
    request: Request,
): {
    player: PlayerSecretResponse;
    lobby: LobbyResponse;
} => {
    const playerName = getPlayerName(request);

    const { player, secret } = createPlayer(playerName);
    const lobby = createLobby(player);

    console.log({
        player: formatPlayerSecretResponse(player, secret),
        lobby: formatLobbyResponse(lobby),
    });

    return {
        player: formatPlayerSecretResponse(player, secret),
        lobby: formatLobbyResponse(lobby),
    };
};
