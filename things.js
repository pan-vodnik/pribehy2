export let things = {
  class: {
    image: "class",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACZCAMAAADQOcKqAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAAElSURBVHic7ZwxEoQwDMSS5g7+/+GDXOUPWDtjuQA6tI5my6y11sZmndk3Nhv+/yF4/0+dwCF4nvuCZgsggAACCCCAAAIIIIAAMQAfaIIAvu/8n42fSQD8EbSnPy8Bkhzoj183IECGA6OrGAfgHaCbUADegf74dQMCZDgwuopxAN4BugkF4B3oj183IECGA6OrGAfgHaCbUADegf74dQMCZDgwuopxAN4BugkF4B3oj183IECGA6OrGAfgHaCbUADegf74dQMCZDgwuopxAN4BugkF4B3oj183IECGA6OrGAfgHaCbUADegf74dQMCZDgwuopxAN4BugkF4B3oj183IECGA6OrGAfgHaCbUADegf74dQMCwA6wNzIdAvJOKv5WLvhesh8sqP4BK+iBqgAAAABJRU5ErkJggg==",
    x: -29,
    y: 103,
    scale: 1.65,
    depth: -104,
    hitboxes: [
      {
        x: -64,
        y: -153,
        w: 128,
        h: 28,
        type: "solid",
      },
      {
        x: -64,
        y: -125,
        w: 4,
        h: 125,
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
        y: -125,
        w: 4,
        h: 125,
        type: "solid",
      },
    ],
  },
  teacher_chair: {
    image: "teacher_chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAMAAACDMFxkAAAAAXNSR0IArs4c6QAAACRQTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////piMjjx4ejH+uyQAAAAx0Uk5TAP//////////////CcRQJgAAAD5JREFUCJmVjbkRADAMwqCN9983MX7ydOEoVEkAqGGNQ2OT84kWZI45liAUoP7gT0IN9zIbZBeEpbwQ3dw4AaXXAz0R3oQcAAAAAElFTkSuQmCC",
    x: -73,
    y: -76,
    scale: 1.3499999999999999,
    interact: async () => {
      await window.ui.convo({
        start: {
          text: "Opravdu si chceš sednout???",
          answers: {
            yes: "ano",
            no: "ne",
          },
        },
        yes: {
          text: "sedíš :D",
        },
        no: {
          text: "nesedíš :(",
        },
      })
    },
    action: "sednout si",
    hitboxes: [
      {
        x: -5,
        y: -5,
        w: 10,
        h: 5,
        type: "solid",
      },
      {
        x: -5,
        y: -20,
        w: 10,
        h: 15,
        type: "trigger",
      },
    ],
  },
  teacher_table: {
    image: "teacher_table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAMAAAB7LJ7rAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABKSURBVCiRnZIxCgAgDAOTgv//soNWbKkRzaZHjgwFKAKwiTBh8+w4fZ7byVDh2JYBTeQJ+641cOA4+FcexI5r75M8jZvPa1ufQweVpQVe6QCJPAAAAABJRU5ErkJggg==",
    x: -68,
    y: -61,
    scale: 1.2777777777777777,
    hitboxes: [
      {
        x: -15,
        y: -8,
        w: 30,
        h: 8,
        type: "solid",
      },
    ],
  },
  table: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -8,
    y: -41,
    scale: 1.1721311475409835,
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
  table1: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: 32,
    y: -41,
    scale: 1.1721311475409835,
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
  table2: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -108,
    y: -41,
    scale: 1.1721311475409835,
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
  table3: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -68,
    y: -41,
    scale: 1.1721311475409835,
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
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 0,
    y: -39,
    scale: 1.222222222222222,
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
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -16,
    y: -39,
    scale: 1.222222222222222,
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
  chair2: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 40,
    y: -39,
    scale: 1.222222222222222,
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
  chair3: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 24,
    y: -39,
    scale: 1.222222222222222,
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
  chair4: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -100,
    y: -39,
    scale: 1.222222222222222,
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
  chair5: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -116,
    y: -39,
    scale: 1.222222222222222,
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
  chair6: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -60,
    y: -39,
    scale: 1.222222222222222,
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
  chair7: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -76,
    y: -39,
    scale: 1.222222222222222,
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
  table4: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -8,
    y: -10,
    scale: 1.17,
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
  table5: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: 32,
    y: -10,
    scale: 1.17,
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
  table6: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -108,
    y: -10,
    scale: 1.1721311475409835,
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
  table7: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -68,
    y: -10,
    scale: 1.1721311475409835,
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
  chair8: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 0,
    y: -8,
    scale: 1.22,
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
  chair9: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -16,
    y: -8,
    scale: 1.222222222222222,
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
  chair10: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 40,
    y: -8,
    scale: 1.22,
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
  chair11: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 24,
    y: -8,
    scale: 1.22,
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
  chair12: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -100,
    y: -8,
    scale: 1.222222222222222,
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
  chair13: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -116,
    y: -8,
    scale: 1.222222222222222,
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
  chair14: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -60,
    y: -8,
    scale: 1.222222222222222,
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
  chair15: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -76,
    y: -8,
    scale: 1.222222222222222,
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
  table8: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -8,
    y: 21,
    scale: 1.17,
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
  table9: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: 32,
    y: 21,
    scale: 1.17,
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
  table10: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -108,
    y: 21,
    scale: 1.17,
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
  table11: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -68,
    y: 21,
    scale: 1.17,
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
  chair16: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 0,
    y: 23,
    scale: 1.22,
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
  chair17: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -16,
    y: 23,
    scale: 1.22,
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
  chair18: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 40,
    y: 23,
    scale: 1.22,
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
  chair19: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 24,
    y: 23,
    scale: 1.22,
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
  chair20: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -100,
    y: 23,
    scale: 1.22,
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
  chair21: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -116,
    y: 23,
    scale: 1.22,
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
  chair22: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -60,
    y: 23,
    scale: 1.22,
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
  chair23: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -76,
    y: 23,
    scale: 1.22,
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
  table12: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -8,
    y: 52,
    scale: 1.17,
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
  table13: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: 32,
    y: 52,
    scale: 1.17,
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
  table14: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -108,
    y: 52,
    scale: 1.17,
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
  table15: {
    image: "table",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAMAAABZLm3uAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABfSURBVCiRzZBLDoAwCEQHrPe/skBiQy0fV8a36WJeBwJADQCdDRQqbCwKe961LE2B8qyaSjKlGOQWM8X/38vydb3CDXreUZ1/iKHKoW+ABH9UEkOyqWTGHX6moDAsvAC2UgY31rLEzgAAAABJRU5ErkJggg==",
    x: -68,
    y: 52,
    scale: 1.17,
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
  chair24: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 0,
    y: 54,
    scale: 1.22,
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
  chair25: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -16,
    y: 54,
    scale: 1.22,
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
  chair26: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 40,
    y: 54,
    scale: 1.22,
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
  chair27: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: 24,
    y: 54,
    scale: 1.22,
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
  chair28: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -100,
    y: 54,
    scale: 1.22,
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
  chair29: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -116,
    y: 54,
    scale: 1.22,
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
  chair30: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -60,
    y: 54,
    scale: 1.22,
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
  chair31: {
    image: "chair",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAMAAAC6q9RHAAAAAXNSR0IArs4c6QAAAB5QTFRFAAAAAAAAlHZG0cku+/I2m4BVoZV9p5yG29vb////5NVVlQAAAAp0Uk5TAP///////////36JFFYAAABNSURBVAiZjY9LDgAxCEIR6f2vPML8uiwL8jCVWAAoC1Etq35MMJJMqNUZd1hhmSlaoheUTmV3ezPumo/feT+d7YVJo1y09eDEcX9j/ALi+AHYqeKLXAAAAABJRU5ErkJggg==",
    x: -76,
    y: 54,
    scale: 1.22,
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

function playPribehy(self) {
  window.paused = true;
  document.getElementById("content").innerHTML =
    `<button style="position: absolute; top: calc(10% - 50px); right: 10%; width: 50px; height: 50px; font-size: 24px; background-color: red; border: none; color: white;" onclick="window.paused = false;document.getElementById(\'content\').innerHTML = \'\'">X</button>
    <iframe style="background-color: white; border: 3px solid black; border-radius: 5px; width: 80%; height: 80%; margin: auto; zoom: 0.75;" src="https://pribehy.surge.sh"></iframe>`;
}

if (window.params.has("edit")) {
  things = JSON.parse(localStorage.getItem("pribehy2_editor_data"));
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
