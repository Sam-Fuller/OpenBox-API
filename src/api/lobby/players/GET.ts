import { Player, PlayerResponse } from '../../../types/playerTypes';
import { getLobbyById, websocketLobbyUpdate } from '../../../helpers/lobby';

import { Request } from 'express';
import { formatPlayerResponse } from '../../../helpers/player';
import { getLobbyId } from '../../../helpers/requestValidation';

export const getLobbyPlayers = async (
    request: Request,
): Promise<{ players: PlayerResponse[] }> => {
    console.log(`GET /lobby/players`);

    const lobbyId = getLobbyId(request);

    console.log({ lobbyId });

    const lobby = await getLobbyById(lobbyId);

    console.log({ lobby });

    return {
        players: lobby.players.map((player: Player) =>
            formatPlayerResponse(player),
        ),
    };
};
