import React, { useReducer } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

const formDefault = {
  totalMines: 5,
  boardDimension: 10,
}
function formReducer (currState, action) {
  switch (action.type) {
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


export default function StartGameDialog ({ open, onClose }) {
  const [formState, formDispatch] = useReducer(formReducer, formDefault);
  const { totalMines, boardDimension } = formState;
  const onCloseHandle = () => {
    if (totalMines >= (boardDimension * boardDimension)) return;
    onClose(totalMines, boardDimension);
  }

  return (
    <Dialog open={open} onClose={onCloseHandle}>
      <DialogTitle align='center'>💣 Minesweeper 💣</DialogTitle>
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
        {(totalMines >= (boardDimension * boardDimension)) && (
          <Alert variant='outlined' severity='error' sx={{ mt: 2.5 }}>
            <Typography>
              {'The Total Mines can\'t exceed the Board Dimension to the power of 2.'}
            </Typography>
          </Alert>
        )}
        <Alert variant='outlined' severity='info' sx={{ mt: 2.5 }}>
          <Typography>
          {`Percentage of board covered in mines = ${Math.min(100, totalMines * 100 / (boardDimension * boardDimension)).toFixed(2)}%`}
          </Typography>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandle}>
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
  )
}