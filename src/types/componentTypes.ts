import { prop } from '@typegoose/typegoose';

export class Component {
    @prop() _id: string;

    @prop() requiredData: unknown;
}

export class SubmitButtonComponent extends Component {
    @prop() _id = `SubmitButton`;

    @prop() requiredData: undefined;
}

export class TextBoxComponent extends Component {
    @prop() _id = `TextBox`;

    @prop() requiredData: string;
}

export class CardComponent extends Component {
    @prop() _id = `Card`;

    @prop() requiredData: string;
}
