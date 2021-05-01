import { Request, Response } from 'express';

export const responseWrapper = async (
    request: Request,
    response: Response,
    endpointFunction: (request: Request) => unknown,
): Promise<void> => {
    try {
        const result = await endpointFunction(request);

        console.log(200, { 'Content-Type': `application/json` });
        console.log(JSON.stringify(result));

        response.writeHead(200, { 'Content-Type': `application/json` });
        response.write(JSON.stringify(result));
        response.end();
    } catch (error) {
        console.log(error.code ? error.code : 500, {
            'Content-Type': `application/json`,
        });
        console.log(JSON.stringify(error));

        response.writeHead(error.code ? error.code : 500, {
            'Content-Type': `application/json`,
        });
        response.write(JSON.stringify(error));
        response.end();
    }
};
