import Phaser from "./phaser.esm.min.js";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, "person");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(11, 30);
    this.setOrigin(0.5, 1);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("person", {
        start: 1,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.speed = 100;
    this.overlaps = [];
  }

  update() {
    this.setDepth(this.y);
    if (window.ui.joystick.pointer != null || window.ui.joystick.keys) {
      const dir = window.ui.joystick.dir;
      this.setVelocity(dir.x * this.speed, dir.y * this.speed);
      this.setFlipX(dir.x > 0);
      this.anims.play("walk", true);
      this.anims.timeScale = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2)); // TODO: tweak speed
    } else {
      this.anims.stop();
      this.setVelocity(0);
      this.setFrame(0);
    }
    this.getOverlaps();
    document.getElementById("interact").disabled =
      this.overlaps.length === 0 ||
      this.overlaps.every((o) => !o.parent.interact);
  }
  getOverlaps() {
    this.overlaps.length = 0;
    this.scene.physics.overlap(
      this,
      this.scene.world.thingsTriggerGroup,
      (player, thing) => {
        this.overlaps.push(thing);
      },
    );
    this.overlaps.sort(
      (a, b) =>
        Phaser.Math.Distance.Between(a.x, a.y, this.x, this.y) -
        Phaser.Math.Distance.Between(b.x, b.y, this.x, this.y),
    );
    return this.overlaps;
  }
  interact() {
    if (this.overlaps.length === 0) return;
    for (const o of this.overlaps) {
      if (o.parent.interact) {
        o.parent.interact(o.parent);
        break;
      }
    }
  }
}
