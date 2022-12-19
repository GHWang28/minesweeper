import React, { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Flower from './Flower';
import Shockwave from './Shockwave';
import { rng } from '../../game-logic';
import Fire from './Fire';

export default function CellFx ({ data }) {

  const [hasFlower, setHasFlower] = useState(false);

  useEffect(() => {
    setHasFlower(rng(0, 2) === 0);
  }, [])

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
              zIndex: 2
            }}
          />
          <Shockwave length={0.75} color='red' />
          <Shockwave length={0.75} color='orange' radius={6} />
          <Shockwave length={0.5} color='whitesmoke' radius={7} />
        </Fragment>
      )}
      {(hasFlower) && (
        <Flower show={!data.isGameOver && !data.isSweeped}/>
      )}
      {(hasFlower && data.isGameOver) && (
        <Fire />
      )}
    </Box>
  )
}