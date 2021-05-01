import { connect } from './websocket/connect';
import { disconnect } from './websocket/disconnect';

export const connectionHandler = async (
    event: any,
    context: any,
    callback: (a: null, response: unknown) => Promise<unknown>,
): Promise<void> => {
    if (event.requestContext.eventType === `CONNECT`) {
        await wsResponseWrapper(event, callback, connect);
    } else if (event.requestContext.eventType === `DISCONNECT`) {
        await wsResponseWrapper(event, callback, disconnect);
    }
};

// export const responseWrapper = async (
//     event: any,
//     context: any,
//     callback: (a: null, response: unknown) => Promise<unknown>,
//     //action: (event: unknown, context: unknown) => Promise<unknown>,
// ): Promise<void> => {
//     console.log(`event`, event);
//     console.log(`context`, context);
//     callback(null, { statusCode: 200, body: `helloworld` });

//     // try {
//     //     const result = await action(event, context);

//     //     console.log(200, JSON.stringify(result));

//     //     callback(null, {
//     //         statusCode: 200,
//     //         body: JSON.stringify(result),
//     //     });
//     // } catch (error) {
//     //     console.log(error.code ? error.code : 500, JSON.stringify(error));

//     //     callback(null, {
//     //         statusCode: error.code ? error.code : 500,
//     //         body: JSON.stringify(error),
//     //     });
//     // }
// };
export const wsResponseWrapper = async (
    event: any,
    callback: (a: null, response: unknown) => Promise<unknown>,
    asdasdgadfgadfgadfgadfg: (event: unknown) => Promise<unknown>,
): Promise<void> => {
    console.log(`event`, event);
    callback(null, { statusCode: 200, body: `helloworld` });
};
