export let things = {
  class: {
    image: "class",
    x: 0,
    y: 150,
    scale: 2.1875,
    depth: -68.4,
    hitboxes: [
      {
        x: -64,
        y: -128,
        w: 128,
        h: 28,
        type: "solid",
      },
      {
        x: -64,
        y: -100,
        w: 4,
        h: 100,
        type: "solid",
      },
      {
        x: -60,
        y: -4,
        w: 120,
        h: 4,
        type: "solid",
      },
      {
        x: 60,
        y: -100,
        w: 4,
        h: 100,
        type: "solid",
      },
    ],
  },
  table: {
    image: "table",
    x: -84,
    y: -18,
    scale: 1.5,
    hitboxes: [
      {
        x: -17,
        y: -13,
        w: 34,
        h: 13,
        type: "solid",
      },
    ],
  },
  chair: {
    image: "chair",
    x: -74,
    y: -15,
    scale: 1.3333333333333333,
    hitboxes: [
      {
        x: -5.5,
        y: -10,
        w: 11,
        h: 10,
        type: "solid",
      },
    ],
  },
  chair1: {
    image: "chair",
    x: -94,
    y: -15,
    scale: 1.3333333333333333,
    hitboxes: [
      {
        x: -5.5,
        y: -10,
        w: 11,
        h: 10,
        type: "solid",
      },
    ],
  },
};
function pickUp(self) {
  self.zones.forEach((zone) => {
    zone.destroy();
  });
  self.destroy();
  (async () => {
    await window.ui.write("picked up " + self.name, { timeout: 2000 });
    await window.ui.write("good job!", { timeout: 1000 });
  })();
  // window.ui.write(
  //   "picked up " +
  //     self.name +
  //     "! Lorem ipsum dolor sit amet, consectetur adipiscing elit. In purus ante, mattis nec diam at, tincidunt scelerisque nisi. Aenean non accumsan ante. Praesent et libero felis. Nunc at rhoncus ipsum, eget lacinia augue. Mauris et quam eget justo blandit hendrerit nec sit amet purus. Aenean luctus maximus elementum. Cras mollis orci sit amet ipsum interdum porttitor. Integer commodo sit amet ex vel commodo. Cras et aliquam nisi. Mauris orci tortor, consequat sed ultricies id, porta vel elit. Sed sed ultricies risus, nec bibendum dui. Vestibulum rhoncus, eros non congue tristique, nunc sapien dignissim ante, ut vulputate augue massa sed nisl. Nunc faucibus semper mi, nec rhoncus libero fringilla eu. Sed commodo nisl et risus faucibus pharetra. Quisque et venenatis libero, ultrices venenatis dolor. Fusce porttitor enim sit amet est ultrices, eget dictum tellus vestibulum. Curabitur lacinia nunc nec tellus iaculis euismod. Nam eget ex congue, ultrices eros eu, consequat lorem. In ultricies, magna vitae ultricies aliquet, augue felis condimentum arcu, vel accumsan sem magna convallis ligula. Morbi tincidunt, lacus quis vulputate tristique, est urna facilisis augue, pulvinar mollis turpis mauris et diam. Nam eu consectetur odio, a porttitor diam. Suspendisse sagittis ipsum quis aliquam dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vel suscipit mi. Nulla sodales, risus at sollicitudin tempus, nulla arcu finibus nisl, id feugiat dui massa quis risus. Sed eu ipsum scelerisque, aliquam velit sed, malesuada est. Fusce vestibulum pellentesque risus. Cras pulvinar metus ac tellus vulputate, non aliquam felis aliquam. Suspendisse potenti. Vestibulum ut facilisis eros. Etiam id feugiat metus. Praesent neque magna, tincidunt accumsan dapibus ut, feugiat ac urna.Nunc dignissim ligula vel aliquet condimentum. Donec vel placerat mauris, eu aliquet urna. Donec in pulvinar est. Duis tellus diam, imperdiet vitae felis ut, finibus sodales mauris. Cras eu vehicula lectus. Etiam imperdiet quis libero et facilisis. Vivamus eget massa a lacus sollicitudin tempus vitae et nunc. In est mi, commodo nec libero sit amet, iaculis convallis orci. Duis sagittis felis non nisl convallis, ac pulvinar ante vestibulum. Aliquam a turpis pulvinar est hendrerit volutpat eu eget orci. Cras molestie varius iaculis. Quisque tristique tempus semper. Nam vitae convallis justo. Vivamus interdum turpis quam, et malesuada elit sollicitudin in. Vestibulum neque eros, tristique eget massa tincidunt, convallis vestibulum odio. Nunc a pretium magna, in faucibus nisl. In lacus augue, consectetur eget aliquam vel, sollicitudin volutpat sem. Donec auctor tincidunt lobortis. Sed porta odio non faucibus tempor.",
  //   { timeout: 0, speed: 0.00001 },
  // );
  // window.ui.write("picked up " + self.name, { timeout: 2000 });
  console.log(self.name);
}

function playPribehy(self) {
  window.paused = true;
  document.getElementById("content").innerHTML =
    `<button style="position: absolute; top: calc(10% - 50px); right: 10%; width: 50px; height: 50px; font-size: 24px; background-color: red; border: none; color: white;" onclick="window.paused = false;document.getElementById(\'content\').innerHTML = \'\'">X</button>
    <iframe style="background-color: white; border: 3px solid black; border-radius: 5px; width: 80%; height: 80%; margin: auto; zoom: 0.75;" src="https://pribehy.surge.sh"></iframe>`;
}

if (window.params.has("things")) {
  things = JSON.parse(decodeURIComponent(window.params.get("things")));
}

export async function create() {
  // window.paused = true;
  // await window.ui.write("Zdravím!", { next: true });
  // await window.ui.write(
  //   "Vítej ve hře <b>Příběhy 2</b>, inspirované originálními Příběhy.",
  //   { next: true },
  // );
  // const answer = await window.ui.write("Vyber si něco:", {
  //   answers: {
  //     1: "Možnost 1 󱢻",
  //     2: "Možnost 2 󱢻",
  //     3: "Možnost 3 󱢻",
  //     zralok: "Žralok 󱢺",
  //     pokracovat: "Pokračovat ",
  //   },
  // });
  // await window.ui.write(`Vybral sis ${answer}.`, { next: true });
  // window.paused = false;
  // await window.ui.write("Zkus se tady projít.", {
  //   timeout: 3000,
  //   skipTime: true,
  // });
}
