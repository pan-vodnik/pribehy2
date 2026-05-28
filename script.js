class UI {
  constructor() {
    this.joystick = {
      container: document.getElementById("joystick-container"),
      element: document.getElementById("joystick"),
      base: document.getElementById("joystick-base"),
      stick: document.getElementById("joystick-stick"),
      pointer: null,
      dir: { x: 0, y: 0 },
    };
  }
  create() {
    this.cursors = main.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
    });
    this.interact_key = main.input.keyboard.addKey("E");
    this.joystick = {
      container: document.getElementById("joystick-container"),
      element: document.getElementById("joystick"),
      base: document.getElementById("joystick-base"),
      stick: document.getElementById("joystick-stick"),
      pointer: null,
      keys: false,
      dir: { x: 0, y: 0 },
    };
    this.joystick.container.addEventListener("pointerdown", (e) => {
      if (this.joystick.pointer === null) {
        this.joystick.pointer = e.pointerId;
        this.joystick.element.style.left =
          e.clientX - this.joystick.container.getBoundingClientRect().x + "px";
        this.joystick.element.style.top =
          e.clientY - this.joystick.container.getBoundingClientRect().y + "px";
        this.joystick.element.style.opacity = 0.8;
      }
    });
    document.addEventListener("pointermove", (e) => {
      if (e.pointerId === this.joystick.pointer) {
        const joy = this.joystick.base.getBoundingClientRect();
        const dx = e.clientX - joy.x - joy.width / 2;
        const dy = e.clientY - joy.y - joy.height / 2;
        const len = Math.min(Math.hypot(dx, dy), 70);
        const angle = Math.atan2(dy, dx);
        this.joystick.stick.setAttribute("cx", Math.cos(angle) * len + "px");
        this.joystick.stick.setAttribute("cy", Math.sin(angle) * len + "px");
        this.joystick.dir.x = Math.cos(angle) * (len / 70);
        this.joystick.dir.y = Math.sin(angle) * (len / 70);
      }
    });
    document.addEventListener("pointerup", (e) => {
      if (e.pointerId === this.joystick.pointer) {
        const joy = this.joystick.base.getBoundingClientRect();
        this.joystick.pointer = null;
        this.joystick.dir = { x: 0, y: 0 };
        this.joystick.element.style.top = "70%";
        this.joystick.element.style.left = "50%";
        this.joystick.element.style.opacity = 0.6;
        this.joystick.stick.setAttribute("cx", "0px");
        this.joystick.stick.setAttribute("cy", "0px");
      }
    });
    document.addEventListener("pointercancel", (e) => {
      if (e.pointerId === this.joystick.pointer) {
        const joy = this.joystick.base.getBoundingClientRect();
        this.joystick.pointer = null;
        this.joystick.dir = { x: 0, y: 0 };
        this.joystick.element.style.top = "70%";
        this.joystick.element.style.left = "50%";
        this.joystick.element.style.opacity = 0.6;
        this.joystick.stick.setAttribute("cx", "0px");
        this.joystick.stick.setAttribute("cy", "0px");
      }
    });
  }
  update() {
    if (this.joystick.pointer === null) {
      if (this.cursors.up.isDown) {
        this.joystick.dir.y = -1;
        this.joystick.keys = true;
      } else if (this.cursors.down.isDown) {
        this.joystick.dir.y = 1;
        this.joystick.keys = true;
      } else {
        this.joystick.dir.y = 0;
      }
      if (this.cursors.left.isDown) {
        this.joystick.dir.x = -1;
        this.joystick.keys = true;
      } else if (this.cursors.right.isDown) {
        this.joystick.dir.x = 1;
        this.joystick.keys = true;
      } else {
        this.joystick.dir.x = 0;
      }
      if (
        this.joystick.dir.x === 0 &&
        this.joystick.dir.y === 0 &&
        this.joystick.keys === true
      ) {
        this.joystick.keys = false;
      }
      let vec = new Phaser.Math.Vector2(
        this.joystick.dir.x,
        this.joystick.dir.y,
      ).normalize();
      this.joystick.dir.x = vec.x;
      this.joystick.dir.y = vec.y;
    }
    if (Phaser.Input.Keyboard.JustDown(this.interact_key)) {
      main.player.interact();
    }
  }
}

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(x = 0, y = 0) {
    super(main, x, y, "person");
    main.add.existing(this);
    main.physics.add.existing(this);
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

    this.speed = 50;
    this.overlaps = [];
  }

  update() {
    this.setDepth(this.y);
    if (ui.joystick.pointer != null || ui.joystick.keys) {
      const dir = ui.joystick.dir;
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
    document.getElementById("interact").disabled = this.overlaps.length === 0;
  }
  getOverlaps() {
    this.overlaps.length = 0;
    main.physics.overlap(this, main.world.thingsGroup, (player, thing) => {
      this.overlaps.push(thing);
    });
    this.overlaps.sort(
      (a, b) =>
        Phaser.Math.Distance.Between(a.x, a.y, this.x, this.y) -
        Phaser.Math.Distance.Between(b.x, b.y, this.x, this.y),
    );
    return this.overlaps;
  }
  interact() {
    if (this.overlaps.length === 0) return;
    this.overlaps[0].interact(this.overlaps[0]);
  }
}

class World {
  constructor() {
    this.thingsGroup = main.add.group();
    this.thingsStaticGroup = main.physics.add.staticGroup();
    this.things = [
      {
        name: "room",
        x: 0,
        y: 0,
        scale: 4,
        depth: -999,
        notes: "",
        hitboxes: [
          {
            x: -50,
            y: -100,
            w: 100,
            h: 100,
            type: "solid",
          },
        ],
      },
      {
        name: "thing",
        x: 105,
        y: -315,
        scale: 1,
        depth: -315,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: -120,
        y: -267,
        scale: 1,
        depth: -267,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: 160,
        y: -259,
        scale: 1,
        depth: -259,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: 14,
        y: -247,
        scale: 1,
        depth: -247,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: -83,
        y: -240,
        scale: 1,
        depth: -240,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: 106,
        y: -214,
        scale: 1,
        depth: -214,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: -52,
        y: -200,
        scale: 1,
        depth: -200,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: 37,
        y: -184,
        scale: 1,
        depth: -184,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: -13,
        y: -151,
        scale: 1,
        depth: -151,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: -109,
        y: -125,
        scale: 1,
        depth: -125,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: 120,
        y: -71,
        scale: 1,
        depth: -71,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
      {
        name: "thing",
        x: 31,
        y: -48,
        scale: 1,
        depth: -48,
        notes: "",
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -16,
            w: 16,
            h: 15,
            type: "trigger",
          },
        ],
      },
    ];
    {
      // for (
      //   let i = 0;
      //   i < (window.location.search.includes("many") ? 10000 : 100);
      //   i++
      // ) {
      //   this.things.push({
      //     name: "thing",
      //     pos: { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
      //     interact: (self) => {
      //       document.getElementById("text").innerText =
      //         "picked up " + Math.round(self.x) + " " + Math.round(self.y);
      //       self.destroy();
      //     },
      //   });
      // }
      // this.rooms.forEach((room) => {
      //   main.add
      //     .image(room.pos.x, room.pos.y, room.name)
      //     .setScale(5)
      //     .setDepth(-9999);
      //   // TODO: this is aaahh bad
      //   const texture = main.textures.get(room.name);
      //   const image = texture.getSourceImage();
      //   const canvas = document.createElement("canvas");
      //   canvas.width = image.width;
      //   canvas.height = image.height;
      //   const ctx = canvas.getContext("2d");
      //   ctx.drawImage(image, 0, 0);
      //   const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      //   for (let y = 0; y < canvas.height; y++) {
      //     let inWall = false;
      //     let wallStartX = 0;
      //     for (let x = 0; x < canvas.width; x++) {
      //       const index = (y * canvas.width + x) * 4;
      //       const r = imgData[index];
      //       const g = imgData[index + 1];
      //       const b = imgData[index + 2];
      //       const isBlack = r < 50 && g < 50 && b < 50;
      //       if (isBlack && !inWall) {
      //         inWall = true;
      //         wallStartX = x;
      //       } else if (x === canvas.width - 1 || (!isBlack && inWall)) {
      //         const gameX = wallStartX * 5 - (image.width * 5) / 2;
      //         const gameY = y * 5 - (image.height * 5) / 2;
      //         const gameW = (x - wallStartX) * 5;
      //         const gameH = 1 * 5;
      //         const centerX = gameX + gameW / 2;
      //         const centerY = gameY + gameH / 2;
      //         const zone = main.add.zone(centerX, centerY, gameW, gameH);
      //         main.physics.add.existing(zone, true);
      //         zone.body.setSize(gameW, gameH);
      //         room.group.add(zone);
      //         inWall = false;
      //       }
      //     }
      //   }
      // });
    }
    this.things.forEach((thing) => {
      const t = this.thingsGroup.create(thing.x, thing.y, thing.name, false);
      t.setScale(thing.scale);
      t.interact = thing.interact;
      t.setOrigin(0.5, 1);
      t.setDepth(thing.depth);
      thing.hitboxes.forEach((hitbox) => {
        if (hitbox.type === "static") {
          const h = this.thingsStaticGroup;
          //   thing.x,
          //   thing.y,
          //   undefined,
          //   false,
          // );
          h.setScale(thing.scale);
          h.setOrigin(0.5, 1);
          // this.thingsStaticGroup.add(h);
          // main.physics.add.collider(t, h);
        }
      });
    });
  }
}

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
    this.world = new World();
    this.player = new Player();
    this.cameras.main.startFollow(this.player, true); //, 0.1, 0.1);
    this.cameras.main.setZoom(2);
    // main.cameras.main.setZoom(0.08);

    // this.world.rooms.forEach((room) => {
    //   this.physics.add.collider(this.player, room.group);
    // });
    ui.create();
  }

  update() {
    this.player.update();
    ui.update();
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

const game = new Phaser.Game(config);
const ui = new UI();
var main = game.scene.getScene("MainScene");
