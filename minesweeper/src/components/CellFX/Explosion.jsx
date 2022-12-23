import React from 'react';
import { Box, keyframes } from '@mui/material'
import { PropTypes } from 'prop-types';

export default function Explosion ({ length, centerColor, outerColor, radius = 5 }) {
  const expandAnimation = keyframes`
    0% {
      scale: 0;
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      scale: ${radius};
      opacity: 0;
    }
  `
  return (
    <Box
      name='explode'
      component='svg'
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
      sx={{
        animation: `${expandAnimation} ${length}s ease-out 1`,
        opacity: 0,
        position: 'absolute',
        zIndex: 3
      }}
    >
      <defs>
        <radialGradient id='explosion' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
          <stop offset='0%' style={{ stopColor: centerColor }} />
          <stop offset='100%' style={{ stopColor: outerColor }} />
        </radialGradient>
      </defs>
      <circle fill='url(#explosion)' cx='50' cy='50' r='40' stroke={outerColor} strokeWidth='1' />
    </Box>
  )
}

Explosion.propTypes = {
  length: PropTypes.number,
  centerColor: PropTypes.string,
  outerColor: PropTypes.string,
  radius: PropTypes.number,
}
