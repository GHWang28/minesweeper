import { Grid } from '@mui/material';
import React, { useState } from 'react';
import revealEntireBoard, { createBoard, revealAdj } from '../../game-logic';
import Cell from '../Cell';
import CellFx from '../CellFX';

export default function Board ({ dim, mines, gameManagement }) {

  const [boardData, setBoardData] = useState(createBoard(dim, mines));
  const [totalClicks, setTotalClicks] = useState(0);
  const [hoveringCell, setHoveringCell] = useState({ i: Math.floor(dim / 2), j: Math.floor(dim / 2) })

  if (!boardData) return null;

  return (
    <Grid
      container
      sx={{
        bgcolor: (gameManagement.gameOver) ? 'rgb(30,30,30)' : 'rgb(35,116,14)',
        width: 'min(100vh,100vw)',
        height: 'min(100vh,100vw)',
        overflow: 'hidden'
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          bgcolor: (gameManagement.gameOver) ? 'rgb(30,30,30)' : 'rgb(35,116,14)',
          height: 'min(5vh,5vw)'
        }}
      >

      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Grid container sx={{ width: 'min(94vh,94vw)', height: 'min(94vh,94vw)' }}>
          {boardData.map((row, indexI) => (
            row.map((cell, indexJ) => (
              <Grid
                key={`cell-${indexI}-${indexJ}`}
                item
                xs={12 / dim}
                sx={{
                  position: 'relative',
                  color: (cell.isGameOver) ? 'whitesmoke' : 'black',
                }}
              >
                <Cell
                  data={cell}
                  startOfGame={totalClicks === 0}
                  hoveringCell={hoveringCell}
                  onClick={() => {
                    setHoveringCell({ i: cell.i, j: cell.j })
                    if (cell.isMine) {
                      setBoardData(revealEntireBoard([...boardData]));
                      gameManagement.setGameOver(true);
                    } else {
                      setBoardData(revealAdj(indexI, indexJ, [...boardData]));
                      setTotalClicks(totalClicks + 1);
                    }
                  }}
                />
              </Grid>
            ))
          ))}
        </Grid>
        {/* sfx */}
        <Grid container sx={{ pointerEvents: 'none', width: 'min(94vh,94vw)', height: 'min(94vh,94vw)', position: 'absolute' }}>
          {boardData.map((row, indexI) => (
            row.map((cell, indexJ) => (
              <Grid
                key={`cell-${indexI}-${indexJ}`}
                item
                xs={12 / dim}
                sx={{
                  position: 'relative',
                  pointerEvents: 'none'
                }}
              >
                <CellFx
                  data={cell}
                />
              </Grid>
            ))
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}