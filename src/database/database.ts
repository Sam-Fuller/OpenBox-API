import { Gamemode } from '../types/gamemodeTypes';
import { Lobby } from '../types/lobbyTypes';
import dotenv from 'dotenv';
import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_HOST}/OpenBox-DB`, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,

    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set(`useFindAndModify`, false);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error`));
db.once(`open`, () => {
    console.log(`Connected to MongoDB`);
});

export const lobbyDB = getModelForClass(Lobby);
export const gamemodeDB = getModelForClass(Gamemode);
