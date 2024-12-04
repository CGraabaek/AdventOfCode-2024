const fs = require("fs");
const puzzleInput = fs.readFileSync("./input.txt").toString();
// const puzzleInput = fs.readFileSync("./sample_input.txt").toString();

// Part one could be solved with a simple regex pattern
function calculateInstructions(inputString) {
    const results = [];
    let index = 0;

    while ((index = inputString.indexOf('mul(', index)) !== -1) {
        const start = index + 4; // After 'mul('
        const end = inputString.indexOf(')', start);

        if (end !== -1) {
            let content = inputString.substring(start, end);

            // Handle nested or multiple mul patterns within the same segment
            while (content.indexOf('mul(') !== -1) {
                content = content.substring(content.indexOf('mul(') + 4);
            }

            const numbers = content.split(',').map(num => num.trim());

            // Check if there are exactly two numbers and both are valid numbers
            if (numbers.length === 2 && numbers.every(num => !isNaN(num))) {
                const score = Number(numbers[0]) * Number(numbers[1]);
                results.push(score);
            }
        }

        // Move past this 'mul(...)'
        index = end + 1;
    }

    return results;
}

function calculateInstructionsPart2(inputString) {
    const results = [];
    const segments = inputString.split(/(do\(\)|don't\(\))/);
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
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