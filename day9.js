console.time();
const fs = require("fs");

let puzzle = fs.readFileSync(
  "/mnt/c/Users/Eric Haney/WebProjects/aoc/datad9full.txt",
  { encoding: "utf-8" }
);
puzzle = puzzle.split("").map((d) => parseInt(d));

let id = 0;
let isFile = true;
const puzzleLength = puzzle.length;

console.log("puzzleLength: ", puzzleLength);

let disk = [];

for (let puzzleIdx = 0; puzzleIdx < puzzleLength; puzzleIdx++) {
  if (puzzleIdx % 1000 === 0) {
    console.log("puzzleIdx: ", puzzleIdx);
  }
  const entry = isFile ? id++ : ".";
  for (let block = 1; block <= puzzle[puzzleIdx]; block++) {
    disk.push(entry);
  }
  isFile = !isFile;
}
//console.log("puzzle: ", puzzle);
//console.log("disk before: ", disk);

const diskLength = disk.length;
console.log("diskLength: ", diskLength);
let tail = diskLength - 1;
let open = disk.indexOf(".");
console.time("loop");
do {
  disk[open] = disk[tail];
  disk[tail] = ".";
  while (disk[tail] === ".") {
    tail--;
  }
  open = disk.indexOf(".");
} while (tail > open);
console.timeEnd("loop");
console.log("disk after: ", disk);

let checksum = 0;
disk
  .filter((d) => d !== ".")
  .forEach((v, i) => {
    checksum += v * i;
  });

console.log("checksum: ", checksum);
console.timeEnd();
