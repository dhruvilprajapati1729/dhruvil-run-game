// ==========================================
// player.js
// Man Runner
// ==========================================

class Player {

    constructor() {

        // Images
        this.runImage = document.getElementById("playerRun");
        this.jumpImage = document.getElementById("playerJump");

        this.image = this.runImage;

        // Position
        this.x = 120;
        this.y = 500;

        // Size
        this.width = 110;
        this.height = 110;

        // Physics
        this.velocityY = 0;
        this.gravity = 0.8;
        this.jumpPower = -18;

        this.groundY = 500;
        this.onGround = true;

        // Animation
        this.frameX = 0;
        this.maxFrame = 7;
        this.frameTimer = 0;
        this.frameInterval = 100;

    }

    update(deltaTime){

        // Gravity
        this.velocityY += this.gravity;

        this.y += this.velocityY;

        // Ground Collision
        if(this.y >= this.groundY){

            this.y = this.groundY;

            this.velocityY = 0;

            this.onGround = true;

            this.image = this.runImage;

        }

        // Animation
        this.frameTimer += deltaTime;

        if(this.frameTimer > this.frameInterval){

            this.frameX++;

            if(this.frameX > this.maxFrame){

                this.frameX = 0;

            }

            this.frameTimer = 0;

        }

    }

    draw(ctx){

        // If your image is NOT a sprite sheet,
        // replace this drawImage() with the one below.

        ctx.drawImage(

            this.image,

            this.frameX * 128,
            0,

            128,
            128,

            this.x,
            this.y,

            this.width,
            this.height

        );

        /*
        For a normal PNG use this instead:

        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
        */

    }

    jump(){

        if(this.onGround){

            this.velocityY = this.jumpPower;

            this.onGround = false;

            this.image = this.jumpImage;

        }

    }

    getBounds(){

        return{

            x:this.x + 20,

            y:this.y + 10,

            width:this.width - 40,

            height:this.height - 20

        };

    }

}

// ==========================================
// Keyboard Controls
// ==========================================

window.addEventListener("keydown",(e)=>{

    if(e.code==="Space" || e.code==="ArrowUp"){

        if(player){

            player.jump();

        }

    }

});
