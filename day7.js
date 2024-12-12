
const fs = require("fs");

let data = fs.readFileSync(
  "/home/haneyeric/projects/aoc/day7ex.txt",
  { encoding: "utf-8" }
);
data = data.split("\n");
data = data.map((r) => {
  return r.split(":")
}).filter(r => {
  return r[0] !== ""
}).map(r => {
  const equationNums = r[1].split(" ").map(n => {
    return parseInt(n)
  }).filter(n => {
    return !isNaN(n)
  })
  return [parseInt(r[0]), ...equationNums]
});
console.log(data)
let solutions = new Set()
data.forEach(eq => {
  const len = eq.length
  const mult = eq.slice(1).reduce((acc, curr) => {
    return curr *= acc
  }, 1)
  if (mult === eq[0]) {
    solutions.add(eq[0])
    return
  } else if (mult < eq[0]) {
    return
  }

  const sum = eq.slice(1).reduce((acc, curr) => {
    return acc += curr;
  }, 0)
  if (sum === eq[0]) {
    solutions.add(q[0])
    return
  } else if (sum > eq[0]) {
    return
  }
})
console.log(solutions.values())
