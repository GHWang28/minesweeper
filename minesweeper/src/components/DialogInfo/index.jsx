import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Slide } from 'react-slideshow-image';

export default function DialogInfo ({ open, onClose }) {
  const [hover, setHover] = useState(false);
  const panels = [
    {
      src: `${process.env.PUBLIC_URL}/info/reveal.gif`,
      caption: '1. Left Click/Tap on a tile to reveal adjacent empty tiles. Clicking on a tile with a mine results in a "Game Over".'
    },
    {
      src: `${process.env.PUBLIC_URL}/info/surrounding.jpg`,
      caption: '2. Numbers on the tile tells you how many "Mines" there are in the 3x3 area around that tile. Use this information to your advantage and avoid sweeping mines.'
    },
    {
      src: `${process.env.PUBLIC_URL}/info/flag.gif`,
      caption: '3. Right click on a tile to place down a flag. You can also place a flag by long-pressing a tile. This can be used to keep track of tiles you suspect to be mines. You can remove the flag by right clicking the tile again.'
    },
    {
      src: `${process.env.PUBLIC_URL}/info/win-condition.jpg`,
      caption: '4. Reveal all tiles without a mine to win. The blue bar at the top can help with keeping track your progress.'
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <DialogTitle align='center' mb={0}>
        {'How to Play Minesweeper'}
      </DialogTitle>
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <Slide autoplay={false}>
          {panels.map((item, key) => (
            <Box key={`img-slide-${key}`} sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
              <Typography
                fontSize={20}
                align='center'
                fontWeight='bold'
                sx={{
                  position: 'absolute',
                  top: '0%',
                  width: '100%',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  transition: 'translate 0.2s ease-in-out',
                  translate: (hover) ? '0% -100%' : '0% 0%'
                }}
              >
                {item.caption}
              </Typography>
              <Box
                component='img'
                src={item.src}
                sx={{ maxHeight: '90%', maxWidth: '100%' }}
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