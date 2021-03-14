import { Request, Response } from 'express';

export const responseWrapper = async (
    request: Request,
    response: Response,
    endpointFunction: (request: Request) => unknown,
): Promise<void> => {
    try {
        const result = await endpointFunction(request);

        response.writeHead(200, { 'Content-Type': `application/json` });
        response.write(JSON.stringify(result));
        response.end();
    } catch (error) {
        response.writeHead(error.code ? error.code : 500, {
            'Content-Type': `application/json`,
        });
        response.write(JSON.stringify(error));
        response.end();
    }
};
