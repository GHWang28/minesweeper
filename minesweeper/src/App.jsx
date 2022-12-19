import './App.css';
import React, { Fragment, useState } from 'react';
import StartGameDialog from './components/StartGameDialog';
import Board from './components/Board';
import { Box } from '@mui/material';

function App() {
  const [showStart, setShowStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [dim, setDim] = useState(10);
  const [mines, setMines] = useState(5);
  
  return (
    <Fragment>
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
          <Board dim={dim} mines={mines} gameManagement={{ gameOver, setGameOver }}/>
        </Box>
      )}
    </Fragment>
  );
}

export default App;
