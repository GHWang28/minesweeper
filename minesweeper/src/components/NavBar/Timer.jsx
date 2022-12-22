import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStopwatch } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { convertTimeToSeconds, recordHighscore } from '../../game-logic';
import { updateHighscore } from '../../redux/actions';
import { toast } from 'react-toastify';

export default function Timer ({ start, mines, dim }) {
  const timerData = useStopwatch({ autoStart: false });
  const gameOver = useSelector(state => state.gameOver);
  const gameWon = useSelector(state => state.gameWon);
  const highscore = useSelector(state => state.highscore);
  const dispatch = useDispatch();

  // Winning logic
  useEffect(() => {
    if (gameOver || gameWon) {
      if (gameWon) {
        toast('You win!');
        recordHighscore(
          (score) => { dispatch(updateHighscore(score)) },
          convertTimeToSeconds(timerData.days, timerData.hours, timerData.minutes, timerData.seconds),
          [...highscore],
          mines,
          dim
        );
      } else {
        toast.error('You lost!', {
          icon: false
        });
      }
      timerData.pause();
    } else if (start && !timerData.isRunning) {
      timerData.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, gameWon, start])

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
        color: (gameWon) ? 'rgb(255,246,53)' : ((gameOver) ? 'rgb(255,16,75)' : 'inherit')
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