import React, { Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateHighscore } from '../../redux/actions';
import PropTypes from 'prop-types';

export default function DialogHighScore ({ open, onClose }) {
  const highscore = useSelector(state => state.highscore);
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle align='center' mb={0}>
        {'Minesweeper Scoreboard'}
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sx={{ border: '2px solid whitesmoke' }}>
            <Button fullWidth color='error' onClick={() => { dispatch(updateHighscore([])) }}>
              {'Reset scores'}
            </Button>
          </Grid>
          {/* Heading */}
          <Grid item xs={4} sx={{ border: '2px solid whitesmoke' }}>
            <Typography align='center'>
              {'Dimension'}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ border: '2px solid whitesmoke' }}>
            <Typography align='center'>
              {'Mines'}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ border: '2px solid whitesmoke' }}>
            <Typography align='center'>
              {'Best Time'}
            </Typography>
          </Grid>
          {(highscore.length === 0) && (
            <Grid item xs={12} sx={{ border: '2px solid gray' }}>
              <Typography align='center'>
                {'No scores recorded yet'}
              </Typography>
            </Grid>
          )}
          {highscore.map((score, index) => (
            <Fragment key={`score-${index}`}>
              <Grid item xs={4} sx={{ border: '2px solid gray', bgcolor: (index % 2) ? 'rgba(0,0,0,0.3)' : '' }}>
                <Typography align='center'>
                  {`${score?.dim}x${score?.dim}`}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ border: '2px solid gray', bgcolor: (index % 2) ? 'rgba(0,0,0,0.3)' : '' }}>
                <Typography align='center'>
                  {score?.mines}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ border: '2px solid gray', bgcolor: (index % 2) ? 'rgba(0,0,0,0.3)' : '' }}>
                <Typography align='center'>
                  {`${score?.time} seconds`}
                </Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogHighScore.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
