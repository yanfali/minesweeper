// minesweeper

interface Tile {
  hasMine: boolean;
  isVisible: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

interface Board {
  height: number;
  width: number;
  mines: number;
  grid: (Tile | undefined)[][];
}

/**
 * Init the grid
 * @param board
 * @returns
 */
function initBoard(width: number, height: number, mines: number): Board {
  // assuming board is at least 1x1
  const board: Board = {
    width,
    height,
    mines,
    grid: [],
  };
  for (let x = 0; x < board.width; x++) {
    board.grid[x] = [];
    for (let y = 0; y < board.height; y++) {
      board.grid[x].push({
        hasMine: false,
        isFlagged: false,
        isVisible: false,
        adjacentMines: 0,
      });
    }
  }
  return board;
}

function displayBoard(board: Board): void {
  for (let x = 0; x < board.width; x++) {
    const row = [];
    for (let y = 0; y < board.height; y++) {
      const tile = board.grid[x][y];
      if (tile.isFlagged) {
        row.push(" F ");
      } else if (tile.isVisible) {
        row.push(` ${tile.adjacentMines} `);
      }
      {
        // do nothing
        row.push(" ? ");
      }
    }
    console.log(row.join(""));
  }
}

const board: Board = initBoard(3, 3, 5);
displayBoard(board);
