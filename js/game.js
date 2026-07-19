// ===============================
// Man Runner - game.js
// ===============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const loadingScreen = document.getElementById("loadingScreen");
const gameContainer = document.getElementById("gameContainer");
const startButton = document.getElementById("startButton");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

let gameSpeed = 6;

let gameRunning = false;

let player;
let obstacles = [];
let coins = [];

let lastTime = 0;

// -------------------------------
// Start Game
// -------------------------------

startButton.addEventListener("click", () => {

    loadingScreen.style.display = "none";
    gameContainer.style.display = "block";

    startGame();

});

// -------------------------------

function startGame() {

    score = 0;

    obstacles = [];

    coins = [];

    player = new Player();

    gameRunning = true;

    requestAnimationFrame(gameLoop);

}

// -------------------------------
// Main Loop
// -------------------------------

function gameLoop(timestamp) {

    if (!gameRunning) return;

    const deltaTime = timestamp - lastTime;

    lastTime = timestamp;

    update(deltaTime);

    draw();

    requestAnimationFrame(gameLoop);

}

// -------------------------------
// Update
// -------------------------------

function update(deltaTime) {

    score += deltaTime * 0.01;

    player.update();

    obstacles.forEach(obstacle => obstacle.update());

    coins.forEach(coin => coin.update());

    spawnObstacle();

    spawnCoin();

}

// -------------------------------
// Draw
// -------------------------------

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();

    player.draw(ctx);

    obstacles.forEach(obstacle => obstacle.draw(ctx));

    coins.forEach(coin => coin.draw(ctx));

    drawHUD();

}

// -------------------------------
// Ground
// -------------------------------

function drawGround() {

    ctx.fillStyle = "#6BCB3C";

    ctx.fillRect(0, 620, canvas.width, 100);

}

// -------------------------------
// HUD
// -------------------------------

function drawHUD() {

    ctx.fillStyle = "white";

    ctx.font = "32px Arial";

    ctx.fillText("Score : " + Math.floor(score), 40, 50);

    ctx.fillText("High Score : " + Math.floor(highScore), 40, 90);

}

// -------------------------------
// Spawn Obstacles
// -------------------------------

function spawnObstacle() {

    if (Math.random() < 0.01) {

        obstacles.push(new Obstacle());

    }

}

// -------------------------------
// Spawn Coins
// -------------------------------

function spawnCoin() {

    if (Math.random() < 0.015) {

        coins.push(new Coin());

    }

}

// -------------------------------
// Game Over
// -------------------------------

function gameOver() {

    gameRunning = false;

    if (score > highScore) {

        highScore = Math.floor(score);

        localStorage.setItem("highScore", highScore);

    }

    alert("Game Over!\nScore : " + Math.floor(score));

    location.reload();

}
