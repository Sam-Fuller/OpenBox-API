import { createLobby, formatLobbyResponse } from '../../helpers/lobby';
import { createPlayer, formatPlayerSecretResponse } from '../../helpers/player';

import { LobbyResponse } from '../../types/lobbyTypes';
import { PlayerSecretResponse } from '../../types/playerTypes';
import { Request } from 'express';
import { getPlayerName } from '../../helpers/requestValidation';

export const postLobby = async (
    request: Request,
): Promise<{
    player: PlayerSecretResponse;
    lobby: LobbyResponse;
}> => {
    console.log(`POST /lobby`);

    const playerName = getPlayerName(request);

    console.log({ playerName });

    const { player, secret } = createPlayer(playerName);
    const lobby = await createLobby(player);

    console.log({ player, secret, lobby });

    return {
        player: formatPlayerSecretResponse(player, secret),
        lobby: await formatLobbyResponse(lobby),
    };
};
