import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Slide } from 'react-slideshow-image';

export default function DialogInfo ({ open, onClose }) {
  const [hover, setHover] = useState(false);
  const panels = [
    {
      src: '/info/reveal.gif',
      caption: '1. Left Click/Tap on a tile to reveal adjacent empty tiles'
    },
    {
      src: '/info/surrounding.jpg',
      caption: '2. Numbers on the tile tells you how many "Mines" there are in the 3x3 area around that tile. Use this information to your advantage.'
    },
    {
      src: '/info/flag.gif',
      caption: '3. Right Click/Hold Press on a tile to place a flag. This is purely to help you remember which tiles you think there is a mine. You can remove the flag by Right clicking/Hold Press. You can not reveal a flagged tile.'
    },
    {
      src: '/info/win-condition.jpg',
      caption: '4. Reveal all tiles without a mine to win. The blue bar at the top can help with keeping track your progress.'
    },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align='center' mb={0}>
        {'How to Play Minesweeper'}
      </DialogTitle>
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <Slide autoplay={false}>
          {panels.map((item, key) => (
            <Box key={`img-slide-${key}`} sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Typography
                fontSize={20}
                align='center'
                p={1}
                sx={{
                  position: 'absolute',
                  bottom: '0.6%',
                  width: '97.5%',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  transition: 'translate 0.2s ease-in-out',
                  translate: (hover) ? '0% 100%' : '0% 0%'
                }}
              >
                {item.caption}
              </Typography>
              <Box
                component='img'
                src={item.src}
                sx={{ width: '100%' }}
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
              />
            </Box>
          ))}
        </Slide>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}