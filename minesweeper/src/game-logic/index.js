import { toast } from "react-toastify";

export function modulo(n, m) {
  return ((n % m) + m) % m;
}

/**
 * Generates a random integer between min and max inclusively
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export function rng (min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

export function createBoard (dim, mines) {
  const defaultCell = {
    isMine: false,
    totalAdjBombs: 0,
    isSweeped: false,
    isFlagged: false,
    charred: 0
  }
  const board1D = new Array(dim * dim).fill(null).map((_, index) => (
    {
      ...defaultCell,
      key: `${Math.floor(index / dim)}-${index % dim}`,
      i: Math.floor(index / dim),
      j: index % dim
    }
  ));

  // Placing mines
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const placement = rng(0, (dim * dim) - 1);
    if (!board1D[placement].isMine) {
      minesPlaced++;
      board1D[placement].isMine = true;
    }
  }
  
  // Converting board to 2D
  const board2D = [];
  while (board1D.length) board2D.push(board1D.splice(0, dim));

  return calcNeighbours(dim, [...board2D]);
}

function calcNeighbours (dim, board2D, recalculate = false) {
  const newBoard = [...board2D];

  // Clear charred spots first
  if (recalculate) {
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        newBoard[i][j].charred = 0;
      }
    }
  }

  // Calcualte charred spots
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      if (!newBoard[i][j].isMine) {
        newBoard[i][j].totalAdjBombs = getAdjBombs(i, j, [...board2D]);
      } else {
        // Calculating charred effect when game is over
        for (const cell of [
          ...getNeighbours(i, j, [...newBoard], 3),
          ...getNeighbours(i, j, [...newBoard], 2),
          ...getNeighbours(i, j, [...newBoard])
        ]) {
          newBoard[cell.i][cell.j].charred++;
        }
        newBoard[i][j].charred += 2;
      }
    }
  }

  return [...newBoard];
}

function getAdjBombs (centerI, centerJ, board2D) {
  let totalNeighbourBombs = 0;
  for (const neighbour of [...getNeighbours(centerI, centerJ, board2D)]) {
    if (neighbour.isMine) totalNeighbourBombs++;
  }

  return totalNeighbourBombs;
}

export function setFlag (i, j, board2D, flagManagement) {
  const newBoard = [...board2D];
  flagManagement.setTotalFlags(flagManagement.totalFlags + ((newBoard[i][j].isFlagged) ? -1 : 1))
  newBoard[i][j].isFlagged = !newBoard[i][j].isFlagged;
  return [...newBoard];
}

export function revealAdj (centerI, centerJ, board2D) {
  const newBoard = [...board2D];
  if (newBoard[centerI][centerJ].totalAdjBombs !== 0) {
    newBoard[centerI][centerJ].isSweeped = true;
    return [...newBoard];
  }

  const neighbours = [...getNeighbours(centerI, centerJ, [...newBoard])];

  while (neighbours.length > 0) {
    const cell = neighbours.pop();

    if (cell.isSweeped || cell.isMine) continue;
    if (cell.totalAdjBombs === 0) {
      neighbours.push(...getNeighbours(cell.i, cell.j, [...newBoard]))
    }
    newBoard[cell.i][cell.j].isSweeped = true;
  }

  return [...newBoard];
}

function getNeighbours (centerI, centerJ, board2D, radius = 1) {
  const neighbours = []
  for (let i = centerI - radius; i <= centerI + radius; i++) {
    for (let j = centerJ - radius; j <= centerJ + radius; j++) {
      if (board2D[i] && board2D[i][j]) neighbours.push({...board2D[i][j]})
    }
  }
  return [...neighbours];
}

export function calcDistance (cellA, cellB) {
  // Pythagoras
  return Math.sqrt(Math.pow(cellB.i - cellA.i, 2) + Math.pow(cellB.j - cellA.j, 2));
}

export function getTotalSweeped (board2D) {
  let totalSweeped = 0;
  for (let i = 0; i < board2D.length; i++) {
    for (let j = 0; j < board2D[0].length; j++) {
      totalSweeped += board2D[i][j].isSweeped;
    }
  }

  return totalSweeped;
}

export function regenBoard (i, j, dim, board2D) {
  const newBoard = [...board2D];
  let relocated = false;
  let timeoutCounter = 0;

  for (const adjCell of getNeighbours(i, j, [...newBoard], 2)) {
    // If this adjacent cell is not a mine, do nothing
    if (!adjCell.isMine) continue;

    // Placing the mine elsewhere away from the click
    timeoutCounter = 0;
    while (newBoard[adjCell.i][adjCell.j].isMine) {
      // Failsafe in case the loop goes on for too long
      if (timeoutCounter === dim * dim * dim) break;

      const newI = rng(0, dim - 1);
      const newJ = rng(0, dim - 1);

      // Checks that the new position is atleast 2 cells in radius away from the click
      // and that the new position does not have a mine
      if (calcDistance({i: newI, j: newJ}, {i, j}) > 2 && !newBoard[newI][newJ].isMine) {
        newBoard[adjCell.i][adjCell.j].isMine = false;
        newBoard[newI][newJ].isMine = true;
        relocated = true;
      }
      timeoutCounter++;
    }
  }

  // Recalculating neighbours if a relocation occured
  if (relocated) return calcNeighbours(dim, [...newBoard], true);

  // Else, return the board as usual
  return [...board2D];
}

export function convertTimeToSeconds (days, hours, minutes, seconds) {
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

export function recordHighscore (setHighscore, time, currHighscore, mines, dim) {
  let scoreFound = false;
  // Loop and find a worse high score to override
  for (const index in currHighscore) {
    if (currHighscore[index]?.mines === mines && currHighscore[index]?.dim === dim) {
      scoreFound = true;
      if (currHighscore[index]?.time >= time) currHighscore[index].time = time;
    }
    if (scoreFound) break;
  }
  if (!scoreFound) {
    toast.info(`A new record was set for Dimension ${dim}x${dim} with ${mines} Mines.`);
    currHighscore.push({ mines, dim, time });
  }
  setHighscore(currHighscore);
}
