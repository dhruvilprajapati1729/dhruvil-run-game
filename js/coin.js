// ==========================================
// coin.js
// Man Runner
// ==========================================

class Coin {

    constructor() {

        this.image = document.getElementById("coin");

        this.width = 50;
        this.height = 50;

        // Spawn outside the right side of the screen
        this.x = canvas.width + Math.random() * 300;

        // Random height
        this.y = 300 + Math.random() * 200;

        this.speed = gameSpeed;

        this.collected = false;

    }

    update() {

        // Move left
        this.x -= this.speed;

        // Remove if off-screen
        if (this.x + this.width < 0) {

            const index = coins.indexOf(this);

            if (index > -1) {

                coins.splice(index, 1);

            }

            return;

        }

        // Check collision
        if (!this.collected && this.checkCollision()) {

            this.collect();

        }

    }

    draw(ctx) {

        ctx.drawImage(

            this.image,

            this.x,
            this.y,

            this.width,
            this.height

        );

    }

    checkCollision() {

        return (

            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y

        );

    }

    collect() {

        this.collected = true;

        score += 10;

        // Update coin counter
        const coinCounter = document.getElementById("coinCount");

        if (coinCounter) {

            coinCounter.textContent =
                Number(coinCounter.textContent) + 1;

        }

        // Play sound if available
        if (typeof playCoinSound === "function") {

            playCoinSound();

        }

        // Remove coin
        const index = coins.indexOf(this);

        if (index > -1) {

            coins.splice(index, 1);

        }

    }

}
