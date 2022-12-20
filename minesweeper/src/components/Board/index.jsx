import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { createBoard, revealAdj, getTotalSweeped, rng, setFlag } from '../../game-logic';
import Cell from '../Cell';
import CellFx from '../CellFX';
import NavBar from '../NavBar';
import useSound from 'use-sound';
import ExplosionSFX from '../../sfx/explosion.ogg';
import SweepSFX1 from '../../sfx/sweep-1.ogg';
import SweepSFX2 from '../../sfx/sweep-2.ogg';
import SweepSFX3 from '../../sfx/sweep-3.ogg';
import FlagSFX from '../../sfx/flag.ogg';
import VictorySFX from '../../sfx/victory.ogg';

export default function Board ({ dim, mines, gameManagement, onReset }) {

  const [boardData, setBoardData] = useState(createBoard(dim, mines));
  const [totalFlags, setTotalFlags] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [hoveringCell, setHoveringCell] = useState({ i: Math.floor(dim / 2), j: Math.floor(dim / 2) })

  // Play SFX
  const [playBoom] = useSound(ExplosionSFX);
  const [playSweep1] = useSound(SweepSFX1);
  const [playSweep2] = useSound(SweepSFX2);
  const [playSweep3] = useSound(SweepSFX3);
  const [playFlagSFX] = useSound(FlagSFX);
  const [playVictorySFX] = useSound(VictorySFX);
  const score = getTotalSweeped(boardData) / (Math.pow(dim, 2) - mines);

  useEffect(() => {
    if (score >= 1) {
      gameManagement.setGameWon(true);
      playVictorySFX();
    }
  }, [score, gameManagement, playVictorySFX])

  if (!boardData) return null;

  const onSweep = (cell) => {
    // Sweeping mechanic
    setHoveringCell({ i: cell.i, j: cell.j });
    switch (rng(0,2)) {
      default: playSweep1(); break;
      case 1: playSweep2(); break;
      case 2: playSweep3(); break;
    }
    if (cell.isMine) {
      playBoom();
      gameManagement.setGameOver(true);
    } else {
      setBoardData(revealAdj(cell.i, cell.j, [...boardData]));
      setTotalClicks(totalClicks + 1);
    }
  }
  const onFlag = (cell) => {
    // Flagging mechanic
    playFlagSFX();
    setTotalFlags(Math.max(0, totalFlags + (boardData[cell.i][cell.j].isFlagged) ? 1 : -1));
    setBoardData(setFlag(cell.i, cell.j, [...boardData]));
  }
  const onResetWrap = () => {
    // Resetting the game
    setTotalFlags(0);
    setTotalClicks(0);
    onReset();
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
          totalFlags={totalFlags}
          onReset={onResetWrap}
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
                  perspective: '500px'
                }}
              >
                <Cell
                  data={cell}
                  odd={(indexI + indexJ) % 2 === 0}
                  startOfGame={totalClicks === 0}
                  hoveringCell={hoveringCell}
                  gameOver={gameManagement.gameOver}
                  gameWon={gameManagement.gameWon}
                  onLeftClick={() => { onSweep(cell) }}
                  onRightClick={() => { onFlag(cell) }}
                />
              </Grid>
            ))
          ))}
        </Grid>
        {/* sfx */}
        <Grid container sx={{ pointerEvents: 'none', width: 'min(92vh,94vw)', height: 'min(92vh,92vw)', position: 'absolute' }}>
          {boardData.map((row, indexI) => (
            row.map((cell, indexJ) => (
              <Grid
                key={`cell-${indexI}-${indexJ}`}
                item
                xs={12 / dim}
                sx={{ position: 'relative', pointerEvents: 'none' }}
              >
                <CellFx
                  data={cell}
                  gameOver={gameManagement.gameOver}
                />
              </Grid>
            ))
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}