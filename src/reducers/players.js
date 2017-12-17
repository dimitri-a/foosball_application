const players = (state = [
                     {name: 'John', nrGames: 0, nrWins: 0},
                     {name: 'Ed', nrGames: 0, nrWins: 0},
                     {name: 'Mark', nrGames: 0, nrWins: 0}
                 ]
    , action) => {
    switch (action.type) {

        case 'ADD_PLAYER':
            return [...state, {name: action.name, nrWins: 0, nrGames: 0}]

        case 'ADD_WIN':
            return state.map(checkWinner(action.name));

        case 'ADD_LOSS':
            return state.map(updateGameNr(action.name));

        default:
            return state;
    }
};

export default players;

const checkWinner = (name) => (player) => {
    return name === player.name ? {...player, nrWins: player.nrWins + 1, nrGames: player.nrGames + 1} : player;
}

const updateGameNr = (name) => (player) => {
    return name === player.name ? {...player, nrGames: player.nrGames + 1} : player;
}

