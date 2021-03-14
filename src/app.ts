//@ts-check

import bodyParser from 'body-parser';
import express from 'express';
import { getLobby } from './lobby/GET';
import { getLobbyPlayers } from './lobby/players/GET';
import { postLobby } from './lobby/POST';
import { putLobbyPlayers } from './lobby/players/PUT';
import { responseWrapper } from './helpers/messageSender';

const app = express();

const jsonParser = bodyParser.json();

app.get(`/lobby`, jsonParser, (request, response) => {
    responseWrapper(request, response, getLobby);
});

app.post(`/lobby`, jsonParser, (request, response) => {
    responseWrapper(request, response, postLobby);
});

app.get(`/lobby/players`, jsonParser, (request, response) => {
    responseWrapper(request, response, getLobbyPlayers);
});

app.put(`/lobby/players`, jsonParser, (request, response) => {
    responseWrapper(request, response, putLobbyPlayers);
});

module.exports = app;
