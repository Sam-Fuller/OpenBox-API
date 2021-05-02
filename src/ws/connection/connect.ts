import { getLobbyById, updatePlayer } from '../../helpers/lobby';
import {
    getLobbyIdWs,
    getPlayerIdWs,
    getPlayerSecretWs,
    getWebsocketId,
} from '../../helpers/requestValidation';
import { getPlayer, verifyPlayer } from '../../helpers/player';

export const connect = async (event: any): Promise<string> => {
    const websocketId = getWebsocketId(event);

    const lobbyId = getLobbyIdWs(event);
    const playerId = getPlayerIdWs(event);
    const playerSecret = getPlayerSecretWs(event);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);
    player.websocketId = websocketId;

    verifyPlayer(player, playerSecret);

    await updatePlayer(lobbyId, player);

    return `connected`;
};
