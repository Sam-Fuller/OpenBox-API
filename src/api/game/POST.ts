import {
    formatPlayerViewResponse,
    getPlayerView,
} from '../../helpers/component';
import {
    getContext,
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../../helpers/requestValidation';
import { getPlayer, verifyPlayer } from '../../helpers/player';

import { PlayerViewResponse } from '../../types/componentTypes';
import { Request } from 'express';
import { getLobbyById } from '../../helpers/lobby';

export const postGame = async (
    request: Request,
): Promise<{ playerView: PlayerViewResponse }> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);
    const context = getContext(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);

    //do the code thing

    //currently there is a concurrency issue
    //onAction should only return the playerView that is being changed
    //playerViews should contain a playerState, should be preferred over state

    const playerView = getPlayerView(lobby, player);

    return { playerView: formatPlayerViewResponse(playerView) };
};
