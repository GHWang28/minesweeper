import React, { useReducer } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField, Typography } from '@mui/material';
import config from '../../config.json';
import PropTypes from 'prop-types';

const formDefault = {
  totalMines: 10,
  boardDimension: 11,
}
function formReducer (currState, action) {
  switch (action.type) {
    case 'easy-mode':
      return formDefault
    case 'normal-mode':
      return {
        totalMines: 30,
        boardDimension: 15,
      }
    case 'hard-mode':
      return {
        totalMines: 99,
        boardDimension: 23,
      }
    case 'update':
      return {
        ...currState,
        [action.field]: action.value
      }
    case 'reset':
      return {
        ...formDefault
      }
    default:
      return currState;
  }
}

export default function DialogStartGame ({ open, onClose }) {
  const [formState, formDispatch] = useReducer(formReducer, formDefault);
  const { totalMines, boardDimension } = formState;
  const percentageFilled = Math.min(100, totalMines * 100 / (boardDimension * boardDimension));

  const onCloseHandle = (_, reason) => {
    // Ignore if the backdrop was clicked on
    if (reason === 'backdropClick') return;
    if (percentageFilled > config.MAX_MINE_PERCENTAGE || boardDimension > config.DIM_CAP) return;
    onClose(totalMines, boardDimension);
  }

  return (
    <Dialog open={open} onClose={onCloseHandle}>
      <DialogTitle align='center'>Minesweeper</DialogTitle>
      <DialogContent>
        <DialogContentText mb={5} align='center'>
          Select the total mines and board dimension you want to play with:
        </DialogContentText>
        <Box
          sx={{
            display: 'flex',
            columnGap: '10px'
          }}
        >
          <TextField
            label='Total Mines'
            type='number'
            fullWidth
            value={totalMines}
            onChange={(event) => {
              if (event.target.value <= 0) return;
              formDispatch({
                type: 'update',
                field: 'totalMines',
                value: event.target.value
              });
            }}
            error={totalMines >= (boardDimension * boardDimension)}
          />
          <TextField
            label='Board Dimension'
            type='number'
            fullWidth
            value={boardDimension}
            onChange={(event) => {
              if (event.target.value <= 0) return;
              formDispatch({
                type: 'update',
                field: 'boardDimension',
                value: event.target.value
              });
            }}
            error={totalMines >= (boardDimension * boardDimension)}
          />
        </Box>
        <Box mt={2.5} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button variant='outlined' onClick={() => { formDispatch({ type: 'easy-mode' }) }}>
            Easy
          </Button>
          <Button variant='outlined' onClick={() => { formDispatch({ type: 'normal-mode' }) }}>
            Normal
          </Button>
          <Button variant='outlined' onClick={() => { formDispatch({ type: 'hard-mode' }) }}>
            Hard
          </Button>
        </Box>
        {(percentageFilled > config.MAX_MINE_PERCENTAGE) && (
          <Alert variant='outlined' severity='error' sx={{ mt: 2.5 }}>
            <Typography>
              {`The Total Mines can't exceed ${config.MAX_MINE_PERCENTAGE}% of the board`}
            </Typography>
          </Alert>
        )}
        {(boardDimension > config.DIM_CAP) && (
          <Alert variant='outlined' severity='error' sx={{ mt: 2.5 }}>
            <Typography>
              {`Board dimension is capped at ${config.DIM_CAP} by ${config.DIM_CAP}.`}
            </Typography>
          </Alert>
        )}
        <Alert variant='outlined' severity='info' sx={{ mt: 2.5 }}>
          <Typography>
          {`Percentage of board covered in mines = ${percentageFilled.toFixed(2)}%`}
          </Typography>
        </Alert>
        {/* Attribution */}
        <DialogContentText my={1} align='left'>
          {'This recreation of '}
          <em>{'Minesweeper'}</em>
          {' was made by '}
          <Link href='https://ghwang28.github.io/' target='_blank'>
            {'Gordon Wang'}
          </Link>
          {'.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandle}>
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogStartGame.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
