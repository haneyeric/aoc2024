console.time();
const fs = require("fs");

let puzzle = fs.readFileSync(
  "/mnt/c/Users/Eric Haney/WebProjects/aoc/datad6full.txt",
  { encoding: "utf-8" }
);
puzzle = puzzle.split("\n");
const rows = puzzle.length;
const cols = puzzle[0].length;

function findStart(puzzle) {
  let start = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if ((puzzle[r][c] !== ".") & (puzzle[r][c] !== "#")) {
        start.push([r, c]);
        switch (puzzle[r][c]) {
          case "^":
            start.push(0);
            break;
          case ">":
            start.push(1);
            break;
          case "<":
            start.push(2);
            break;
          case "V":
            start.push(3);
            break;
        }
      }
    }
  }
  return start;
}
const start = findStart(puzzle);

let visited = [];
for (let i = 0; i < rows; i++) {
  visited[i] = [];
  for (let j = 0; j < cols; j++) {
    visited[i][j] = false;
  }
}

let exit = false;

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let position = start[0];
let direction = start[1];

do {
  visited[position[0]][position[1]] = true;
  if (
    position[0] + directions[direction][0] < 0 ||
    position[0] + directions[direction][0] >= rows ||
    position[1] + directions[direction][1] < 0 ||
    position[1] + directions[direction][1] >= cols
  ) {
    exit = true;
  } else {
    switch (
      puzzle[position[0] + directions[direction][0]][
        position[1] + directions[direction][1]
      ]
    ) {
      case ".":
      case "^":
        position = [
          position[0] + directions[direction][0],
          position[1] + directions[direction][1],
        ];
        break;
      case "#":
        direction = (direction + 1) % 4;
        break;
    }
  }
} while (!exit);

let unique = 0;
visited.forEach((r) => {
  r.forEach((c) => {
    if (c) {
      unique++;
    }
  });
});
console.log("unique: ", unique);

console.timeEnd();
