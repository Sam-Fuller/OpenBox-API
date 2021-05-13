import { LobbyResponse } from './lobbyTypes';
import { PlayerResponse } from './playerTypes';
import { PlayerView } from './componentTypes';

export enum WebsocketActionType {
    LOBBY_DELETED,

    GAME_REMOVED,
    GAME_CHANGED,

    PLAYER_LEFT,
    PLAYER_REMOVED,
    PLAYER_JOINED,
}

export class WebsocketAction {
    type: WebsocketActionType;
    player?: PlayerResponse;
}

export class WebsocketMessage {
    action: WebsocketAction;
    lobby?: LobbyResponse;
    playerView?: PlayerView;
}
