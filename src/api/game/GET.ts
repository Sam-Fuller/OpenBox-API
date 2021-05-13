import {
    formatPlayerViewResponse,
    getPlayerView,
} from '../../helpers/component';
import {
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../../helpers/requestValidation';
import { getPlayer, verifyPlayer } from '../../helpers/player';

import { PlayerViewResponse } from '../../types/componentTypes';
import { Request } from 'express';
import { getLobbyById } from '../../helpers/lobby';

export const getGame = async (
    request: Request,
): Promise<{ playerView: PlayerViewResponse }> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);

    const playerView = getPlayerView(lobby, player);

    return { playerView: formatPlayerViewResponse(playerView) };
};
