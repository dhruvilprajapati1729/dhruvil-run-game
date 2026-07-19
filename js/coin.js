// ========================================
// coin.js
// Man Runner Game
// ========================================

class Coin {

    constructor() {

        this.image = document.getElementById("coin");

        this.width = 50;
        this.height = 50;

        this.x = canvas.width + Math.random() * 400;
        this.y = 350 + Math.random() * 180;

        this.speed = gameSpeed;

        this.collected = false;

    }

    update() {

        // Move coin to the left
        this.x -= this.speed;

        // Remove coin if it leaves the screen
        if (this.x + this.width < 0) {

            const index = coins.indexOf(this);

            if (index > -1) {

                coins.splice(index, 1);

            }

        }

        // Check if player collected the coin
        if (!this.collected && this.checkCollision()) {

            this.collected = true;

            score += 10;

            // Update HTML coin counter
            const coinCounter = document.getElementById("coinCount");

            if (coinCounter) {

                coinCounter.textContent =
                    parseInt(coinCounter.textContent) + 1;

            }

            // Remove collected coin
            const index = coins.indexOf(this);

            if (index > -1) {

                coins.splice(index, 1);

            }

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

}
