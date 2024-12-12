const fs = require("fs");

let data = fs.readFileSync(
  "/home/haneyeric/projects/aoc/day8full.txt",
  { encoding: "utf-8" }
);
data = data.split("\n").filter(r => r !== "");
data = data.map(r => r.split(""))

const rows = data.length
const cols = data[0].length
console.log(rows, cols)
let ants = []
let antNames = new Set()

let anodes = []

for (let r = 0; r < rows; r++) {
  anodes[r] = []
  for (let c = 0; c < cols; c++) {
    if (data[r][c] !== ".") {
      ants.push([data[r][c], r, c])
      antNames.add(data[r][c])
    }
    anodes[r][c] = false
  }
}
// console.log("anodes before: ", anodes)
// console.log(ants)
// console.log(antNames.values())

antNames.values().forEach(antName => {
  console.log(antName)
  const locs = ants.filter(loc => {
    return loc[0] === antName
  })
  locs.forEach((loc, idx) => {
    const point = [loc[1], loc[2]]
    while (idx < locs.length - 1) {
      let slope = [locs[idx + 1][1] - loc[1], locs[idx + 1][2] - loc[2]]
      console.log("slope pre reduce: ", slope)
      // slope = reduce(...slope)
      doubleSlope = slope.map(s => s * 2)
      negSlope = slope.map(s => s * -1)
      negDoubleSlope = doubleSlope.map(s => s * -1)
      const slopes = [slope, doubleSlope, negSlope, negDoubleSlope]
      console.log("antName: ", antName, "loc: ", loc, "idx: ", idx, "slopes: ", slopes, "point: ", point)
      cont = false
      // console.log("In do")
      let otherPoint = [locs[idx + 1][1], locs[idx + 1][2]]
      console.log("otherPoint: ", otherPoint)
      anodes[point[0]][point[1]] = true
      anodes[otherPoint[0]][otherPoint[1]] = true
      let cyclePt = [point[0], point[1]]
      let cycleOtherPt = [otherPoint[0], otherPoint[1]]
      do {
        console.log("cyclePt: ", cyclePt)
        if (inbound(cyclePt, slopes[2])) {
          anodes[cyclePt[0] + slopes[2][0]][cyclePt[1] + slopes[2][1]] = true
          cyclePt[0] = cyclePt[0] + slopes[2][0]
          cyclePt[1] = cyclePt[1] + slopes[2][1]
        } else {
          break
        }
      } while (true)
      do {
        console.log("cycleOtherPt: ", cycleOtherPt)
        if (inbound(cycleOtherPt, slopes[0])) {
          anodes[cycleOtherPt[0] + slopes[0][0]][cycleOtherPt[1] + slopes[0][1]] = true
          cycleOtherPt[0] = cycleOtherPt[0] + slopes[0][0]
          cycleOtherPt[1] = cycleOtherPt[1] + slopes[0][1]
        } else {
          break
        }
      } while (true)
      idx++
    }
  })
})

// function reduce(numerator, denominator) {
//   // console.log(numerator, denominator)
//   const nSign = (numerator > 0) ? 1 : -1
//   const dSign = (denominator > 0) ? 1 : -1
//   let gcd = function gcd(a, b) {
//     return b ? gcd(b, a % b) : a;
//   };
//   gcd = gcd(numerator, denominator)
//   const redNum = (numerator / gcd > 0 === nSign > 0) ? numerator / gcd : -1 * numerator / gcd
//   const denNum = (denominator / gcd > 0 === dSign > 0) ? denominator / gcd : -1 * denominator / gcd
//   return [redNum, denNum];
// }

function inbound(point, slope) {
  const newRow = point[0] + slope[0]
  const newCol = point[1] + slope[1]
  console.log("newRow: ", newRow, "newCol: ", newCol, (newRow >= 0 && newRow <= rows - 1 && newCol >= 0 && newCol <= cols - 1))
  return (newRow >= 0 && newRow <= rows - 1 && newCol >= 0 && newCol <= cols - 1)
}
let totalAnodes = 0

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (anodes[r][c]) {
      totalAnodes++
    }
  }
}
console.log(anodes)
console.log("total: ", totalAnodes)
