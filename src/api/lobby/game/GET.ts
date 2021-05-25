import { GameResponse } from '../../../types/gameTypes';
import { Request } from 'express';
import { formatGameResponse } from '../../../helpers/game';
import { getLobbyById } from '../../../helpers/lobby';
import { getLobbyId } from '../../../helpers/requestValidation';

export const getLobbyGame = async (
    request: Request,
): Promise<{ game?: GameResponse }> => {
    console.log(`GET /lobby/game`);

    const lobbyId = getLobbyId(request);

    console.log({ lobbyId });

    const lobby = await getLobbyById(lobbyId);

    console.log({ lobby });

    return {
        game: await formatGameResponse(lobby.game),
    };
};
