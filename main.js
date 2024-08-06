const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let camera_pos = [800, 400];
const rowHeight = 80;
const colWidth = 90;
const circleRadius = 40;

// Function to calculate factorial with memoization
const factorial = (function() {
    const cache = {};
    return function(n) {
        if (n < 0) return 0;
        if (n === 0 || n === 1) return 1;
        if (cache[n]) return cache[n];
        return (cache[n] = n * arguments.callee(n - 1));
    };
})();

// Function to calculate binomial coefficient C(i, j) = i! / (j! * (i - j)!)
function pascalValue(i, j) {
    if (j > i || i < 0 || j < 0) {
        return 0;
    }
    return factorial(i) / (factorial(j) * factorial(i - j));
}

function get_color(integer) {
    const colors = [
        "rgb(74, 99, 255)",
        "rgb(255, 240, 74)",
        "red",
        "grey",
        "green",
        "purple",
        "orange",
        "pink",
    ];
    if (integer == 0) {
        return "black";
    } else {
        return colors[Math.abs(integer) % colors.length];
    }    
}

function draw() {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4;
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const visibleRows = Math.ceil(canvas.height / rowHeight) + 2;
    const visibleCols = Math.ceil(canvas.width / colWidth) + 2;
    let offset_X = -Math.round(camera_pos[0] / colWidth) - 1;
    let offset_Y = -Math.round(camera_pos[1] / rowHeight) - 1 ;

    for (let i = offset_Y; i < visibleRows + offset_Y; i++) {
        for (let j = offset_X; j <= visibleCols + offset_X; j++) {

            let val = pascalValue(i, Math.round(j + i / 2));

            let x = camera_pos[0] + (j + (i % 2) / 2) * colWidth;
            let y = camera_pos[1] + i * rowHeight;

            ctx.fillStyle = get_color(val);
            ctx.beginPath();
            ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "black";
            ctx.fillText(val, x, y);
        }
    }
}

window.addEventListener("keydown", check, false);

function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: // Left arrow key
            camera_pos[0] += 10;
            draw();
            break;
        case 38: // Up arrow key
            camera_pos[1] += 10;
            draw();
            break;
        case 39: // Right arrow key
            camera_pos[0] -= 10;
            draw();
            break;
        case 40: // Down arrow key
            camera_pos[1] -= 10;
            draw();
            break;
    }
}

draw();