
const fs = require("fs");

let puzzle = fs.readFileSync(
    "/home/haneyeric/projects/aoc/day14full.txt",
    { encoding: "utf-8" }
);
puzzle = puzzle.split("\n").filter(r => r !== "").map(r => r.split(" ").map(n => +n))
console.log(puzzle)

const width = 101
const height = 103
const seconds = 100
const vdiv = (width - (width % 2)) / 2
const hdiv = (height - (height % 2)) / 2
let count = []

for (let r = 0; r < height; r++) {
    count[r] = []
    for (let c = 0; c < width; c++) {
        count[r][c] = 0
    }
}

let quads = [0, 0, 0, 0]

puzzle.forEach(robot => {
    let r = (robot[1] + (seconds * robot[3]))
    let c = (robot[0] + (seconds * robot[2]))
    r = ((r % height) + height) % height
    c = ((c % width) + width) % width
    // if (r < 0) {
    //     r = height + r
    // }
    // if (c < 0) {
    //     c = width + c
    // }
    if (r < vdiv && c < hdiv) {
        quads[0]++
    } else if (r < vdiv && c > hdiv) {
        quads[1]++
    } else if (r > vdiv && c > hdiv) {
        quads[2]++
    } else if (r > vdiv && c < hdiv) {
        quads[3]++
    }

    // count[r][c] = count[r][c] + 1
})

const factor = quads.reduce((acc, cur) => acc * cur, 1)
console.log(quads)
console.log(factor)
// console.log(count)


