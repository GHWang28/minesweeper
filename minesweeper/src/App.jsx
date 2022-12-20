import './App.css';
import React, { Fragment, useState } from 'react';
import DialogStartGame from './components/DialogStartGame';
import Board from './components/Board';
import { Box } from '@mui/material';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size'
import DialogInfo from './components/DialogInfo';

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [dim, setDim] = useState(10);
  const [mines, setMines] = useState(5);
  const [width, height] = useWindowSize()
  
  return (
    <Fragment>
      {(gameWon && !gameOver) && (
        <ReactConfetti width={width} height={height} numberOfPieces={350}/>
      )}
      <DialogInfo
        open={showInfo}
        onClose={() => {
          setShowInfo(false);
        }}
      />
      <DialogStartGame
        open={showStart}
        onClose={(totalMines, boardDimension) => {
          setDim(boardDimension);
          setMines(totalMines);
          setShowStart(false);
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          transition: 'background-color 0.5s ease-in-out',
          bgcolor: (gameOver) ? 'black' : 'rgb(20,101,1)'
        }}
      >
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
            onShowInfo={() => {
              setShowInfo(true);
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
