import { AES, enc } from 'crypto-js';
import config from '../../config.json';

const setHighscoreReducer = (
  state = (localStorage.getItem('highscore-minesweeper'))
    ? AES.decrypt(localStorage.getItem('highscore-minesweeper'), config.PRIVATE_KEY).toString(enc.Utf8)
    : [],
  action
) => {
  switch (action.type) {
    case 'UPDATE_HIGHSCORE':
      localStorage.setItem('highscore-minesweeper', AES.encrypt(JSON.stringify(action.value), config.PRIVATE_KEY).toString());
      return action.value;
    default:
      return (typeof state === "string") ? JSON.parse(state) : state;
  }
}

export default setHighscoreReducer;