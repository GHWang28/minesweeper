import React from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import config from '../../config.json';

export default function DialogInfo ({ open, onClose }) {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align='center'>How to Play Minesweeper</DialogTitle>
      <DialogContent>
        <DialogContentText mb={5} align='center'>
          Select the total mines and board dimension you want to play with:
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}