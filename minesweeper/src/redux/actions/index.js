export const setGameWon = (isGameWon) => {
  return {
    type: 'GAME_WON',
    value: isGameWon
  }
}

export const setGameOver = (isGameOver) => {
  return {
    type: 'GAME_OVER',
    value: isGameOver
  }
}

export const setMute = (mute) => {
  return {
    type: 'MUTE',
    value: mute
  }
}

export const updateHighscore = (score) => {
  return {
    type: 'UPDATE_HIGHSCORE',
    value: score
  }
}
