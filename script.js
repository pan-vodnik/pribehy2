import Phaser from "./phaser.esm.min.js";
import { UI } from "./ui.js";
import { Player } from "./player.js";
import { World } from "./world.js";

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
    window.main = this;
  }
  preload() {
    this.load.spritesheet("person", "assets/images/person.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("room", "assets/images/room.png");
    this.load.image("thing", "assets/images/thing.png");
  }

  create() {
    this.player = new Player(this);
    this.world = new World(this);
    this.cameras.main.startFollow(this.player, true); //, 0.1, 0.1);
    this.cameras.main.setZoom(2);
    window.ui.create(this);
  }

  update() {
    this.player.update();
    window.ui.update();
    document.getElementById("fps").textContent =
      "fps: " + Math.round(this.game.loop.actualFps);
  }
}

/**
 * @type Phaser.Core.Config
 */
let config = {
  type: Phaser.AUTO,
  backgroundColor: "#ffffff",
  pixelArt: true,
  roundPixels: true,
  // smoothPixelArt: true,
  scaleMode: Phaser.Scale.RESIZE,
  physics: {
    default: "arcade",
    arcade: {
      debug: window.location.search.includes("debug"),
    },
  },
  scene: MainScene,
};

window.game = new Phaser.Game(config);
window.ui = new UI();
window.main = game.scene.getScene("MainScene");
