//@ts-check
//node -r esm app.js

const express = require('express')
const bodyParser = require('body-parser')

const getState = require("./api/getState")
const submit = require('./api/submit')
const create = require('./api/create')
const login = require('./api/login')
const getGames = require('./api/getGames')

const app = express()
const jsonParser = bodyParser.json()

app.get('/', (request, response) => {
  getState(request, response)
})

app.post('/', jsonParser, (request, response) => {
  submit(request, response)
})

app.post('/game', jsonParser, (request, response) => {
  create(request, response)
})

app.post('/join', jsonParser, (request, response) => {
  login(request, response)
})

app.get('/games', (request, response) => {
  getGames(request, response)
})

module.exports = app;