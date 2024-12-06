const fs = require("fs");

fs.readFile(
  "/mnt/c/Users/Eric Haney/WebProjects/aoc/datad4full.txt",
  "utf-8",
  (err, data) => {
    if (err) console.log(err);
    const splitdata = data.split("\n");
    const rows = splitdata.length;
    const cols = splitdata[0].length;
    let xmascount = 0;
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        if (splitdata[r][c] === "A") {
           if(checkSurrounding(r, c, splitdata)) xmascount++;
        }
      }
    }
    console.log(xmascount);
  }
);

xDirections = [
  [
    [-1, -1],
    [1, 1],
  ],
  [
    [-1, 1],
    [1, -1],
  ],
];

function checkSurrounding(r, c, splitdata, directions = xDirections) {
  let matches = 0;
  directions.forEach((d) => {
    if (
      (splitdata[r + d[0][0]][c + d[0][1]] === "M" &&
        splitdata[r + d[1][0]][c + d[1][1]] === "S") ||
      (splitdata[r + d[0][0]][c + d[0][1]] === "S" &&
        splitdata[r + d[1][0]][c + d[1][1]] === "M")
    ) {
      matches++;
    }
  });
  return matches === 2;
}
