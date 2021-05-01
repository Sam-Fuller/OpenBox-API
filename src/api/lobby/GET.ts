import { formatLobbyResponse, getLobbyById } from '../../helpers/lobby';

import { LobbyResponse } from '../../types/lobbyTypes';
import { Request } from 'express';
import { getLobbyId } from '../../helpers/requestValidation';

export const getLobby = async (
    request: Request,
): Promise<{ lobby: LobbyResponse }> => {
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);

    return {
        lobby: await formatLobbyResponse(lobby),
    };
};
