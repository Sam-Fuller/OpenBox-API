import { Lobby, LobbyResponse } from '../types/lobbyTypes';
import { Player, PlayerResponse } from '../types/playerTypes';

import { APIError } from '../types/types';
import { formatPlayerResponse } from './player';
import { generateGameCode } from '../helpers/gameCode';
import { lobbyDB } from '../database/database';

export const createLobby = async (player: Player): Promise<Lobby> => {
    const lobby: Lobby = {
        _id: await generateGameCode(),
        host: player,
        players: [player],
    };

    const created = await lobbyDB.create(lobby);

    if (!created) {
        throw new APIError(500, `Could not create lobby`);
    }

    return lobby;
};

export const getLobbyById = async (id: string): Promise<Lobby> => {
    const lobby = await lobbyDB.findById(id);

    if (!lobby) {
        throw new APIError(404, `Lobby not found`);
    }

    return lobby;
};

export const deleteLobby = async (lobby: Lobby): Promise<void> => {
    await lobbyDB.deleteOne({ _id: lobby._id });
};

export const addPlayerToLobby = async (
    lobbyId: string,
    player: Player,
): Promise<Lobby> => {
    const lobby: Lobby = await getLobbyById(lobbyId);

    lobby.players.push(player);
    const updatedLobby = await lobbyDB.findOneAndUpdate(
        { _id: lobbyId },
        { players: lobby.players },
    );

    if (!updatedLobby) {
        throw new APIError(500, `Could not add player`);
    }

    return lobby;
};

export const removePlayerFromLobby = async (
    lobby: Lobby,
    targetPlayer: Player,
): Promise<Lobby> => {
    const updatedLobby = await lobbyDB.findOneAndUpdate(
        { _id: lobby._id },
        { $pull: { players: { _id: targetPlayer._id } } },
    );

    if (!updatedLobby) {
        throw new APIError(500, `Could not remove player`);
    }

    return updatedLobby;
};

export const formatLobbyResponse = (lobby: Lobby): LobbyResponse => ({
    _id: lobby._id,

    host: formatPlayerResponse(lobby.host),
    players: lobby.players.map(
        (player: Player): PlayerResponse => formatPlayerResponse(player),
    ),
});
