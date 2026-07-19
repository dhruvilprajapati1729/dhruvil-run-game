// ========================================
// obstacle.js
// Man Runner Game
// ========================================

class Obstacle {

    constructor() {

        // Choose a random obstacle image
        const obstacleImages = [
            document.getElementById("rock"),
            document.getElementById("cactus"),
            document.getElementById("fence")
        ];

        this.image =
            obstacleImages[
                Math.floor(Math.random() * obstacleImages.length)
            ];

        this.width = 80;
        this.height = 80;

        this.x = canvas.width + Math.random() * 300;
        this.y = 540;

        this.speed = gameSpeed;

        this.counted = false;

    }

    update() {

        this.x -= this.speed;

        // Remove obstacle when it leaves the screen
        if (this.x + this.width < 0) {

            const index = obstacles.indexOf(this);

            if (index > -1) {

                obstacles.splice(index, 1);

            }

        }

        // Collision with player
        if (this.checkCollision()) {

            gameOver();

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
