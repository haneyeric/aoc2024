const fs = require("fs");

let pairs = fs.readFileSync(
  "/mnt/c/Users/Eric Haney/WebProjects/aoc/datad5rulesfull.txt",
  { encoding: "utf-8" }
);
pairs = pairs.split("\n");
pairs = pairs.map((r) => {
  return r.split("|").map((p) => {
    return parseInt(p);
  });
});

let updates = fs.readFileSync(
  "/mnt/c/Users/Eric Haney/WebProjects/aoc/datad5pnfull.txt",
  { encoding: "utf-8" }
);
updates = updates.split("\n");
updates = updates.map((l) => {
  return l.split(",").map((p) => {
    return parseInt(p);
  });
});

let rules = new Map();
pairs.forEach((pair) => {
  if (rules.has(pair[0])) {
    rules.get(pair[0]).push(pair[1]);
  } else {
    rules.set(pair[0], [pair[1]]);
  }
});

console.log("rules: ", rules.entries());
console.log("updates: ", updates);

function checkUpdate(rules, updates) {
  let correctIdxs = [];
  updates.forEach((update, uidx) => {
    let correct = true;
    let i = 0;
    do {
      const rule = rules.get(update[i]);
      if (!rule) {
        update.forEach((p) => {
          if (update.indexOf(p) > i) {
            correct = false;
          }
        });
      } else {
        rule.forEach(r => {
          if(update.indexOf(r) < i && update.indexOf(r) > -1) {
            correct = false
          }
        })
      }

      i++;
    } while (i < update.length && correct);
    if (correct) {
      correctIdxs.push(uidx);
    }
  });
  return correctIdxs;
}

const correctUpdates = checkUpdate(rules, updates);

let total = 0
correctUpdates.forEach(u => {
  const middle = parseInt(updates[u].length/2)
  total += updates[u][middle]
})

console.log(total)
