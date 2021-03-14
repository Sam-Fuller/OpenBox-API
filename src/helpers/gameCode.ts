const timeNumbersInGameId = 4;
const randomNumbersInGameId = 1;

export const generateGameCode = (): string => {
    const id = (Date.now() % Math.pow(36, timeNumbersInGameId))
        .toString(36)
        .toUpperCase();
    +``
        + Math.floor(Math.random() * Math.pow(36, randomNumbersInGameId))
            .toString(36)
            .toUpperCase();

    return id;
};
