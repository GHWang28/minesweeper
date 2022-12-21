const setGameOverReducer = (state = false, action) => {
  switch (action.type) {
    case 'GAME_OVER':
      return action.value;
    default:
      return state;
  }
}

export default setGameOverReducer;