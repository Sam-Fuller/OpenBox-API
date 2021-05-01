import { GameResponse } from '../../../types/gameTypes';
import { Request } from 'express';
import { formatGameResponse } from '../../../helpers/game';
import { getLobbyById } from '../../../helpers/lobby';
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
