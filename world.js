import Phaser from "./phaser.esm.min.js";
import { things } from "./things.js";

export class World {
  constructor(scene) {
    this.scene = scene;
    this.thingsGroup = scene.add.group();
    this.thingsStaticGroup = scene.physics.add.staticGroup();
    this.thingsTriggerGroup = scene.physics.add.staticGroup();
    this.things = things;
    Object.entries(this.things).forEach(([key, thing]) => {
      const t = this.thingsGroup.create(thing.x, thing.y, thing.image, false);
      t.setScale(thing.scale);
      if (thing.interact) t.interact = thing.interact;
      t.setOrigin(0.5, 1);
      t.setDepth(thing.depth);
      t.zones = [];
      t.name = key;
      thing.hitboxes.forEach((hitbox) => {
        if (hitbox.type === "solid") {
          const h = scene.add.zone(
            thing.x + thing.scale * hitbox.x + (thing.scale * hitbox.w) / 2,
            thing.y + thing.scale * hitbox.y + (thing.scale * hitbox.h) / 2,
            thing.scale * hitbox.w,
            thing.scale * hitbox.h,
          );
          this.thingsStaticGroup.add(h);
          scene.physics.add.collider(scene.player, h);
          t.zones.push(h);
        }
        if (hitbox.type === "trigger") {
          const h = scene.add.zone(
            thing.x + thing.scale * hitbox.x + (thing.scale * hitbox.w) / 2,
            thing.y + thing.scale * hitbox.y + (thing.scale * hitbox.h) / 2,
            thing.scale * hitbox.w,
            thing.scale * hitbox.h,
          );
          h.parent = t;
          this.thingsTriggerGroup.add(h);
          t.zones.push(h);
        }
      });
    });
  }
}
