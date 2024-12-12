console.time();
const fs = require("fs");

let puzzle = fs.readFileSync(
  "/mnt/c/Users/Eric Haney/WebProjects/aoc/datad10full.txt",
  { encoding: "utf-8" }
);
puzzle = puzzle.split("\n");
puzzle = puzzle.map((r) => r.split("").map((d) => parseInt(d)));
// console.log(puzzle);
const rows = puzzle.length;
const cols = puzzle[0].length;
let goodTrails = 0;
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (puzzle[r][c] === 0) {
      // let visited = createBlankVisited();
      // console.log("zero at: ", r, c);
      checkPath(r, c);
      // visited.forEach((r) => {
      //   r.forEach((c) => {
      //     if (c) {
      //       goodTrails++;
      //     }
      //   });
      // });
      // console.log("paths after zero at: ", r, c, goodTrails);
    }
  }
}

function checkPath(r, c) {
  directions.forEach((dir) => {
    const newRow = r + dir[0];
    const newCol = c + dir[1];
    // console.log("from: ", r, c, puzzle[r][c], newRow, newCol);
    if (
      newRow < 0 ||
      newRow >= rows ||
      newCol < 0 ||
      newCol >= cols ||
      puzzle[newRow][newCol] !== puzzle[r][c] + 1
    ) {
      // console.log("skip");
      return;
    } else if (puzzle[newRow][newCol] === 9) {
      goodTrails++;
      // visited[newRow][newCol] = true;
      // console.log(
      //   "to: ",
      //   newRow,
      //   newCol,
      //   puzzle[newRow][newCol],
      //   "goodTrail: ",
      //   goodTrails
      // );
    } else {
      // console.log("to: ", newRow, newCol, puzzle[newRow][newCol]);
      checkPath(newRow, newCol);
    }
  });
}

// function createBlankVisited() {
//   let blankVisited = [];
//   for (let r = 0; r < rows; r++) {
//     blankVisited[r] = [];
//     for (let c = 0; c < cols; c++) {
//       blankVisited[r][c] = false;
//     }
//   }
//   return blankVisited;
// }

console.log("goodTrails: ", goodTrails);
