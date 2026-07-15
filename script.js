import Phaser from "./phaser.esm.min.js";
import { UI } from "./ui.js";
import { Player } from "./player.js";
import { World } from "./world.js";
import { create } from "./things.js";
import { things } from "./things.js";

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
    window.main = this;
  }
  preload() {
    let keys = ["person", "chair", "class", "table"];
    this.load.spritesheet("person", "assets/images/person.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("chair", "assets/images/chair.png");
    this.load.image("class", "assets/images/class.png");
    this.load.image("table", "assets/images/table.png");

    Object.entries(things).forEach(([key, thing]) => {
      if (thing.src && !this.textures.exists(thing.image) && !keys.includes(thing.image)) {
        this.textures.addBase64(thing.image, thing.src);
        keys.push(thing.image);
      }
    });
  }

  create() {
    this.player = new Player(this);
    this.world = new World(this);
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(3);
    window.ui.create(this);
    create();
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
  backgroundColor: "#222222",
  pixelArt: true,
  roundPixels: true,
  scaleMode: Phaser.Scale.RESIZE,
  physics: {
    default: "arcade",
    arcade: {
      debug: params.has("debug"),
      overlapBias: 1,
      tileBias: 1,
    },
  },
  scene: MainScene,
};

document.getElementById("start").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  window.game = new Phaser.Game(config);
  window.ui = new UI();
  window.main = game.scene.getScene("MainScene");
  window.paused = false;
});
