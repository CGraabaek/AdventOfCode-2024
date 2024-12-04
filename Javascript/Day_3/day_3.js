const fs = require("fs");
const puzzleInput = fs.readFileSync("./input.txt").toString();
const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

// const puzzleInput = fs.readFileSync("./sample_input.txt").toString();

// Part one could be solved with a simple regex pattern
function calculateInstructions(inputString) {
    const results = [];

    while ((match = regex.exec(inputString)) !== null) {
        const num1 = Number(match[1]);
        const num2 = Number(match[2]);
        const score = num1 * num2;
        results.push(score);
    }

    return results;
}

function calculateInstructionsPart2(inputString) {
    const results = [];
    const segments = inputString.split(/(do\(\)|don't\(\))/);
    let processing = true;

    segments.forEach(segment => {
        if (segment === 'do()') {
            processing = true;
        } else if (segment === "don't()") {
            processing = false;
        } else if (processing) {
            if (processing) {
                // Find all matches within the current section
                while ((match = regex.exec(segment)) !== null) {
                    const num1 = Number(match[1]);
                    const num2 = Number(match[2]);
                    const score = num1 * num2;
                    results.push(score);
                }
            }
        }
    });

    return results;
}

const scores = calculateInstructions(puzzleInput);
const instructionSum = scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Part 1: ", instructionSum);

const scores2 = calculateInstructionsPart2(puzzleInput);
const instructionSum2 = scores2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Part 2: ", instructionSum2);