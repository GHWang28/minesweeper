import { Box } from '@mui/material';
import React, { Fragment } from 'react';
import Shockwave from './Shockwave';

export default function CellFx ({ data }) {

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      {(data.isGameOver && data.isMine) && (
        <Fragment>
          <Box
            component='img'
            src='/sprites/explosion.gif'
            alt='Explosion'
            sx={{
              position: 'absolute',
              width: 'min(20vw,20vh)',
              bottom: '50%',
              zIndex: 2
            }}
          />
          <Shockwave length={1} color='whitesmoke' />
          <Shockwave length={1.2} color='whitesmoke' />
          <Shockwave length={0.75} color='red' radius={7} />
        </Fragment>
      )}
    </Box>
  )
}