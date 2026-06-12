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
      if (this.joystick.pointer === null && !window.paused) {
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
  async write(
    text,
    {
      speed = 20,
      timeout = 0,
      next = false,
      skip = true,
      freeze = false,
      skipTime = false,
      question = [],
    } = {},
  ) {
    if (freeze) {
      window.paused = true;
    }
    const text_visible = document.getElementById("text-visible");
    const text_invisible = document.getElementById("text-invisible");
    const myTextId = Symbol("writeTask");
    this.currentTextId = myTextId;
    if (this.textTimeout) {
      clearTimeout(this.textTimeout);
    }
    if (speed > 0) {
      let skipping = false;
      if (skip) {
        document.addEventListener(
          "dblclick",
          (event) => {
            skipping = true;
          },
          { once: true },
        );
      }
      text_visible.innerHTML = "";
      text_invisible.innerHTML = text;
      document.getElementById("text").scroll(0, 0);
      const steps = [];
      const stack = [text_visible];
      for (const child of text_invisible.childNodes) {
        steps.push({
          node: child,
          parentNode: text_visible,
          cloneParent: text_invisible,
        });
      }
      while (steps.length > 0) {
        const { node, parentNode, cloneParent } = steps.shift();
        if (node.nodeType == Node.TEXT_NODE) {
          if (node.textContent.length > 0) {
            parentNode.appendChild(
              document.createTextNode(node.textContent[0]),
            );
            node.textContent = node.textContent.slice(1);
            steps.unshift({
              node: node,
              parentNode: parentNode,
              cloneParent: cloneParent,
            });
          } else if (cloneParent !== text_invisible) {
            cloneParent.remove();
          }
        }
        if (node.nodeType == Node.ELEMENT_NODE) {
          const clone = node.cloneNode(false);
          parentNode.appendChild(clone);
          stack.push(clone);
          for (let child of Array.from(node.childNodes)) {
            steps.unshift({
              node: child,
              parentNode: clone,
              cloneParent: node,
            });
          }
        }
        if (!skipping) {
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    } else {
      text_visible.textContent = text;
      text_invisible.textContent = "";

      document.getElementById("text").scroll(0, 0);
    }
    if (timeout > 0) {
      if (skipTime) {
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, timeout)),
          new Promise((resolve) =>
            document.addEventListener("dblclick", resolve, { once: true }),
          ),
        ]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, timeout));
      }
      if (this.currentTextId !== myTextId) return;
      text_visible.textContent = "";
      text_invisible.textContent = "";
    }
    if (next) {
      await new Promise((resolve) =>
        document.addEventListener("click", resolve),
      );
    }
    if (question.length > 0) {
      // TODO
    }
    if (freeze) {
      window.paused = false;
    }
  }
  update() {
    if (!window.paused) {
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
    } else {
      this.joystick.dir.x = 0;
      this.joystick.dir.y = 0;
      this.joystick.keys = false;
      this.joystick.pointer = null;
      this.joystick.dir = { x: 0, y: 0 };
      this.joystick.element.style.top = "70%";
      this.joystick.element.style.left = "50%";
      this.joystick.element.style.opacity = 0.6;
      this.joystick.stick.setAttribute("cx", "0px");
      this.joystick.stick.setAttribute("cy", "0px");
    }
  }
}
