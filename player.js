import Phaser from "./phaser.esm.min.js";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, "person");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(12, 5);
    this.setOrigin(0.5, 1);
    this.body.setOffset(10, 25);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("person", {
        start: 0,
        end: 2,
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("person", {
        start: 3,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.anims.play("idle");

    this.speed = 100;
    this.overlaps = [];

    this.interact_marker = scene.add.graphics();
    this.interact_marker.fillStyle(0xffffff, 1);
    this.interact_marker.fillCircle(0, 0, 3);
    this.interact_marker.setDepth(1000);
    this.interact_marker.setVisible(false);
  }

  update() {
    this.setDepth(this.y);
    if (!paused) {
      if (window.ui.joystick.pointer != null || window.ui.joystick.keys) {
        const dir = window.ui.joystick.dir;
        this.setVelocity(dir.x * this.speed, dir.y * this.speed);
        this.setFlipX(dir.x > 0);
        this.anims.play("walk", true);
        this.anims.timeScale = Math.sqrt(
          Math.pow(dir.x, 2) + Math.pow(dir.y, 2),
        ); // TODO: tweak speed
      } else {
        this.anims.play("idle", true);
        this.anims.timeScale = 1;
        this.setVelocity(0);
      }
      this.getOverlaps();
      if (this.overlaps.length > 0) {
        document.getElementById("interact").disabled = false;
        this.interact_marker.setVisible(true);
        this.interact_marker.setPosition(
          this.overlaps[0].parent.x,
          this.overlaps[0].parent.y - 10,
        );
      } else {
        document.getElementById("interact").disabled = true;
        this.interact_marker.setVisible(false);
      }
    } else {
      document.getElementById("interact").disabled = true;
      this.anims.play("idle", true);
      this.anims.timeScale = 1;
      this.setVelocity(0);
    }
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
