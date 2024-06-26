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
      } else {
        // do nothing
        row.push(" ? ");
      }
    }
    console.log(row.join(""));
  }
}

interface GridCoord {
  x: number;
  y: number;
}

/** Durstenfeld version of Fisher-Yates with O(n) performance */
function algorithmP(positions: GridCoord[], mines: number): GridCoord[] {
  let count = mines;
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    count--;
    if (count === 0) {
      // stop when we have this many mines placed
      break;
    }
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  // return only the shuffled number of elements
  return positions.slice(positions.length - mines);
}

function placeMines(board: Board): Board {
  const mines = board.mines;
  // create an array of all possible coordinates
  const gridCoord: GridCoord[] = [];
  for (let y = board.height - 1; y >= 0; y--) {
    for (let x = board.width - 1; x >= 0; x--) {
      gridCoord.push({ x, y });
    }
  }

  const randomCoords = algorithmP(gridCoord, mines);
  for (let i = 0; i < randomCoords.length; i++) {
    const coords = randomCoords[i];
    board.grid[coords.x][coords.y].hasMine = true;
    board.grid[coords.x][coords.y].isFlagged = true;
  }

  return board;
}

const board: Board = initBoard(9, 9, 50);
placeMines(board);
displayBoard(board);
