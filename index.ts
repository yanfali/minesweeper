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
  grid: Tile[][];
  minesMarked: number;
  startTime: number;
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
    minesMarked: 0,
    startTime: Date.now(),
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

/**
 * Render the passed in board
 * @param board
 */
function displayBoard(board: Board): void {
  const cols = new Array(board.width).fill(1).map((v, i) => ` ${i + 1} `);
  cols.unshift("   ");
  console.log(`${cols.join("")}\n`);

  // now use board to fill out state
  for (let y = 0; y < board.height; y++) {
    const row = [` ${y + 1} `];
    for (let x = 0; x < board.width; x++) {
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

const board: Board = initBoard(6, 3, 5);
displayBoard(board);
