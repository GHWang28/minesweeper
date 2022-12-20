import React from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';

export default function NavBar ({ mines, progress, gameOver }) {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={1} sx={{ height: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'2\' fill=\'red\' viewBox=\'0 0 50 50\'%3E%3Cpath style=\'line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:%23000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal\' d=\'M 24.984375 1.9863281 A 1.0001 1.0001 0 0 0 24 3 L 24 7.0488281 C 19.788099 7.2817221 15.969452 8.9603227 13.021484 11.607422 L 10.150391 8.7363281 A 1.0001 1.0001 0 0 0 9.4335938 8.4335938 A 1.0001 1.0001 0 0 0 8.7363281 10.150391 L 11.603516 13.017578 C 8.9676792 15.970574 7.2834883 19.792069 7.0507812 24 L 3 24 A 1.0001 1.0001 0 1 0 3 26 L 7.0507812 26 C 7.2834883 30.207931 8.9676792 34.029426 11.603516 36.982422 L 8.7363281 39.849609 A 1.0001 1.0001 0 1 0 10.150391 41.263672 L 13.021484 38.392578 C 15.969452 41.039677 19.788099 42.718278 24 42.951172 L 24 47 A 1.0001 1.0001 0 1 0 26 47 L 26 42.951172 C 30.211901 42.718278 34.030548 41.039677 36.978516 38.392578 L 39.849609 41.263672 A 1.0001 1.0001 0 1 0 41.263672 39.849609 L 38.396484 36.982422 C 41.032321 34.029426 42.716512 30.207931 42.949219 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 42.949219 24 C 42.716512 19.792069 41.032321 15.970574 38.396484 13.017578 L 41.263672 10.150391 A 1.0001 1.0001 0 0 0 40.537109 8.4335938 A 1.0001 1.0001 0 0 0 39.849609 8.7363281 L 36.978516 11.607422 C 34.030548 8.9603227 30.211901 7.2817221 26 7.0488281 L 26 3 A 1.0001 1.0001 0 0 0 24.984375 1.9863281 z M 20.5 15 C 23.538 15 26 17.462 26 20.5 C 26 23.538 23.538 26 20.5 26 C 17.462 26 15 23.538 15 20.5 C 15 17.462 17.462 15 20.5 15 z\'/%3E%3C/svg%3E")'
          }}
        />
      </Grid>
      <Grid item xs={5} sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Typography fontSize={'min(4vh,4vw)'} color='whitesmoke'>
          {`Total Mines: ${mines}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LinearProgress
          variant='determinate'
          value={(gameOver) ? 0 :progress * 100}
          sx={{
            height: 'min(1vh,1vw)',
            backgroundColor: (gameOver) ? 'red' : 'black',
            transition: 'background-color 0.2s ease-in-out'
          }}
        />
      </Grid>
    </Grid>
  )
}