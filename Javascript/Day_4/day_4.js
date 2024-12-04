const fs = require("fs");
// const puzzleInput = fs.readFileSync("./sample_input.txt").toString().split('\n');
const puzzleInput = fs.readFileSync("./input.txt").toString().split('\n');

function findWordCount(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    const reverseWord = word.split('').reverse().join('');
    let count = 0;

    function checkHorizontal(row, col) {
        if (col <= cols - wordLength) {
            const horizontalWord = grid[row].slice(col, col + wordLength);
            if (horizontalWord === word || horizontalWord === reverseWord) {
count++;
                // console.log(`Found ${word} horizontally at row ${row}, starting column ${col}`);
            }
        }
    }

    function checkVertical(row, col) {
        if (row <= rows - wordLength) {
            let verticalWord = '';
            for (let i = 0; i < wordLength; i++) {
                verticalWord += grid[row + i][col];
            }
            if (verticalWord === word || verticalWord === reverseWord) {
                count++;
                // console.log(`Found ${word} vertically at column ${col}, starting row ${row}`);
            }
        }
    }

    function checkDiagonal(row, col) {
        // Diagonal down-right
        if (row <= rows - wordLength && col <= cols - wordLength) {
            let diagonalWord = '';
            for (let i = 0; i < wordLength; i++) {
                diagonalWord += grid[row + i][col + i];
            }
            if (diagonalWord === word || diagonalWord === reverseWord) {
count++;
                // console.log(`Found ${word} diagonally (down-right) starting at row ${row}, column ${col}`);
            }
        }

        // Diagonal down-left
        if (row <= rows - wordLength && col >= wordLength - 1) {
            let diagonalWord = '';
            for (let i = 0; i < wordLength; i++) {
                diagonalWord += grid[row + i][col - i];
            }
            if (diagonalWord === word || diagonalWord === reverseWord) {
count++;
                // console.log(`Found ${word} diagonally (down-left) starting at row ${row}, column ${col}`);
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            checkHorizontal(r, c);
            checkVertical(r, c);
            checkDiagonal(r, c);
        }
    }
  return count;
}

const wordCount = findWordCount(puzzleInput, "XMAS");
console.log(`Part 1: ${wordCount}`);
