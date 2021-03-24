import express, { Request } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import { deleteLobby } from './lobby/DELETE';
import { deleteLobbyPlayers } from './lobby/players/DELETE';
import { getLobby } from './lobby/GET';
import { getLobbyPlayers } from './lobby/players/GET';
import { postLobby } from './lobby/POST';
import { putLobbyPlayers } from './lobby/players/PUT';
import { responseWrapper } from './helpers/messageSender';

const app = express();

const jsonParser = bodyParser.json();

const allowlist = [
    `https://www.open-box.io`,
    `https://open-box.io`,
    `https://localhost`,
    `http://localhost`,
    `localhost`,
    `https://localhost:3000`,
    `http://localhost:3000`,
    `localhost:3000`,
];
const corsOptionsDelegate = function (req: Request, callback: any) {
    let corsOptions;
    const corsOrigin = req.header(`Origin`);

    console.log(`origin`, corsOrigin);

    if (corsOrigin && allowlist.indexOf(corsOrigin) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: true };
    }
    callback(null, corsOptions);
};

app.use(cors());

app.delete(`/lobby`, jsonParser, (request, response) => {
    responseWrapper(request, response, deleteLobby);
});

app.get(`/lobby`, jsonParser, (request, response) => {
    responseWrapper(request, response, getLobby);
});

app.post(`/lobby`, jsonParser, (request, response) => {
    responseWrapper(request, response, postLobby);
});

app.delete(`/lobby/players`, jsonParser, (request, response) => {
    responseWrapper(request, response, deleteLobbyPlayers);
});

app.get(`/lobby/players`, jsonParser, (request, response) => {
    responseWrapper(request, response, getLobbyPlayers);
});

app.put(`/lobby/players`, jsonParser, (request, response) => {
    responseWrapper(request, response, putLobbyPlayers);
});

module.exports = app;
