console.time()
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
  let incorrectIdxs = new Set();
  updates.forEach((update, uidx) => {
    let correct = true;
    let i = 0;
    do {
      const rule = rules.get(update[i]);
      if (!rule) {
        update.forEach((p) => {
          if (update.indexOf(p) > i) {
            incorrectIdxs.add(uidx);
            correct = false;
          }
        });
      } else {
        rule.forEach((r) => {
          if (update.indexOf(r) < i && update.indexOf(r) > -1) {
            incorrectIdxs.add(uidx);
            correct = false;
          }
        });
      }

      i++;
    } while (i < update.length && correct);
  });
  return incorrectIdxs;
}
let totalswaps = 0;

function resort(update) {
  let clean = false;
  do {
    let swaps = 0;
    for (let idx = update.length - 1; idx > 0; idx--) {
      let rule;
      if (rules.has(update[idx])) {
        rule = rules.get(update[idx]);
      }
      if (!rule && idx !== update.length - 1) {
        let temp = update[update.length - 1];
        update[update.length - 1] = p;
        update[idx] = temp;
        swaps++;
        totalswaps++;
      } else if (rule && rule.includes(update[idx - 1])) {
        let temp = update[idx];
        update[idx] = update[idx - 1];
        update[idx - 1] = temp;
        swaps++;
        totalswaps++;
      }
    }
    if (swaps === 0) {
      clean = true;
    }
  } while (!clean);
  return update;
}
const incorrectUpdates = checkUpdate(rules, updates);
let total = 0;
incorrectUpdates.forEach((u) => {
  const sorted = resort(updates[u]);
  const middle = parseInt(sorted.length / 2);
  total += sorted[middle];
});

console.log(total);
console.log("totalswaps: ", totalswaps);
console.timeEnd()
