import bodyParser from 'body-parser';
import cors from 'cors';
import { deleteLobby } from './lobby/DELETE';
import { deleteLobbyGame } from './lobby/game/DELETE';
import { deleteLobbyPlayers } from './lobby/players/DELETE';
import express from 'express';
import { getGamemode } from './gamemode/GET';
import { getLobby } from './lobby/GET';
import { getLobbyGame } from './lobby/game/GET';
import { getLobbyPlayers } from './lobby/players/GET';
import { postLobby } from './lobby/POST';
import { putLobbyGame } from './lobby/game/PUT';
import { putLobbyPlayers } from './lobby/players/PUT';
import { responseWrapper } from './helpers/messageSender';

const app = express();

const jsonParser = bodyParser.json();

const allowlist = [
    `https://www.open-box.io`,
    `http://localhost:3001`,
    `http://localhost:3000`,
];

const corsOptionsDelegate = (req: any, callback: any) => {
    let corsOptions;
    console.log(`origin`, req.header(`Origin`));
    if (allowlist.indexOf(req.header(`Origin`)) !== -1) {
        corsOptions = { origin: true };
        console.log(`cors accepted`);
    } else {
        corsOptions = { origin: false };
        console.log(`cors rejected`);
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

app.options(`/lobby/game`, cors(corsOptionsDelegate));

app.delete(
    `/lobby/game`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, deleteLobbyGame);
    },
);

app.get(
    `/lobby/game`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, getLobbyGame);
    },
);

app.put(
    `/lobby/game`,
    cors(corsOptionsDelegate),
    jsonParser,
    (request, response) => {
        responseWrapper(request, response, putLobbyGame);
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
