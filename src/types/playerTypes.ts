import { prop } from '@typegoose/typegoose';

export class Player {
    @prop() _id: string;
    @prop() hash: string;
    @prop() name: string;
}

export class PlayerResponse {
    _id: string;
    name: string;
}

export class PlayerSecretResponse {
    _id: string;
    secret: string;
    name: string;
}
