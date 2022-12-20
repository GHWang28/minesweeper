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
        <ReactConfetti width={width} height={height} numberOfPieces={600}/>
      )}
      <StartGameDialog
        open={showStart}
        onClose={(totalMines, boardDimension) => {
          setDim(boardDimension);
          setMines(totalMines);
          setShowStart(false);
        }}
      />
      {(!showStart) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>
          <Board dim={dim} mines={mines} gameManagement={{ gameOver, setGameOver, gameWon, setGameWon }}/>
        </Box>
      )}
    </Fragment>
  );
}

export default App;
