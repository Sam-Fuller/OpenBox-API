import {
    Player,
    PlayerResponse,
    PlayerSecretResponse,
} from '../types/playerTypes';

import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto';
import sha512 from 'crypto-js/sha512';
import uuid from 'uuid-random';

export const secretToHash = (id: string, secret: string): string => {
    return Base64.stringify(sha512(secret + id));
};

export const createPlayer = (
    playerName: string,
): { player: Player; secret: string } => {
    const id = uuid();
    const secret = crypto.randomBytes(64).toString(`hex`);

    const player: Player = {
        _id: id,
        hash: secretToHash(secret, id),
        name: playerName,
    };

    return { player, secret };
};

export const formatPlayerResponse = (player: Player): PlayerResponse => {
    return {
        _id: player._id,
        name: player.name,
    };
};

export const formatPlayerSecretResponse = (
    player: Player,
    secret: string,
): PlayerSecretResponse => {
    return {
        _id: player._id,
        secret: secret,
        name: player.name,
    };
};
