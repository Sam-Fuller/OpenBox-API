//@ts-check

const express = require('express')
const bodyParser = require('body-parser')

const getState = require("./api/getState")
const submit = require('./api/submit')
const createGame = require('./api/create')
const login = require('./api/login')
const getGames = require('./api/getGames')

const app = express()
const jsonParser = bodyParser.json()

app.get('/game/state', (request, response) => {
  getState(request, response)
})

app.post('/game/submit', jsonParser, (request, response) => {
  submit(request, response)
})

app.post('/game/create', jsonParser, (request, response) => {
  createGame(request, response)
})

app.post('/game/join', jsonParser, (request, response) => {
  login(request, response)
})

app.get('/templates/list', (request, response) => {
  getGames(request, response)
})

app.post('/templates/create', jsonParser, () =>  {
  
})

module.exports = app;