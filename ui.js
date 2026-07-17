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
    this.interactKey = scene.input.keyboard.addKey("E");
    this.lastInteract = 0;
    this.interactKey.on("down", () => {
      const currentTime = Date.now();
      const tapLength = currentTime - this.lastInteract;
      if (tapLength < 300 && tapLength > 0) {
        document.dispatchEvent(new Event("dblclick", { bubbles: true }));
      }
      document.dispatchEvent(new Event("pointerdown"));
      this.lastInteract = currentTime;
    });
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
      speed = 20, // delay between characters in milliseconds
      timeout = 0, // time to wait after text is written in milliseconds
      next = false, // wait to click after text is written
      skip = true, // skip text writing with doubleclick
      freeze = undefined, // freeze game when processing
      skipTime = false, // skip timeout with doubleclick
      answers = {}, // answers in key-text format
    } = {},
  ) {
    if (freeze === undefined) freeze = Object.keys(answers).length > 0;
    if (freeze) {
      window.paused = true;
    }
    const unlock = () => {
      if (freeze) {
        window.paused = false;
      }
    };
    const textVisible = document.getElementById("text-visible");
    const textInisible = document.getElementById("text-invisible");
    const myTextId = Symbol("writeTask");
    this.currentTextId = myTextId;
    let skipping = false;

    if (speed > 0) {
      if (skip) {
        document.ondblclick = (event) => {
          skipping = true;
        };
      }

      textVisible.innerHTML = "";
      textInisible.innerHTML = text;
      document.getElementById("answers").innerHTML = "";
      document.getElementById("text").scroll(0, 0);

      const steps = [];
      const stack = [textVisible];

      for (const child of textInisible.childNodes) {
        steps.push({
          node: child,
          parentNode: textVisible,
          cloneParent: textInisible,
        });
      }

      while (steps.length > 0) {
        if (this.currentTextId !== myTextId) {
          unlock();
          return;
        }

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
          } else if (cloneParent !== textInisible) {
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
          if (this.currentTextId !== myTextId) {
            unlock();
            return;
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (this.currentTextId !== myTextId) {
        unlock();
        return;
      }
    } else {
      textVisible.textContent = text;
      textInisible.textContent = "";
      document.getElementById("text").scroll(0, 0);
    }

    if (next) {
      await new Promise((resolve) =>
        document.addEventListener("pointerdown", resolve, { once: true }),
      );
      if (this.currentTextId !== myTextId) {
        unlock();
        return;
      }
    }

    if (timeout > 0) {
      if (skipTime) {
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, timeout)),
          new Promise((resolve) => (document.ondblclick = resolve)),
        ]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, timeout));
      }
      if (this.currentTextId !== myTextId) {
        unlock();
        return;
      }
      textVisible.textContent = "";
      textInisible.textContent = "";
    }

    if (Object.keys(answers).length > 0) {
      const keys = "󰎦 󰎩 󰎬 󰎮 󰎰 󰎵 󰎸 󰎻 󰎾 󰎣".split(" ");
      const codes = "ONE TWO THREE FOUR FIVE SIX SEVEN EIGHT NINE ZERO".split(
        " ",
      );
      const result = await new Promise(async (resolve) => {
        let canClick = false;
        for (const [i, [key, value]] of Object.entries(answers).entries()) {
          const answer = document.createElement("button");
          answer.style.position = "relative";
          answer.innerHTML =
            "<span style='position: absolute; left: 5px'>" +
            keys[i] +
            "</span>" +
            value;
          answer.onclick = () => {
            if (this.currentTextId !== myTextId) return;
            if (!canClick) return;
            resolve(key);
          };
          main.input.keyboard.on("keydown-" + codes[i], answer.onclick);
          document.getElementById("answers").appendChild(answer);
          if (!skipping) await new Promise((r) => setTimeout(r, 75));
        }
        canClick = true;
      });
      for (const [i, [key, value]] of Object.entries(answers).entries()) {
        main.input.keyboard.off("keydown-" + codes[i]);
      }
      if (this.currentTextId !== myTextId) {
        unlock();
        return;
      }
      textVisible.textContent = "";
      textInisible.textContent = "";
      document.getElementById("answers").innerHTML = "";
      return result;
    }
    unlock();
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
      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
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

document.addEventListener(
  "click",
  (e) => {
    if (e.isTrusted) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  },
  { capture: true },
);

let activeBtn = null;

document.body.addEventListener("pointerdown", (e) => {
  const btn = e.target.closest("button");
  if (btn) {
    activeBtn = btn;
    btn.classList.add("active");
  }
});
document.body.addEventListener("pointerup", (e) => {
  const btn = e.target.closest("button");
  if (btn) {
    if (
      btn.classList.contains("active") &&
      document.elementFromPoint(e.clientX, e.clientY) === btn
    ) {
      btn.dispatchEvent(new Event("click", { bubbles: true }));
    }
    btn.classList.remove("active");
  } else {
    activeBtn.classList.remove("active");
    activeBtn = null;
  }
  activeBtn = null;
});
document.body.addEventListener("pointerleave", () => {
  if (activeBtn) {
    activeBtn.classList.remove("active");
    activeBtn = null;
  }
});
document.body.addEventListener("pointercancel", () => {
  if (activeBtn) {
    activeBtn.classList.remove("active");
    activeBtn = null;
  }
});

document.body.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
  },
  { passive: false },
);

let lastTap = 0;

document.body.addEventListener(
  "pointerdown",
  (e) => {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      e.target.dispatchEvent(new Event("dblclick", { bubbles: true }));
      lastTap = 0;
    } else {
      lastTap = currentTime;
    }
  },
  { passive: false },
);
