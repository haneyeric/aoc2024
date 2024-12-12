console.time()
const fs = require("fs");

let puzzle = fs.readFileSync(
    "/home/haneyeric/projects/aoc/day11full.txt",
    { encoding: "utf-8" }
);
puzzle = puzzle.split("\n")[0].split(" ").map(s => parseInt(s))
console.log(puzzle)
let total = 0
const memo = (fn) => {
    let cache = {}
    return (...args) => {
        let n = `${args[0]} - ${args[1]}`
        if (n in cache) {
            return cache[n]
        } else {
            let result = fn(...args)
            cache[n] = result
            return result
        }
    }
}

const testBlink = memo((stone, steps) => {

    if (steps === 0) {
        return 1;
    } else if (stone === 0) {
        return testBlink(1, steps - 1)
    } else {
        const str = stone.toString()
        const len = str.length
        if (len % 2 === 0) {
            return testBlink(parseInt(str.slice(0, len / 2)), steps - 1) + testBlink(parseInt(str.slice(len / 2)), steps - 1)
        }
        return testBlink(stone * 2024, steps - 1)
    }
})

puzzle.forEach(stone => total += testBlink(stone, 75))

console.log(total)
console.timeEnd()
// function blink(puzzle) {
//     for (let stone = 0; stone < puzzle.length; stone++) {
//         let val = puzzle[stone]
//         if (val == 0) {
//             puzzle[stone] = "1";
//         } else if (val.length % 2 == 0) {
//             puzzle[stone] = [parseInt(val.slice(0, val.length / 2)).toString(), parseInt(val.slice(val.length / 2)).toString()]
//         } else {
//             puzzle[stone] = (parseInt(val) * 2024).toString()
//         }
//     }
//     // console.log(puzzle.flat())
//     return puzzle.flat()
// }

// for (let blinks = 0; blinks < 75; blinks++) {
//     puzzle = blink(puzzle)
// }
//
