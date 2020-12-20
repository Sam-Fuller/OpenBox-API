//@ts-check

const dotenv = require('dotenv')
dotenv.config()

const start = Date.now()

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_HOST}/OpenBox-DB`, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.set('useFindAndModify', false);

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log("Connected to MongoDB")
    console.log(Date.now() - start)
})


const gameInstanceSchema = new mongoose.Schema({
    _id: String,
    game: String,
    currentState: Object
}, { strict: false })

const gameInstance = mongoose.model('gameInstances', gameInstanceSchema)


const gameTemplateSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    author: String,
    defaultResource: String,
    game: Object
}, { strict: false })

const gameTemplate = mongoose.model('gameTemplates', gameTemplateSchema)

module.exports = {
    gameInstance,
    gameTemplate
}