// ==========================================
// player.js
// Man Runner Game
// ==========================================

class Player {

    constructor() {

        this.image = document.getElementById("playerRun");

        this.width = 100;
        this.height = 100;

        this.x = 150;
        this.y = 520;

        this.velocityY = 0;

        this.gravity = 0.8;

        this.jumpForce = -18;

        this.onGround = true;

    }

    update() {

        // Gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Ground Collision
        if (this.y >= 520) {

            this.y = 520;
            this.velocityY = 0;
            this.onGround = true;

        }

    }

    jump() {

        if (this.onGround) {

            this.velocityY = this.jumpForce;
            this.onGround = false;

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

}

// ==============================
// Keyboard Controls
// ==============================

window.addEventListener("keydown", function(e){

    if(e.code === "Space" || e.code === "ArrowUp"){

        if(player){

            player.jump();

        }

    }

});
