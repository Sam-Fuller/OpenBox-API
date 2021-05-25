import {
    formatGamemodeResponse,
    getGamemodeById,
} from '../../helpers/gamemode';

import { GamemodeResponse } from '../../types/gamemodeTypes';
import { Request } from 'express';
import { getGamemodeId } from '../../helpers/requestValidation';

export const getGamemode = async (
    request: Request,
): Promise<{ gamemode: GamemodeResponse }> => {
    console.log(`GET /gamemode`);

    const gamemodeId = getGamemodeId(request);

    const gamemode = await getGamemodeById(gamemodeId);

    console.log({ gamemodeId });

    return {
        gamemode: formatGamemodeResponse(gamemode),
    };
};
