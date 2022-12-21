const setMuteReducer = (state = false, action) => {
  switch (action.type) {
    case 'MUTE':
      return action.value;
    default:
      return state;
  }
}

export default setMuteReducer;