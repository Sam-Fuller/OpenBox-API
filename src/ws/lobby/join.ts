import { addPlayerToLobby, formatLobbyResponse } from '../../helpers/lobby';
import { createPlayer, formatPlayerSecretResponse } from '../../helpers/player';
import {
    getLobbyIdWs,
    getPlayerName,
    getWebsocketId,
} from '../../helpers/requestValidation';

import { LobbyResponse } from '../../types/lobbyTypes';
import { PlayerResponse } from '../../types/playerTypes';

export const lobbyJoin = async (event: any): Promise<void> => {
    // const websocketId = getWebsocketId(event);
    // const playerName = getPlayerName(event);
    // const lobbyId = getLobbyIdWs(event);
    // const { player, secret } = createPlayer(playerName, websocketId);
    // const lobby = await addPlayerToLobby(lobbyId, player);
    // return {
    //     player: formatPlayerSecretResponse(player, secret),
    //     lobby: await formatLobbyResponse(lobby),
    // };
};
