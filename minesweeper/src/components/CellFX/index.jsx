import React, { Fragment, useEffect, useState } from 'react';
import Flower from './Flower';
import Shockwave from './Shockwave';
import { rng } from '../../game-logic';
import Fire from './Fire';
import Explosion from './Explosion';
import Flag from './Flag';

export default function CellFx ({ data, gameOver }) {

  const [hasFlower, setHasFlower] = useState(false);

  useEffect(() => {
    setHasFlower(rng(0, 2) === 0);
  }, [])

  return (
    <Fragment>
      <Flag planted={data.isFlagged && !data.isSweeped && !gameOver}/>
      {(gameOver && data.isMine) && (
        <Fragment>
          <Explosion length={1} centerColor='goldenrod' outerColor='#CC5500' radius={4} />
          <Shockwave length={1.5} color='whitesmoke' radius={12} />
        </Fragment>
      )}
      {(hasFlower) && (
        <Flower show={!gameOver && !data.isSweeped}/>
      )}
      {(hasFlower && gameOver) && (
        <Fire />
      )}
    </Fragment>
  )
}