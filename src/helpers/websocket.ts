import AWS from 'aws-sdk';
import { Lobby } from '../types/lobbyTypes';
import { Player } from '../types/playerTypes';

export const getEndpoint = (): string => {
    return `ws.open-box.io`;
};

export const getAwsgwManagementApi = () => {
    return new AWS.ApiGatewayManagementApi({
        apiVersion: `2018-11-29`,
        endpoint: getEndpoint(),
    });
};

export const sendToLobby = async (
    lobby: Lobby,
    message: any,
): Promise<void> => {
    const apigwManagementApi = getAwsgwManagementApi();

    console.log(JSON.stringify(lobby.players));

    for (let i = 0; i < lobby.players.length; i++) {
        const player = lobby.players[i];

        if (!player.websocketId) continue;

        const params = {
            ConnectionId: player.websocketId,
            Data: JSON.stringify(message),
        };

        await apigwManagementApi
            .postToConnection(params)
            .promise()
            .then(() => {
                console.log(`updated player: ${player._id}`);
            });
    }
};
