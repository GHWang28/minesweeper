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

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      if (!board2D[i][j].isMine) {
        board2D[i][j].totalAdjBombs = getAdjBombs(i, j, [...board2D]);
      } else {
        // Calculating charred effect when game is over
        for (const cell of [
          ...getNeighbours(i, j, [...board2D], 3),
          ...getNeighbours(i, j, [...board2D], 2),
          ...getNeighbours(i, j, [...board2D])
        ]) {
          board2D[cell.i][cell.j].charred++;
        }
        board2D[i][j].charred += 2;
      }
    }
  }

  return [...board2D];
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

export function regenBoard (i, j, dim, mines) {
  let newBoard = createBoard(dim, mines);
  let timeoutCounter = 0;
  while (newBoard[i][j].isMine && newBoard[i][j].totalAdjBombs !== 0 && timeoutCounter <= dim * dim * 2) {
    newBoard = createBoard(dim, mines);
    timeoutCounter++;
  }

  if (newBoard[i][j].isMine) return null;
  return [...newBoard];
}
