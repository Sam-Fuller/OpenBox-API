import { getLobbyById, websocketLobbyUpdate } from '../../../helpers/lobby';

import { GameResponse } from '../../../types/gameTypes';
import { Request } from 'express';
import { formatGameResponse } from '../../../helpers/game';
import { getLobbyId } from '../../../helpers/requestValidation';

export const getLobbyGame = async (
    request: Request,
): Promise<{ game?: GameResponse }> => {
    const lobbyId = getLobbyId(request);

    const lobby = await getLobbyById(lobbyId);

    return {
        game: await formatGameResponse(lobby.game),
    };
};
