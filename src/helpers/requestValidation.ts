import { APIError } from '../types/types';
import { Request } from 'express';

const nameValidation = (name: string): string => {
    if (!name) {
        throw new APIError(400, `No name provided`);
    }

    if (name.length < 3) {
        throw new APIError(400, `Name must be at least 3 characters`);
    }

    return name;
};

const stringValidation = (
    id: string | string[] | undefined,
    message: string,
): string => {
    if (!id) {
        throw new APIError(400, `No ${message} provided`);
    }

    if (!(typeof id === `string`)) {
        throw new APIError(400, `Invalid ${message}`);
    }

    return id;
};

export const getPlayerName = (request: Request): string => {
    return nameValidation(request.body?.playername);
};

export const getPlayerId = (request: Request): string => {
    return stringValidation(request.headers?.playerid, `playerId`);
};

export const getPlayerSecret = (request: Request): string => {
    return stringValidation(request.headers?.secret, `secret`);
};

export const getTargetPlayerId = (request: Request): string => {
    return stringValidation(request.body?.playerid, `playerId`);
};

export const getLobbyId = (request: Request): string => {
    return stringValidation(request.headers?.lobbyid, `lobbyId`);
};
