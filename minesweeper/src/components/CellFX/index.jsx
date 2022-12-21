import React, { Fragment, useEffect, useState } from 'react';
import Flower from './Flower';
import Shockwave from './Shockwave';
import { rng } from '../../game-logic';
import Fire from './Fire';
import Explosion from './Explosion';
import Flag from './Flag';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export default function CellFx ({ data }) {

  const [hasFlower, setHasFlower] = useState(false);
  const [flameHue, setFlameHue] = useState(0);
  const gameOver = useSelector(state => state.gameOver);

  useEffect(() => {
    setHasFlower(rng(0, 3) === 0);
    setFlameHue(rng(20,340));
  }, [])

  return (
    <Fragment>
      {(gameOver && data.isMine) && (
        <Fragment>
          <Explosion length={1} centerColor='goldenrod' outerColor='#CC5500' radius={4} />
          <Shockwave length={1.5} color='whitesmoke' radius={12} />
        </Fragment>
      )}
      <Flag planted={data.isFlagged && !data.isSweeped && !gameOver}/>
      {(data.isFlagged && !data.isSweeped && gameOver) && (
        <Box
          component='img'
          src='/sprites/flaming-flag.gif'
          alt='Flaming Flag'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '130%',
            filter: `hue-rotate(${flameHue}deg)`,
            translate: '-50% -90%',
            zIndex: 2
          }}
        />
      )}
      <Flower show={hasFlower && !gameOver && !data.isSweeped}/>
      <Fire show={hasFlower && gameOver}/>
    </Fragment>
  )
}