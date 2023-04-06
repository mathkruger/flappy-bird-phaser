import Phaser from 'phaser';
import { MainScene } from './scenes/main-scene';
import { MenuScene } from './scenes/menu-scene';

const menuScene = new MenuScene();
const mainScene = new MainScene();

const config = {
    type: Phaser.CANVAS,
    width: 400,
    height: 490,
    physics: {
        default: "arcade"
    },
    backgroundColor: "#71c5cf"
};

const game = new Phaser.Game(config);

game.scene.add("menu", menuScene);
game.scene.add("main", mainScene);

game.scene.start("menu");
