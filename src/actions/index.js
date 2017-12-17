import * as types from '../constants/ActionTypes'

export const addPlayer = name => ({ type: types.ADD_PLAYER, name });
export const addWin = (name) => ({ type: types.ADD_WIN,name });
export const addLoss = (name) => ({ type: types.ADD_LOSS,name });
export const addMatch = (p1,p2,winner) => ({ type: types.ADD_MATCH, p1:p1,p2:p2,winner:winner});

