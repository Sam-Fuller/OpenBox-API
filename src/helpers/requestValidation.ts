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

const idValidation = (id: string | string[] | undefined): string => {
    if (!id) {
        throw new APIError(400, `No lobbyId provided`);
    }

    if (!(typeof id === `string`)) {
        throw new APIError(400, `Invalid lobbyId`);
    }

    return id;
};

export const getPlayerName = (request: Request): string => {
    return nameValidation(request.body?.playername);
};

export const getLobbyId = (request: Request): string => {
    return idValidation(request.headers?.lobbyid);
};
