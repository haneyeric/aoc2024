
const fs = require("fs");
let lines = fs.readFileSync("/home/haneyeric/projects/aoc/day7ex.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.match(/\d+/g).map(Number));
console.log("lines: ", lines)
function one(a, b) {
  console.log("in one a b", a, b, (a % b === 0 ? a / b : -1))
  return (a % b === 0 ? a / b : -1)
}
function two(a, b) {
  console.log("in two a b", a, b, a - b)
  return (a - b)
}
const OPS = [one, two];

function evalsTo(nums, cur, i = nums.length - 1) {
  console.log("in evalsTo - nums: ", nums, "cur: ", cur, "i: ", i, !i)
  if (!i) return cur === nums[0];
  if (cur < 0) return false;

  return OPS.some((func) => {
    console.log("in some: ", nums, cur, func.name)
    const result = evalsTo(nums, func(cur, nums[i]), i - 1)
    console.log("result in some: ", result, nums, cur, func.name)
    return result;
  });
}

function part1(lines) {
  let filtered = lines
    .filter(([target, ...equation]) => evalsTo(equation, target))
    .map(([total]) => total);

  console.log(filtered.reduce((acc, curr) => {
    return curr += acc;
  }, 0));
}

part1(lines);


function part2(lines) {
  let unconcat = (x, y) => {
    let [sub, yMag] = [x - y, 10 ** (Math.floor(Math.log10(y)) + 1)];
    return sub > 0 && sub % yMag === 0 ? sub / yMag : -1;
  };

  OPS.push(unconcat);
  part1(lines);
}

// part2(lines);
