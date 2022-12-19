import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { rng } from '../../game-logic';
import { animated, useTransition } from 'react-spring';


export default function Flower ({ show = true }) {
  const [data, setData] = useState({ x: 0, y: 0, hue: 0 });

  useEffect(() => {
    setData({ x: rng(0,100), y: rng(0,100), hue: rng(0, 259) });
  }, []);

  const transitions = useTransition(show, {
    from: { scale: 0, rotate: '360deg' },
    enter: { scale: 1, rotate: '0deg', delay: rng(500, 2500) },
    leave: { scale: 0, rotate: '-360deg', duration: 2000 },
  })

  const AnimatedBox = animated(Box);

  return transitions((style, showTransition) => (
    (showTransition) ? (
      <AnimatedBox
        style={style}
        component='img'
        src='/sprites/flower.png'
        alt='Flower'
        sx={{
          position: 'absolute',
          filter: `hue-rotate(${data.hue}deg)`,
          top: `${data.y}%`,
          left: `${data.x}%`,
          width: '50%',
          translate: '-50% -50%',
          zIndex: 2
        }}
      />
    ) : (
      null
    )
  ))
}