import React from 'react';
import { Box } from '@mui/material';
import { animated, useTransition } from 'react-spring';
import FireFlag from './FireFlag';
import { PropTypes } from 'prop-types';

export default function Flag ({ planted, gameOver }) {
  const transitions = useTransition(planted, {
    from: { y: '0%', opacity: 1, rotate: '0deg', scaleY: 0.1 },
    enter: {  y: '0%', opacity: 1, rotate: '0deg', scaleY: 1 },
    leave: {  y: '-75%', opacity: 0, rotate: '360deg', scaleY: 1 }
  })
  const AnimatedBox = animated(Box);

  if (gameOver && planted) return <FireFlag />;

  return transitions((style, plantedTransition) => (
    plantedTransition ? (
      <AnimatedBox
        style={style}
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundSize: '50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transformOrigin: (planted) ? '50% 80%' : '',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'0.7\' width=\'16\' height=\'16\' fill=\'red\' class=\'bi bi-flag-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001\'/%3E%3C/svg%3E")',
          zIndex: 99
        }}
      />
    ) : (
      null
    )
  ))
}

Flag.propTypes = {
  planted: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired
}
