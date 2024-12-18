const fs = require("fs");

// let puzzle = fs.readFileSync(
//     "/home/haneyeric/projects/aoc/day15ex.txt",
//     { encoding: "utf-8" }
// );
// puzzle = puzzle.split("\n").filter(r => r !== "").map(r => r.split(" ").map(n => +n))
// console.log(puzzle)
//  Register A: 52884621
// Register B: 0
// Register C: 0
//
// Program: 2,4,1,3,7,5,4,7,0,3,1,5,5,5,3,0
let A = 52884621
let B = 0
let C = 0
let instruction = 0
let output = []
let program = [2, 4, 1, 3, 7, 5, 4, 7, 0, 3, 1, 5, 5, 5, 3, 0]

function combo(op) {
    switch (op) {
        case 0:
        case 1:
        case 2:
        case 3:
            return op;
        case 4:
            return A;
        case 5:
            return B;
        case 6:
            return C;
        default:
            return -1
    }
}

function adv(op) {
    A = parseInt(A / Math.pow(2, combo(op)))
    instruction += 2
}

function bxl(op) {
    B = B ^ op
    instruction += 2
}

function bst(op) {
    B = combo(op) % 8
    instruction += 2
}

function jnz(op) {
    if (A === 0) {
        instruction += 2
        return
    }
    instruction = op
}

function bxc(op) {
    B = B ^ C
    instruction += 2
}

function out(op) {
    output.push(combo(op) % 8)
    instruction += 2
}


function bdv(op) {
    B = parseInt(A / Math.pow(2, combo(op)))
    instruction += 2
}

function cdv(op) {
    C = parseInt(A / Math.pow(2, combo(op)))
    instruction += 2
}

do {
    console.log("instruction: ", instruction, "opcode: ", program[instruction], "A: ", A, "B: ", "C: ", C)
    switch (program[instruction]) {
        case 0:
            adv(program[instruction + 1])
            break;
        case 1:
            bxl(program[instruction + 1])
            break;
        case 2:
            bst(program[instruction + 1])
            break;
        case 3:
            jnz(program[instruction + 1])
            break;
        case 4:
            bxc(program[instruction + 1])
            break;
        case 5:
            out(program[instruction + 1])
            break;
        case 6:
            bdv(program[instruction + 1])
            break;
        case 7:
            cdv(program[instruction + 1])
            break;
    }
} while (instruction < program.length)

console.log(output)
