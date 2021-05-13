import { prop } from '@typegoose/typegoose';

export class Component {
    @prop() type: string;

    @prop() data: unknown;
}

export class SubmitButtonComponent extends Component {
    @prop() type = `SubmitButton`;

    @prop() data: undefined;
}

export class TextBoxComponent extends Component {
    @prop() type = `TextBox`;

    @prop() data: string;
}

export class CardComponent extends Component {
    @prop() type = `Card`;

    @prop() data: string;
}

export class PlayerView {
    @prop() playerId: string;
    @prop() view: Component[];
}

export class PlayerViewResponse {
    playerId: string;
    view: Component[];
}
