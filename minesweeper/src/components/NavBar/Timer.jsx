import React from 'react';
import { Grid, Typography } from '@mui/material';

export default function Timer ({ timerData, gameOver }) {

  return (
    <Grid
      item
      xs={4}
      sx={{
        height: '100%',
        bgcolor: 'gray',
        borderRadius: 'min(1vh,1vw)',
        border: `min(0.3vh,0.3vw) solid whitesmoke`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: (!gameOver) ? 'inherit' : 'red'
      }}
    >
      <Typography fontSize={'min(4vh,4vw)'}>
        {timerData.days.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        {':'}
        {timerData.hours.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        {':'}
        {timerData.minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        {':'}
        {timerData.seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
      </Typography>
    </Grid>
  )

  
}