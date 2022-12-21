import { combineReducers } from '@reduxjs/toolkit';
import setGameOverReducer from './setGameOverReducer';
import setGameWonReducer from './setGameWonReducer';
import setHighscoreReducer from './setHighscoreReducer';
import setMuteReducer from './setMuteReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  gameWon: setGameWonReducer,
  gameOver: setGameOverReducer,
  mute: setMuteReducer,
  highscore: setHighscoreReducer
})

export default combinedReducer;