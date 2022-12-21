const setGameWonReducer = (state = false, action) => {
  switch (action.type) {
    case 'GAME_WON':
      return action.value;
    default:
      return state;
  }
}

export default setGameWonReducer;