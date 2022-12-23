import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { rng } from '../../game-logic';

export default function FireFlag () {
  const [flameHue, setFlameHue] = useState(0);
  useEffect(() => {
    setFlameHue(rng(20, 340));
  }, [])

  return (
    <Box
      component='img'
      src={`${process.env.PUBLIC_URL}/sprites/flaming-flag.gif`}
      alt='Flaming Flag'
      sx={{
        position: 'absolute',
        opacity: 0.8,
        top: '50%',
        left: '50%',
        width: '130%',
        filter: `hue-rotate(${flameHue}deg)`,
        translate: '-50% -90%',
        zIndex: 2
      }}
    />
  )
}
