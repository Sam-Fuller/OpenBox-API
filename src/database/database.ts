import { APIError } from '../types/types';
import { Gamemode } from '../types/gamemodeTypes';
import { Lobby } from '../types/lobbyTypes';
import dotenv from 'dotenv';
import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async (): Promise<void> => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_HOST}/OpenBox-DB`, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,

        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set(`useFindAndModify`, false);

    const db = mongoose.connection;
    db.on(`error`, () => {
        throw new APIError(500, `Could not connect to database`);
    });
    db.once(`open`, () => {
        console.log(`Connected to MongoDB`);
    });
};

export const disconnectDB = async (): Promise<void> => {
    await mongoose.disconnect();
};

export const lobbyDB = getModelForClass(Lobby);
export const gamemodeDB = getModelForClass(Gamemode);
