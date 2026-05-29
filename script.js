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

    this.speed = 100;
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
    this.things = {
      room: {
        image: "room",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIGlDQ1BzUkdCAAAYlWNgYHzAAAQsDgwMuXklRUHuTgoRkVEKDEggMbm4gAEv+HaNgRFEX9YNLGHjxq8WA3AVAS0E0n+AWCQdzGYUALGTIGwVELu8pKAEyLYAsZMLikBsHyBbKTkjMQXIBrlPpygkyBnIngNkK6QjsZOQ2CmpxclA9h4gWwXhz/z5DAwWXxgYmCcixJKmMTBsb2dgkLiDEFNZyMDA38rAsO0yQuyzP9jvjGKHcnNKk6F+AonwpOaFBgNpNiCWYfBj0GdwZGAoTjM2gqjgcWBgYL37//9nLQYG9kkMDH/7////vej//7+Lge64xcBwoL0gsSgRrJYZiJnS0hgYPi1nYOCNZGAQvgAMtmgc9nGA7StmCGJwZ3ACAHssTnV9IHqGAAAACXBIWXMAABAmAAAQJgGDtkwVAAAB0UlEQVR4nO3cwU7DMBAA0TXi/385XKgEVaCJ68Sz3plzkUIfttYladu2bQvD9DH7Aux3gsASBJYgsASBJQgsQWB9vnpBa+2O6yjb8zHwJcjeD9mY9v7Y3bJgCQJLEFiCwBIEliCwBIElCCxBYAkCSxBYgsBKA1LlU+c0IFUSBJYgsASBJQgsQQY1agoU5J9mjNqC/NGsc48gO7XWpt1pI8hTvRjbtg1ZVYL8aObKeCTIdwSMCEEigoMRIQgKI6I4CA0jojAIESOiKMhVGCNG30OPI1xRz4WPOj0TV8ajaSDkN2VmJbcscoLAEgSWILAEGdy7o68gsASBJQgsQWAdOqlTbnSucLr3qzVguWVd0DujryCwBIElCCxBYAkCSxBYglxU7+grCCxBYAkCSxBYgsBKAXJmWqH8q6C3FCBHo91A3TP6LgNCw+htCZBVMCIWAFkJIyI5yGoYEYlBVsSISApyF8YM8HQg2VbG2dE3FUg2jJ7SgFTAiBj8jOHVH1v40OfJrvpFq6yOiERbVpUEgSXIDZ0ZfQWBJQgsQWAJclNHx3ZBYKUAqXIojEgCUilBYAkCSxBYgsASBJYgsFJ910mFXoJUOpQRcsuCJQgsQWB9AZy7fN7ZN/u6AAAAAElFTkSuQmCC",
        x: 0,
        y: 0.02,
        scale: 4.5,
        depth: -9999,
        notes: "",
        locked: false,
        useManualDepth: true,
        hitboxes: [
          {
            x: -42,
            y: -92,
            w: 1,
            h: 88,
            type: "solid",
          },
          {
            x: -41,
            y: -49,
            w: 34,
            h: 1,
            type: "solid",
          },
          {
            x: -20,
            y: -60,
            w: 31,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -78,
            w: 1,
            h: 18,
            type: "solid",
          },
          {
            x: -31,
            y: -23,
            w: 42,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -34,
            w: 1,
            h: 21,
            type: "solid",
          },
          {
            x: -41,
            y: -92,
            w: 86,
            h: 1,
            type: "solid",
          },
          {
            x: 45,
            y: -92,
            w: 1,
            h: 88,
            type: "solid",
          },
          {
            x: -41,
            y: -5,
            w: 86,
            h: 1,
            type: "solid",
          },
          {
            x: 21,
            y: -71,
            w: 1,
            h: 44,
            type: "solid",
          },
          {
            x: 32,
            y: -72,
            w: 1,
            h: 4,
            type: "solid",
          },
          {
            x: 33,
            y: -68,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 34,
            y: -61,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 35,
            y: -54,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 36,
            y: -47,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 37,
            y: -40,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 38,
            y: -33,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 39,
            y: -26,
            w: 1,
            h: 7,
            type: "solid",
          },
          {
            x: 40,
            y: -19,
            w: 1,
            h: 4,
            type: "solid",
          },
          {
            x: 11,
            y: -61,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 12,
            y: -62,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 13,
            y: -63,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 14,
            y: -64,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 15,
            y: -65,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 16,
            y: -66,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 17,
            y: -67,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 18,
            y: -68,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 19,
            y: -69,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 20,
            y: -70,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -8,
            y: -24,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -7,
            y: -25,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -6,
            y: -26,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -5,
            y: -27,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -4,
            y: -27.9,
            w: 1,
            h: 0.8999999999999986,
            type: "solid",
          },
          {
            x: -3,
            y: -29,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -2,
            y: -30,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: -1,
            y: -31,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 0,
            y: -32,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 1,
            y: -33,
            w: 1,
            h: 1,
            type: "solid",
          },
          {
            x: 2,
            y: -34,
            w: 1,
            h: 1,
            type: "solid",
          },
        ],
      },
      thing: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: 10,
        y: -195,
        scale: 1,
        depth: -315,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing1: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: -130,
        y: -270,
        scale: 1,
        depth: -314.9,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing2: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: -61,
        y: -318,
        scale: 1,
        depth: -314.79999999999995,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing3: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: 42,
        y: -58,
        scale: 1,
        depth: -314.69999999999993,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing4: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: 51,
        y: -330,
        scale: 3.2,
        depth: -314.5999999999999,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing5: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: 172,
        y: -353,
        scale: 1,
        depth: -314.5999999999999,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing6: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: 139,
        y: -47,
        scale: 3.2,
        depth: -314.4999999999999,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing7: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: -153,
        y: -33,
        scale: 1,
        depth: -314.4999999999999,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing8: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: -131,
        y: -151,
        scale: 1,
        depth: -314.39999999999986,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing9: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: -77,
        y: -150,
        scale: 0.35000000000000003,
        depth: -314.29999999999984,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing10: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: -147,
        y: -362,
        scale: 1.3,
        depth: -314.1999999999998,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
      thing11: {
        image: "thing",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI1jYBhowIhD/D+xellwaTyZqgQXFONBVabYfwvORpb5j6wJl+b/nIIofCZ0zeaz7zGYz76HVTM2wITMgWpkJFYzhgGEALrzSTaAYhfgNYCQn7E5H8MF9wvVGBiIS0RwgJwS/0MNIGi7UttJuF5kdzMq9t+C2w4zDJfTsbkAxVK8uvDrJQ0AALEfID2H8gN+AAAAAElFTkSuQmCC",
        x: 66,
        y: -274,
        scale: 1.3,
        depth: -314.0999999999998,
        notes: "",
        locked: false,
        useManualDepth: false,
        hitboxes: [
          {
            x: -8,
            y: -1,
            w: 16,
            h: 1,
            type: "solid",
          },
          {
            x: -9,
            y: -17,
            w: 18,
            h: 17,
            type: "trigger",
          },
        ],
      },
    };
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
    Object.entries(this.things).forEach(([key, thing]) => {
      const t = this.thingsGroup.create(thing.x, thing.y, thing.image, false);
      t.setScale(thing.scale);
      t.interact = thing.interact;
      t.setOrigin(0.5, 1);
      t.setDepth(thing.depth);
      thing.hitboxes.forEach((hitbox) => {
        if (hitbox.type === "solid") {
          const h = main.add.zone(
            thing.x + thing.scale * hitbox.x + (thing.scale * hitbox.w) / 2,
            thing.y + thing.scale * hitbox.y + (thing.scale * hitbox.h) / 2,
            thing.scale * hitbox.w,
            thing.scale * hitbox.h,
          );
          // h.setOrigin(0.5, 1);
          this.thingsStaticGroup.add(h);
          main.physics.add.collider(main.player, h);
        }
        if (hitbox.type === "trigger") {
          const h = main.add.zone(
            thing.x + thing.scale * hitbox.x + (thing.scale * hitbox.w) / 2,
            thing.y + thing.scale * hitbox.y + (thing.scale * hitbox.h) / 2,
            thing.scale * hitbox.w,
            thing.scale * hitbox.h,
          );
          // h.setOrigin(0.5, 1);
          this.thingsStaticGroup.add(h);
          main.physics.add.overlap(main.player, h, () => {
            if (thing.interact) thing.interact();
          });
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
    this.player = new Player();
    this.world = new World();
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
