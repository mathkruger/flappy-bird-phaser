import Phaser from "phaser";

import bird from "../assets/bird.png";
import pipe from "../assets/pipe.png";

export class MainScene extends Phaser.Scene {
    constructor() {
        super();

        this.score = 0;
        this.labelScore = null;

        this.bird = null;

        this.pipes = null;
        this.spacers = null;

        this.timer = null;
    }

    preload() {
      this.load.image("bird", bird);  
      this.load.image("pipe", pipe);  
    }

    create() {
        this.score = 0;
        this.bird = this.physics.add.sprite(100, 245, "bird");
        this.bird.body.setGravityY(1500);

        this.labelScore = this.add.text(20, 20, this.score, {
            font: "50px Arial",
            fill: "#fff"
        });
        this.labelScore.depth = 1;

        this.pipes = this.physics.add.group();
        this.spacers = this.physics.add.group();

        this.timer = this.time.addEvent({
            loop: true,
            delay: 1500,
            callback: () => {
                this.addRowOfPipes();
            }
        });
    }

    update() {
        let keys = this.input.keyboard.createCursorKeys();

        if (keys.space.isDown) {
            this.bird.body.velocity.y = -350;
        }

        this.moveGroup(this.pipes);
        this.moveGroup(this.spacers);

        this.checkLose();
        this.checkScored();
    }

    checkLose() {
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }

        this.physics.overlap(this.bird, this.pipes, () => {
            this.restartGame();
        });
    }

    checkScored() {
        this.spacers.children.iterate((child) => {
            this.physics.overlap(child, this.bird, () => {
                child.destroy();

                this.score += 1;
                this.labelScore.text = this.score;
            });
        });
    }

    moveGroup(group) {
        group.children.iterate(function (child) {
            if (child == undefined) return;
    
            if (child.x < -50) {
                child.destroy();
            }
            else {
                child.setVelocityX(-200);
            }
        });
    }

    restartGame() {
        this.scene.stop("main");
        this.scene.start("menu");
    }

    addOnePipe(x, y) {
        let pipe = this.physics.add.sprite(x, y, "pipe");
        this.pipes.add(pipe);
    }

    addOneSpacer(x, y) {
        let spacer = this.physics.add.sprite(x, y, "pipe");
        spacer.height *= 2;
        spacer.alpha = 0.3;
        this.spacers.add(spacer);
    }

    addRowOfPipes() {
        let hole = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(400, i * 60 + 35);
            } else if (i != hole + 1) {
                this.addOneSpacer(400, i * 60 + 35);
            }
        }
    }
}