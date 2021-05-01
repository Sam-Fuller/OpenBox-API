import { Game, GameResponse } from '../types/gameTypes';
import { formatGamemodeResponse, getGamemodeById } from './gamemode';

export const formatGameResponse = async (
    game?: Game,
): Promise<GameResponse | undefined> => {
    if (!game) return undefined;

    return {
        gamemode: formatGamemodeResponse(
            await getGamemodeById(game.gamemode_id),
        ),
    };
};
