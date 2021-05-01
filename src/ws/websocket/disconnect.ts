import { getWebsocketId } from '../../helpers/requestValidation';

export const disconnect = async (
    event: any,
): Promise<{
    message: string;
}> => {
    const websocketId = getWebsocketId(event);

    return { message: `disconnected` };
};
