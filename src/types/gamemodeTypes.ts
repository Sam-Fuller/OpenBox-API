import { prop } from '@typegoose/typegoose';

export class GamemodeOperation {}

export class GamemodeState {}

export class Gamemode {
    @prop() _id: string;
    @prop() name: string;
}

export class GamemodeResponse {
    _id: string;
    name: string;
}
