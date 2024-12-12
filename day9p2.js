console.time();
const fs = require("fs");

let puzzle = fs.readFileSync(
  "/home/haneyeric/projects/aoc/datad9ex.txt",
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
console.log("puzzle: ", puzzle);
console.log("disk before: ", disk);
const diskLength = disk.length;
console.log("diskLength: ", diskLength);
let tail = diskLength - 1;
let open = disk.indexOf(".");

do {
  console.log("tail: ", tail, "open: ", open);
  let dotCount = 1;
  let currDot = open;
  while (disk[currDot + 1] === ".") {
    currDot++;
    dotCount++;
  }
  let currTail = tail
  let tailCount = 1;
  do {
    tailCount = 1
    while (disk[currTail - 1] === disk[currTail]) {
      console.log(disk[currTail], currTail, tailCount)
      currTail--;
      tailCount++;
    }
    if (tailCount > dotCount) {
      console.log("should break: ", tailCount, dotCount)
      currTail--
      while (disk[currTail] === ".") {
        currTail--;
      }
      console.log("next currTail: ", currTail)
    }
  } while (tailCount > dotCount)
  console.log("doctCount: ", dotCount, "tailCount: ", tailCount);
  if (dotCount >= tailCount) {
    for (let m = 0; m < tailCount; m++) {
      disk[open + m] = disk[currTail + m];
      disk[currTail + m] = ".";
    }
    while (disk[tail] === ".") {
      tail--;
    }
    open = disk.indexOf(".");
  } else {
    console.log("open before else: ", open);
    open = disk.indexOf(".", open + dotCount);
    console.log("open after else: ", open);
    console.log("tail after else: ", tail)
  }
  console.log("end: ", tail, open)
  console.log(disk)
} while (tail > open);

console.log("disk after: ", disk);

let checksum = 0;
disk
  .filter((d) => d !== ".")
  .forEach((v, i) => {
    checksum += v * i;
  });

console.log("checksum: ", checksum);
console.timeEnd();
