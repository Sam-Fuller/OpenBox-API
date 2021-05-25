import {
    formatLobbyResponse,
    getLobbyById,
    websocketLobbyUpdate,
} from '../../helpers/lobby';

import { LobbyResponse } from '../../types/lobbyTypes';
import { Request } from 'express';
import { getLobbyId } from '../../helpers/requestValidation';

export const getLobby = async (
    request: Request,
): Promise<{ lobby: LobbyResponse }> => {
    console.log(`GET /lobby`);

    const lobbyId = getLobbyId(request);

    console.log({ lobbyId });

    const lobby = await getLobbyById(lobbyId);

    console.log({ lobby });

    return {
        lobby: await formatLobbyResponse(lobby),
    };
};
