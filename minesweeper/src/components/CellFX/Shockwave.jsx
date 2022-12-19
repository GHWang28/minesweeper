import React from 'react';
import { Box, keyframes } from '@mui/material'


export default function Shockwave ({ length, color = 'white', radius = 5 }) {
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
      component='svg'
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
      sx={{
        animation: `${expandAnimation} ${length}s ease-out 1`,
        opacity: 0,
        position: 'absolute'
      }}
    >
      <circle cx='50' cy='50' r='40' stroke={color} strokeWidth='1' fill='none'/>
    </Box>
  )
}