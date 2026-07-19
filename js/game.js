// ==========================================
// game.js
// Man Runner
// ==========================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas Size
canvas.width = 1280;
canvas.height = 720;

// HTML Elements
const loadingScreen = document.getElementById("loadingScreen");
const gameContainer = document.getElementById("gameContainer");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const gameOverScreen = document.getElementById("gameOver");

// Game Variables
let player;

let obstacles = [];
let coins = [];

let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;

let gameSpeed = 6;

let gameRunning = false;

let lastTime = 0;

// ==========================================
// Start Game
// ==========================================

startButton.addEventListener("click", startGame);

function startGame(){

    loadingScreen.style.display = "none";

    gameContainer.style.display = "flex";

    gameOverScreen.style.display = "none";

    player = new Player();

    obstacles = [];

    coins = [];

    score = 0;

    gameRunning = true;

    lastTime = performance.now();

    requestAnimationFrame(gameLoop);

}

// ==========================================
// Main Game Loop
// ==========================================

function gameLoop(timeStamp){

    if(!gameRunning) return;

    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;

    update(deltaTime);

    draw();

    requestAnimationFrame(gameLoop);

}

// ==========================================
// Update
// ==========================================

function update(deltaTime){

    score += deltaTime * 0.01;

    player.update(deltaTime);

    spawnObstacle();

    spawnCoin();

    obstacles.forEach(obstacle => obstacle.update());

    coins.forEach(coin => coin.update());

}

// ==========================================
// Draw
// ==========================================

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawSky();

    drawGround();

    player.draw(ctx);

    obstacles.forEach(obstacle => obstacle.draw(ctx));

    coins.forEach(coin => coin.draw(ctx));

    updateHUD();

}

// ==========================================
// Background
// ==========================================

function drawSky(){

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(0,0,canvas.width,canvas.height);

}

function drawGround(){

    ctx.fillStyle = "#4CAF50";

    ctx.fillRect(0,620,canvas.width,100);

}

// ==========================================
// Spawn Obstacles
// ==========================================

let obstacleTimer = 0;

function spawnObstacle(){

    obstacleTimer++;

    if(obstacleTimer > 120){

        obstacles.push(new Obstacle());

        obstacleTimer = 0;

    }

}

// ==========================================
// Spawn Coins
// ==========================================

let coinTimer = 0;

function spawnCoin(){

    coinTimer++;

    if(coinTimer > 80){

        coins.push(new Coin());

        coinTimer = 0;

    }

}

// ==========================================
// Update HUD
// ==========================================

function updateHUD(){

    document.getElementById("score").textContent =
        Math.floor(score);

    document.getElementById("highScore").textContent =
        highScore;

}

// ==========================================
// Game Over
// ==========================================

function gameOver(){

    gameRunning = false;

    if(score > highScore){

        highScore = Math.floor(score);

        localStorage.setItem("highScore", highScore);

    }

    document.getElementById("finalScore").textContent =
        "Score : " + Math.floor(score);

    gameOverScreen.style.display = "flex";

}

// ==========================================
// Restart
// ==========================================

restartButton.addEventListener("click", ()=>{

    location.reload();

});
