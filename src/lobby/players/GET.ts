import { Player, PlayerResponse } from '../../types/playerTypes';

import { Request } from 'express';
import { formatPlayerResponse } from '../../helpers/player';
import { getLobbyById } from '../../helpers/lobby';
import { getLobbyId } from '../../helpers/requestValidation';

export const getLobbyPlayers = async (
    request: Request,
): Promise<{ players: PlayerResponse[] }> => {
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);

    return {
        players: lobby.players.map((player: Player) =>
            formatPlayerResponse(player),
        ),
    };
};
