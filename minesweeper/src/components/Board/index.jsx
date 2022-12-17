import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { createBoard, revealAdj } from "../../helpers";
import Cell from "../Cell";

export default function Board ({ dim, mines }) {

  const [boardData, setBoardData] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    setBoardData(createBoard(dim, mines));
  }, [dim, mines])

  if (!boardData) return null;

  return (
    <Grid
      container
      sx={{
        bgcolor: 'rgb(35,116,14)',
        width: 'min(100vh,100vw)',
        height: 'min(100vh,100vw)'
      }}
    >
      <Grid item xs={12} sx={{ bgcolor: 'rgb(35,116,14)', height: 'min(5vh,5vw)' }}>

      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container sx={{ width: 'min(94vh,94vw)', height: 'min(94vh,94vw)' }}>
          {boardData.map((row, indexI) => (
            row.map((cell, indexJ) => (
              <Grid
                key={`cell-${indexI}-${indexJ}`}
                item
                xs={12 / dim}
                sx={{
                  position: 'relative'
                }}
              >
                <Cell
                  data={cell}
                  startOfGame={totalClicks === 0}
                  onClick={() => {
                    if (cell.isMine) return;
                    setBoardData(revealAdj(indexI, indexJ, [...boardData]));
                    setTotalClicks(totalClicks + 1);
                  }}
                />
              </Grid>
            ))
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}