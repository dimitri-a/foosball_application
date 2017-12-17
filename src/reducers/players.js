const players = (state = [{name: 'John', nrGames: 0, nrWins: 0}, {name: 'Ed', nrGames: 0, nrWins: 0}, {
    name: 'Mark',
    nrGames: 0,
    nrWins: 0
}], action) => {
    switch (action.type) {

        case 'ADD_PLAYER':
            return [...state, {name: action.name}]

        case 'ADD_WIN':
            console.log('player.name=', action.name);

            return state.map(checkWinner(action.name));

        default:
            return state;
    }
};

export default players;


const checkWinner = (name) => (player) => {
    //todo remove
    debugger;
    return name === player.name ? {...player, nrWins : player.nrWins+1,nrGames:player.nrGames+1} : player;
}
