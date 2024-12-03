const fs = require("fs");
const puzzleInput = fs
    .readFileSync("./input.txt")
    .toString()
    .replaceAll("   ", "\n")
    .split("\n")
    .map((line) => parseInt(line));

function splitArray(arr) {
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return { left, right };
}

const { left, right } = splitArray(puzzleInput);
const leftOrderedList = left.sort((a, b) => a - b);
const rightOrderedList = right.sort((a, b) => a - b);

let totalDiff = 0;
for (let i = 0; i < left.length; i++) {
    totalDiff += Math.abs(leftOrderedList[i] - rightOrderedList[i]);
}
console.log(`Part 1: ${totalDiff}`)
let similarityScore = 0;

leftOrderedList.forEach((num, i) => {
    let rightCount = rightOrderedList.filter(x => x == num).length
    similarityScore += rightCount * num;
});

console.log(`Part 2: ${similarityScore}`)