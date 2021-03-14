import { Player, PlayerResponse } from './playerTypes';

import { prop } from '@typegoose/typegoose';

export class Lobby {
    @prop() _id: string;
    @prop() code: string;

    @prop() players: Player[];
}

export class LobbyResponse {
    _id: string;
    code: string;

    players: PlayerResponse[];
}
