import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(110, 245, "Press SPACE to play");
    }

    update() {
        const keys = this.input.keyboard.createCursorKeys();

        if (keys.space.isDown) {
            this.scene.stop("menu");
            this.scene.start("main");
        }
    }
}
