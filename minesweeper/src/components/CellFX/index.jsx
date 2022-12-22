import React, { Fragment, useEffect, useState } from 'react';
import Flower from './Flower';
import Shockwave from './Shockwave';
import { rng } from '../../game-logic';
import Fire from './Fire';
import Explosion from './Explosion';
import Flag from './Flag';
import { useSelector } from 'react-redux';

export default function CellFx ({ data }) {

  const [hasFlower, setHasFlower] = useState(false);
  const gameOver = useSelector(state => state.gameOver);

  useEffect(() => {
    setHasFlower(rng(0, 3) === 0);
  }, [])

  return (
    <Fragment>
      {(gameOver && data.isMine) && (
        <Fragment>
          <Explosion length={1} centerColor='goldenrod' outerColor='#CC5500' radius={4} />
          <Shockwave length={1.5} color='whitesmoke' radius={12} />
        </Fragment>
      )}
      <Flag planted={data.isFlagged && !data.isSweeped} gameOver={gameOver}/>
      <Flower show={hasFlower && !gameOver && !data.isSweeped}/>
      <Fire show={hasFlower && gameOver}/>
    </Fragment>
  )
}