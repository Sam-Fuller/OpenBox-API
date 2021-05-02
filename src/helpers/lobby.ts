import { Lobby, LobbyResponse } from '../types/lobbyTypes';
import { Player, PlayerResponse } from '../types/playerTypes';

import { APIError } from '../types/types';
import { Game } from '../types/gameTypes';
import { formatGameResponse } from './game';
import { formatPlayerResponse } from './player';
import { generateGameCode } from '../helpers/gameCode';
import { lobbyDB } from '../database/database';
import { sendToLobby } from './websocket';

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
    const oldLobby = await lobbyDB.findOneAndUpdate(
        { _id: lobbyId },
        { $push: { players: player } },
    );

    if (!oldLobby) {
        throw new APIError(500, `Could not add player`);
    }

    const updatedLobby = getLobbyById(lobbyId);

    return updatedLobby;
};

export const removePlayerFromLobby = async (
    lobbyId: string,
    targetPlayer: Player,
): Promise<Lobby> => {
    const updatedLobby = await lobbyDB.findOneAndUpdate(
        { _id: lobbyId },
        { $pull: { players: { _id: targetPlayer._id } } },
    );

    if (!updatedLobby) {
        throw new APIError(500, `Could not remove player`);
    }

    return updatedLobby;
};

export const setLobbyGame = async (
    lobbyId: string,
    game?: Game,
): Promise<Lobby> => {
    const lobby = await lobbyDB.findOneAndUpdate(
        { _id: lobbyId },
        { game: game },
    );

    if (!lobby) {
        throw new APIError(500, `Could not set game`);
    }

    return await getLobbyById(lobbyId);
};

export const updatePlayer = async (
    lobbyId: string,
    player: Player,
): Promise<Lobby> => {
    let lobby = await lobbyDB.findOneAndUpdate(
        { _id: lobbyId },
        { $pull: { players: { _id: player._id } } },
    );

    if (!lobby) {
        throw new APIError(500, `Could not update player`);
    }

    lobby = await lobbyDB.findOneAndUpdate(
        { _id: lobbyId },
        { $push: { players: player } },
    );

    if (!lobby) {
        throw new APIError(500, `Could not update player`);
    }

    return await getLobbyById(lobbyId);
};

export const formatLobbyResponse = async (
    lobby: Lobby,
): Promise<LobbyResponse> => ({
    _id: lobby._id,

    host: formatPlayerResponse(lobby.host),
    players: lobby.players.map(
        (player: Player): PlayerResponse => formatPlayerResponse(player),
    ),

    game: await formatGameResponse(lobby.game),
});

export const websocketLobbyUpdate = async (lobby: Lobby): Promise<void> => {
    console.log(`websocketLobbyUpdate`);
    await sendToLobby(lobby, { lobby: lobby });
};

export const websocketLobbyUpdateById = async (
    lobbyId: string,
): Promise<void> => {
    await websocketLobbyUpdate(await getLobbyById(lobbyId));
};
