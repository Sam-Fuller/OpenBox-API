import { Game, GameResponse } from '../../../types/gameTypes';
import { getGamemodeById, getInitialState } from '../../../helpers/gamemode';
import {
    getGamemodeId,
    getLobbyId,
    getPlayerId,
    getPlayerSecret,
} from '../../../helpers/requestValidation';
import { getLobbyById, setLobbyGame } from '../../../helpers/lobby';
import {
    getPlayer,
    verifyPlayer,
    verifyPlayerHost,
} from '../../../helpers/player';

import { Request } from 'express';
import { formatGameResponse } from '../../../helpers/game';

export const putLobbyGame = async (
    request: Request,
): Promise<{
    game?: GameResponse;
}> => {
    const playerId = getPlayerId(request);
    const playerSecret = getPlayerSecret(request);
    const lobbyId = getLobbyId(request);
    const gamemodeId = getGamemodeId(request);

    const lobby = await getLobbyById(lobbyId);
    const player = getPlayer(lobby, playerId);

    verifyPlayer(player, playerSecret);
    verifyPlayerHost(lobby, player);

    const gamemode = await getGamemodeById(gamemodeId);

    const game: Game = {
        gamemode_id: gamemodeId,
        currentState: await getInitialState(gamemode, lobby),
    };

    const updatedLobby = await setLobbyGame(lobbyId, game);

    return {
        game: await formatGameResponse(updatedLobby.game),
    };
};
