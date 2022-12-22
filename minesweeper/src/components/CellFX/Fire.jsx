import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { rng } from '../../game-logic';
import { animated, useTransition } from 'react-spring';


export default function Fire ({ show = true }) {
  const [data, setData] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setData({ x: rng(0,100), y: rng(0,100) });
  }, []);

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const AnimatedBox = animated(Box);

  return transitions((style, showTransition) => (
    (showTransition) ? (
      <AnimatedBox
        style={style}
        component='img'
        src={`${process.env.PUBLIC_URL}/sprites/fire.gif`}
        alt='Fire'
        sx={{
          position: 'absolute',
          opacity: 0.8,
          top: `${data.y}%`,
          left: `${data.x}%`,
          width: '150%',
          translate: '-50% -75%',
          zIndex: 2
        }}
      />
    ) : (
      null
    )
  ))
}