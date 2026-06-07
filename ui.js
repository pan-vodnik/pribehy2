import Phaser from "./phaser.esm.min.js";

export class UI {
  constructor() {
    this.joystick = {
      container: document.getElementById("joystick-container"),
      element: document.getElementById("joystick"),
      base: document.getElementById("joystick-base"),
      stick: document.getElementById("joystick-stick"),
      pointer: null,
      keys: false,
      dir: { x: 0, y: 0 },
    };
  }
  create(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
    });
    this.interact_key = scene.input.keyboard.addKey("E");
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
  async write(text, { speed = 20, timeout = 0 } = {}) {
    const myTextId = Symbol("writeTask");
    this.currentTextId = myTextId;
    if (this.textTimeout) {
      clearTimeout(this.textTimeout);
    }
    if (speed > 0) {
      // const tree = new TreeWalker();
      document.getElementById("text-hidden").textContent = text;
      for (let i = 0; i < text.length; i++) {
        if (this.currentTextId !== myTextId) return;
        document.getElementById("text-visible").textContent = text.substring(
          0,
          i + 1,
        );
        document.getElementById("text-hidden").textContent = text.substring(
          i + 1,
          text.length,
        );
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    } else {
      document.getElementById("text-visible").textContent = text;
    }
    if (timeout > 0) {
      await new Promise((resolve) => setTimeout(resolve, timeout));
      if (this.currentTextId !== myTextId) return;
      document.getElementById("text-visible").textContent = "";
    }
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
      this.scene.player.interact();
    }
  }
}
