import { getLobbyById, setLobbyGame } from '../../helpers/lobby';
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

import { GameResponse } from '../../types/gameTypes';
import { Request } from 'express';
import { formatGameResponse } from '../../helpers/game';

export const deleteLobbyGame = async (
    request: Request,
): Promise<{
    game?: GameResponse;
}> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);

    const updatedLobby = await setLobbyGame(lobbyId, undefined);

    return {
        game: await formatGameResponse(updatedLobby.game),
    };
};
