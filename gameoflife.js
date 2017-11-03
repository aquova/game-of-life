// Program that simulates Conway's Game of Life in a browser window
// Written by Austin Bricker, 2017

var canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');

var width = 100;
var updateRate = 100;
var grid = createArray(width);
randomPopulate();

var tick = function() {
    drawGame();
    grid = updateGrid();
    setTimeout(tick, updateRate);
};
tick();

// JavaScript doesn't support 2D arrays normally
function createArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function randomPopulate() {
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
            grid[i][j] = Boolean(Math.floor(Math.random() * 2));
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
            if (grid[i][j] == true) {
                ctx.fillStyle="#000000";
            }
            else {
                ctx.fillStyle="#FFFFFF";
            }
            ctx.fillRect(4 * i, 4 * j, 4, 4);
        }
    }
}

function updateGrid() {
    var newGrid = createArray(width);
    // Don't look at edges
    for (var i = 1; i < width - 1; i++) {
        for (var j = 1; j < width - 1; j++) {
            var liveNeighborTotal = grid[i-1][j-1] ? 1 : 0;
            liveNeighborTotal += grid[i][j-1] ? 1 : 0;
            liveNeighborTotal += grid[i+1][j-1] ? 1 : 0;
            liveNeighborTotal += grid[i-1][j] ? 1 : 0;
            liveNeighborTotal += grid[i+1][j] ? 1 : 0;
            liveNeighborTotal += grid[i-1][j+1] ? 1 : 0;
            liveNeighborTotal += grid[i][j+1] ? 1 : 0;
            liveNeighborTotal += grid[i+1][j+1] ? 1 : 0;

            // Update central piece of new grid
            if (liveNeighborTotal == 2 && grid[i][j] == true) {
                newGrid[i][j] = true;
            }
            else if (liveNeighborTotal == 3) {
                newGrid[i][j] = true;
            }
            else {
                newGrid[i][j] = false;
            }
        }
    }
    return newGrid;
}
