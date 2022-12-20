import './App.css';
import React, { Fragment, useState } from 'react';
import StartGameDialog from './components/StartGameDialog';
import Board from './components/Board';
import { Box } from '@mui/material';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size'

function App() {
  const [showStart, setShowStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [dim, setDim] = useState(10);
  const [mines, setMines] = useState(5);
  const [width, height] = useWindowSize()
  
  return (
    <Fragment>
      {(gameWon && !gameOver) && (
        <ReactConfetti width={width} height={height} numberOfPieces={1000}/>
      )}
      <StartGameDialog
        open={showStart}
        onClose={(totalMines, boardDimension) => {
          setDim(boardDimension);
          setMines(totalMines);
          setShowStart(false);
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
        {(!showStart) ? (
          <Board
            dim={dim}
            mines={mines}
            gameManagement={{ gameOver, setGameOver, gameWon, setGameWon }}
            onReset={() => {
              setGameOver(false);
              setGameWon(false);
              setShowStart(true);
            }}
          />
        ) : (
          <Box
            sx={{
              width: 'min(100vw,100vh)',
              height: 'min(100vw,100vh)',
              bgcolor: 'forestgreen'
            }}
          />
        )}
      </Box>
    </Fragment>
  );
}

export default App;
