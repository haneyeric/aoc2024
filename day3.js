const fs = require('fs')

fs.readFile("/home/haneyeric/projects/aoc/data.txt", "utf8", (err, data) => {
  let candidates = []
  if (err) { console.log(err) }
  let idx = -1
  let dont = data.indexOf("don't()")
  do {
    idx = data.indexOf("mul(", idx + 1)
    if (idx >= dont) {
      idx = data.indexOf("do()", dont + 1)
      dont = data.indexOf("don't()", idx + 1)
    } else {
      let tail = data.indexOf(")", idx + 1)
      candidates.push(data.slice(idx, tail + 1))
    }
  } while (idx != -1)
  candidates = candidates.filter(r => { return r.length <= 12 && r.includes(")") && r.includes(",") })
  candidates = candidates.map(r => {
    // console.log("in map: ", r, r.split("(")[1])
    const a = parseInt(r.split("(")[1].split(",")[0])
    const b = parseInt(r.split("(")[1].split(",")[1]?.split(")")[0])
    return [a, b]
  })
  let total = 0
  candidates.forEach(p => {
    total += p[0] * p[1]
  })
  console.log(total)
})
