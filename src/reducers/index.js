import { combineReducers } from 'redux';
import players from './players';
import matches from './matches';

const foosballApp = combineReducers({
    players,
    matches,
});

export default foosballApp;
