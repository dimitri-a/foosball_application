const players = (state = [{name:'John'},{name:'Ed'},{name:'Mark'}], action) => {
    switch (action.type) {

        case 'ADD_PLAYER':
            return [...state,{name:action.name}]
        default:
            return state;
    }
};

export default players;
