import Phaser from "./phaser.esm.min.js";
import { UI } from "./ui.js";
import { Player } from "./player.js";
import { World } from "./world.js";
import { create } from "./things.js";

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
  backgroundColor: "#ffffff",
  pixelArt: true,
  roundPixels: true,
  // smoothPixelArt: true,
  scaleMode: Phaser.Scale.RESIZE,
  physics: {
    default: "arcade",
    arcade: {
      debug: params.has("debug"),
    },
  },
  scene: MainScene,
};

window.game = new Phaser.Game(config);
window.ui = new UI();
window.main = game.scene.getScene("MainScene");
window.paused = false;

// window.ui.write(
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In purus ante, mattis nec diam at, tincidunt scelerisque nisi. Aenean non accumsan ante. Praesent et libero felis. Nunc at rhoncus ipsum, eget lacinia augue. Mauris et quam eget justo blandit hendrerit nec sit amet purus. Aenean luctus maximus elementum. Cras mollis orci sit amet ipsum interdum porttitor. Integer commodo sit amet ex vel commodo. Cras et aliquam nisi. Mauris orci tortor, consequat sed ultricies id, porta vel elit. Sed sed ultricies risus, nec bibendum dui. Vestibulum rhoncus, eros non congue tristique, nunc sapien dignissim ante, ut vulputate augue massa sed nisl. Nunc faucibus semper mi, nec rhoncus libero fringilla eu. Sed commodo nisl et risus faucibus pharetra. Quisque et venenatis libero, ultrices venenatis dolor. Fusce porttitor enim sit amet est ultrices, eget dictum tellus vestibulum. Curabitur lacinia nunc nec tellus iaculis euismod. Nam eget ex congue, ultrices eros eu, consequat lorem. In ultricies, magna vitae ultricies aliquet, augue felis condimentum arcu, vel accumsan sem magna convallis ligula. Morbi tincidunt, lacus quis vulputate tristique, est urna facilisis augue, pulvinar mollis turpis mauris et diam. Nam eu consectetur odio, a porttitor diam. Suspendisse sagittis ipsum quis aliquam dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vel suscipit mi. Nulla sodales, risus at sollicitudin tempus, nulla arcu finibus nisl, id feugiat dui massa quis risus. Sed eu ipsum scelerisque, aliquam velit sed, malesuada est. Fusce vestibulum pellentesque risus. Cras pulvinar metus ac tellus vulputate, non aliquam felis aliquam. Suspendisse potenti. Vestibulum ut facilisis eros. Etiam id feugiat metus. Praesent neque magna, tincidunt accumsan dapibus ut, feugiat ac urna.Nunc dignissim ligula vel aliquet condimentum. Donec vel placerat mauris, eu aliquet urna. Donec in pulvinar est. Duis tellus diam, imperdiet vitae felis ut, finibus sodales mauris. Cras eu vehicula lectus. Etiam imperdiet quis libero et facilisis. Vivamus eget massa a lacus sollicitudin tempus vitae et nunc. In est mi, commodo nec libero sit amet, iaculis convallis orci. Duis sagittis felis non nisl convallis, ac pulvinar ante vestibulum. Aliquam a turpis pulvinar est hendrerit volutpat eu eget orci. Cras molestie varius iaculis. Quisque tristique tempus semper. Nam vitae convallis justo. Vivamus interdum turpis quam, et malesuada elit sollicitudin in. Vestibulum neque eros, tristique eget massa tincidunt, convallis vestibulum odio. Nunc a pretium magna, in faucibus nisl. In lacus augue, consectetur eget aliquam vel, sollicitudin volutpat sem. Donec auctor tincidunt lobortis. Sed porta odio non faucibus tempor.",
//   { timeout: 0, speed: 0.00001 },
// );
