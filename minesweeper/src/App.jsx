import 'react-toastify/dist/ReactToastify.css';
import 'react-slideshow-image/dist/styles.css';
import './App.css';
import React, { Fragment, useState } from 'react';
import DialogStartGame from './components/DialogStartGame';
import Board from './components/Board';
import { Box } from '@mui/material';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size'
import DialogInfo from './components/DialogInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setGameOver, setGameWon } from './redux/actions';
import DialogHighScore from './components/DialogHighscore';
import { ToastContainer } from 'react-toastify';

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showHighscore, setShowHighscore] = useState(false);

  const gameOver = useSelector(state => state.gameOver);
  const gameWon = useSelector(state => state.gameWon);
  const dispatch = useDispatch();

  const [dim, setDim] = useState(10);
  const [mines, setMines] = useState(5);
  const [width, height] = useWindowSize();

  return (
    <Fragment>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        pauseOnHover
      />
      {(gameWon && !gameOver) && (
        <ReactConfetti width={width} height={height} numberOfPieces={350}/>
      )}
      <DialogHighScore
        open={showHighscore}
        onClose={() => {
          setShowHighscore(false);
        }}
      />
      <DialogInfo
        open={showInfo}
        onClose={() => {
          setShowInfo(false);
        }}
      />
      <DialogStartGame
        open={showStart}
        onClose={(totalMines, boardDimension) => {
          setDim(Number(boardDimension));
          setMines(Number(totalMines));
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
            onReset={() => {
              dispatch(setGameOver(false));
              dispatch(setGameWon(false));
              setShowStart(true);
            }}
            onShowInfo={() => {
              setShowInfo(true);
            }}
            onShowHighscore={() => {
              setShowHighscore(true)
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
