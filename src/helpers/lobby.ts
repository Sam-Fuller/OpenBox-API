import { Lobby, LobbyResponse } from '../types/lobbyTypes';
import { Player, PlayerResponse } from '../types/playerTypes';

import { APIError } from '../types/types';
import { formatPlayerResponse } from './player';
import { generateGameCode } from '../helpers/gameCode';
import { lobbyDB } from '../database/database';
import uuid from 'uuid-random';

export const createLobby = (player: Player): Lobby => {
    const lobby: Lobby = {
        _id: uuid(),
        code: generateGameCode(),
        players: [player],
    };

    lobbyDB.create(lobby);

    return lobby;
};

export const getLobbyById = async (id: string): Promise<Lobby> => {
    const lobby = await lobbyDB.findById(id);

    if (!lobby) {
        throw new APIError(404, `Lobby not found`);
    }

    return lobby;
};

export const addPlayerToLobby = async (
    lobbyId: string,
    player: Player,
): Promise<Lobby> => {
    const lobby: Lobby = await getLobbyById(lobbyId);

    lobby.players.push(player);
    lobbyDB.findOneAndUpdate({ id: lobbyId }, { players: lobby.players });

    return lobby;
};

export const formatLobbyResponse = (lobby: Lobby): LobbyResponse => {
    return {
        _id: lobby._id,
        code: lobby.code,

        players: lobby.players.map(
            (player: Player): PlayerResponse => formatPlayerResponse(player),
        ),
    };
};
