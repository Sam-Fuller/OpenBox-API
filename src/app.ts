import express, { Request } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import { deleteLobby } from './lobby/DELETE';
import { deleteLobbyPlayers } from './lobby/players/DELETE';
import { getGamemode } from './gamemode/GET';
import { getLobby } from './lobby/GET';
import { getLobbyPlayers } from './lobby/players/GET';
import { postLobby } from './lobby/POST';
import { putLobbyPlayers } from './lobby/players/PUT';
import { responseWrapper } from './helpers/messageSender';

const app = express();

const jsonParser = bodyParser.json();

const allowlist = [`https://www.open-box.io`, `http://localhost:3001`];

const corsOptionsDelegate = (req: any, callback: any) => {
    let corsOptions;
    console.log(`origin`, req.header(`Origin`));
    if (allowlist.indexOf(req.header(`Origin`)) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.options(`/lobby`, cors(corsOptionsDelegate));

app.delete(
    `/lobby`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, deleteLobby);
    },
);

app.get(
    `/lobby`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, getLobby);
    },
);

app.post(
    `/lobby`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, postLobby);
    },
);

app.options(`/lobby/players`, cors(corsOptionsDelegate));

app.delete(
    `/lobby/players`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, deleteLobbyPlayers);
    },
);

app.get(
    `/lobby/players`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, getLobbyPlayers);
    },
);

app.put(
    `/lobby/players`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, putLobbyPlayers);
    },
);

app.options(`/gamemode`, cors(corsOptionsDelegate));

app.get(
    `/gamemode`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, getGamemode);
    },
);

module.exports = app;
