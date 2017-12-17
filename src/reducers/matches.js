const matches = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MATCH':
            return [...state, {
                player1: action.p1,
                player2: action.p2,
                winner: action.winner,
                dt: new Date().toString().slice(0, 25)
            }]
        default:
            return state;
    }
};

export default matches;

//
// export const getRate = (state,p1,p2) =>
//     state.matches.filter(match => match.player1===p1 && match.player2===p2)
