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
    let paths = new Set([]);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (splitdata[r][c] === "X") {
          let XMmatches = checkSurrounding(r, c, "M", splitdata);
          XMmatches.forEach((xm) => {
            let XMAmatches = checkSurrounding(xm[0], xm[1], "A", splitdata, xm[2]);
            XMAmatches.forEach((xma) => {
              let XMASmatches = checkSurrounding(
                xma[0],
                xma[1],
                "S",
                splitdata,
                xma[2]
              );
              XMASmatches.forEach((xmas) => {
                paths.add([
                  [r, c],
                  [xm[0], xm[1]],
                  [xma[0], xma[1]],
                  [xmas[0], xmas[1]],
                ]);
              });
              xmascount += XMASmatches.length;
            });
          });
        }
      }
    }
    console.log("xmascount: ", xmascount);
    console.log("paths: ", paths.size);
  }
);

allDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function checkSurrounding(r, c, target, splitdata, directions = allDirections) {
  let matches = [];
  directions.forEach((d) => {
    if (
      r + d[0] < 0 ||
      r + d[0] > splitdata.length - 1 ||
      c + d[1] < 0 ||
      c + d[1] > splitdata[0].length - 1
    ) {
      return;
    }
    if (splitdata[r + d[0]][c + d[1]] === target) {
      matches.push([r + d[0], c + d[1],[[d[0],d[1]]]]);
    }
  });

  return matches;
}
