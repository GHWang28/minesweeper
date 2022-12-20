import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { revealEntireBoard, createBoard, revealAdj, getTotalSweeped, rng } from '../../game-logic';
import Cell from '../Cell';
import CellFx from '../CellFX';
import NavBar from '../NavBar';
import useSound from 'use-sound';
import ExplosionSFX from '../../sfx/explosion.ogg';
import SweepSFX1 from '../../sfx/sweep-1.ogg';
import SweepSFX2 from '../../sfx/sweep-2.ogg';
import SweepSFX3 from '../../sfx/sweep-3.ogg';

export default function Board ({ dim, mines, gameManagement }) {

  const [boardData, setBoardData] = useState(createBoard(dim, mines));
  const [totalClicks, setTotalClicks] = useState(0);
  const [hoveringCell, setHoveringCell] = useState({ i: Math.floor(dim / 2), j: Math.floor(dim / 2) })

  // Play SFX
  const [playBoom] = useSound(ExplosionSFX);
  const [playSweep1] = useSound(SweepSFX1);
  const [playSweep2] = useSound(SweepSFX2);
  const [playSweep3] = useSound(SweepSFX3);

  if (!boardData) return null;

  const score = getTotalSweeped(boardData) / (Math.pow(dim, 2) - mines);
  if (score >= 1) {
    gameManagement.setGameWon(true);
  }

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
          height: 'min(6vh,6vw)'
        }}
        px={'3.8%'}
      >
        <NavBar
          mines={mines}
          progress={score}
          gameOver={gameManagement.gameOver}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Grid container sx={{ width: 'min(92vh,92vw)', height: 'min(92vh,92vw)' }}>
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
                    // Sweeping mechanic
                    setHoveringCell({ i: cell.i, j: cell.j });
                    switch (rng(0,2)) {
                      default: playSweep1(); break;
                      case 1: playSweep2(); break;
                      case 2: playSweep3(); break;
                    }
                    if (cell.isMine) {
                      playBoom();
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