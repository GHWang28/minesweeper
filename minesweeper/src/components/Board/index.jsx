import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { createBoard, revealAdj, getTotalSweeped, rng, setFlag, regenBoard } from '../../game-logic';
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
import { useDispatch, useSelector } from 'react-redux';
import { setGameOver, setGameWon } from '../../redux/actions';
import { PropTypes } from 'prop-types';

export default function Board ({ dim, mines, onReset, onShowInfo, onShowHighscore }) {
  // States
  const [boardData, setBoardData] = useState(createBoard(dim, mines));
  const [totalFlags, setTotalFlags] = useState(0);
  const [score, setScore] = useState(0);
  const [hoveringCell, setHoveringCell] = useState({ i: Math.floor(dim / 2), j: Math.floor(dim / 2) })

  // Redux
  const gameOver = useSelector(state => state.gameOver);
  const dispatch = useDispatch();

  // Play SFX
  const mute = useSelector(state => state.mute);
  const [playBoom] = useSound(ExplosionSFX);
  const [playSweep1] = useSound(SweepSFX1);
  const [playSweep2] = useSound(SweepSFX2);
  const [playSweep3] = useSound(SweepSFX3);
  const [playFlagSFX] = useSound(FlagSFX);
  const [playVictorySFX] = useSound(VictorySFX);

  // If data was not able to be generated, return nothing
  if (!boardData) return null;

  // Winning logic
  const checkWon = (cell, inputBoard) => {
    // Checking if won
    const newBoard = revealAdj(cell.i, cell.j, [...inputBoard]);
    const newScore = getTotalSweeped([...newBoard]) / (Math.pow(dim, 2) - mines);
    if (newScore >= 1) {
      dispatch(setGameWon(true));
      if (!mute) playVictorySFX();
    }
    setScore(newScore);
    setBoardData([...newBoard]);
  }
  // Sweeping logic
  const onSweep = (cell) => {
    // Sweeping mechanic
    setHoveringCell({ i: cell.i, j: cell.j });
    if (!mute) {
      switch (rng(0,2)) {
        default: playSweep1(); break;
        case 1: playSweep2(); break;
        case 2: playSweep3(); break;
      }
    }

    let newBoard = [...boardData];
    // Try and regenerate a new board if the player clicks on a bomb on first turn
    if ((cell.isMine || cell.totalAdjBombs !== 0) && score === 0) {
      newBoard = regenBoard(cell.i, cell.j, dim, [...boardData]);
    }

    // If a newboard was unable to be generated, trigger Game Over. Else, sweep as usual
    if (!newBoard || newBoard[cell.i][cell.j].isMine) {
      dispatch(setGameOver(true));
      if (!mute) playBoom();
    } else {
      checkWon(cell, [...newBoard]);
    }
  }
  // Flagging logic
  const onFlag = (cell) => {
    // Flagging mechanic
    if (gameOver) return;
    if (!mute) playFlagSFX();
    setBoardData(setFlag(cell.i, cell.j, [...boardData], { totalFlags, setTotalFlags }));
  }

  return (
    <Grid
      container
      sx={{
        bgcolor: (gameOver) ? 'rgb(30,30,30)' : 'rgb(35,116,14)',
        width: 'min(100vh,100vw)',
        height: 'min(100vh,100vw)',
        overflow: 'hidden'
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          bgcolor: (gameOver) ? 'rgb(30,30,30)' : 'rgb(35,116,14)',
          height: 'min(6vh,6vw)'
        }}
        px={'3.8%'}
      >
        <NavBar
          mines={mines}
          dim={dim}
          progress={score}
          gameOver={gameOver}
          totalFlags={totalFlags}
          onReset={onReset}
          onShowInfo={onShowInfo}
          onShowHighscore={onShowHighscore}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Grid container sx={{ width: 'min(92vh,92vw)', height: 'min(92vh,92vw)' }}>
          {boardData.map((row, indexI) => (
            row.map((cell, indexJ) => (
              <Grid
                key={`cell-${cell.key}`}
                item
                xs={12 / dim}
                sx={{
                  position: 'relative'
                }}
              >
                <Cell
                  data={cell}
                  odd={(indexI + indexJ) % 2 === 0}
                  startOfGame={score === 0}
                  hoveringCell={hoveringCell}
                  onLeftClick={() => { onSweep(cell) }}
                  onRightClick={() => { onFlag(cell) }}
                />
              </Grid>
            ))
          ))}
        </Grid>
        {/* sfx */}
        <Grid
          container
          sx={{
            pointerEvents: 'none',
            width: 'min(92vh,92vw)',
            height: 'min(92vh,92vw)',
            position: 'absolute'
          }}
        >
          {boardData.map((row) => (
            row.map((cell) => (
              <Grid
                key={`cell-sfx-${cell.key}`}
                item
                xs={12 / dim}
                sx={{ position: 'relative', pointerEvents: 'none' }}
              >
                <CellFx data={cell}/>
              </Grid>
            ))
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

Board.propTypes = {
  dim: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
  onShowInfo: PropTypes.func.isRequired,
  onShowHighscore: PropTypes.func.isRequired
}
