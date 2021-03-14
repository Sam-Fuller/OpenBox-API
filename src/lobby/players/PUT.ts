import { addPlayerToLobby, formatLobbyResponse } from '../../helpers/lobby';
import { createPlayer, formatPlayerSecretResponse } from '../../helpers/player';
import { getLobbyId, getPlayerName } from '../../helpers/requestValidation';

import { LobbyResponse } from '../../types/lobbyTypes';
import { PlayerResponse } from '../../types/playerTypes';
import { Request } from 'express';

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

    return {
        player: formatPlayerSecretResponse(player, secret),
        lobby: formatLobbyResponse(lobby),
    };
};
