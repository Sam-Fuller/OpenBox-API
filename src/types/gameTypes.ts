import { prop } from 'typegoose';

export class Game {
    @prop() gamemode_id: string;
    @prop() currentState: unknown;
}