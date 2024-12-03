const fs = require("fs");
const puzzleInput = fs
    .readFileSync("./input.txt")
    // .readFileSync("./sample_input.txt")
    .toString()
    .split("\n")

function runLevelSafetyCheck(level) {
    let isSafeLevel = false;
    let decreasing = isDecreasing(level);
    let increasing = isIncraesing(level);

    if (decreasing || increasing) {
        isSafeLevel = isSafe(level);
    }

    return isSafeLevel;
}

function isDecreasing(num) {
    let decreasing = false;

    for (let i = 0; i < num.length - 1; i++) {
        if (num[i] > num[i + 1]) {
            decreasing = true;
        } else {
            decreasing = false;
            break;
        }
    }

    return decreasing;
}

function isIncraesing(num) {
    let increase = false;

    for (let i = 0; i < num.length - 1; i++) {
        if (num[i] < num[i + 1]) {
            increase = true;
        } else {
            increase = false;
            break;
        }
    }

    return increase;
}

function isSafe(num) {
    for (let i = 0; i < num.length - 1; i++) {
        const difference = Math.abs(num[i] - num[i + 1]);
        if (difference < 1 || difference > 3) {
            return false;
        }
    }
    return true;
}


let safeLevels = 0;

puzzleInput.forEach(element => {
    let level = element.split(" ").map(x => parseInt(x))

    let isSafe = runLevelSafetyCheck(level);
    if (isSafe) {
        safeLevels++;
    }
});

console.log(`Part 1: ${safeLevels} safe levels`)

function problemDampener(level) {
    let isDampened = false;
    let dampenedLevel = 0;

    for (let i = 0; i < level.length; i++) {
        let newLevel = level.slice();
        newLevel.splice(i, 1);
        let isSafe = runLevelSafetyCheck(newLevel);
        if (isSafe) {
            isDampened = true;
            dampenedLevel = newLevel;
            break;
        }
    }

    return {
        isDampened,
        dampenedLevel
    }
}
let safeAfterDampening = 0;

puzzleInput.forEach(element => {
    let level = element.split(" ").map(x => parseInt(x))
    let safe = problemDampener(level);
    if (safe.isDampened) {
        safeAfterDampening++;
    }
});

console.log(`Part 2: ${safeAfterDampening} safe levels after dampening`)
