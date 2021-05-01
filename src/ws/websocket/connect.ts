import { getWebsocketId } from '../../helpers/requestValidation';

export const connect = async (
    event: any,
): Promise<{
    message: string;
}> => {
    const websocketId = getWebsocketId(event);
    return { message: `connected` };
};
