import Tip from "./tip.js";
import { clip } from "./util.js";

class Coral {
  constructor(p, amount) {
    this._amount = amount;
    this._base = {
      x: 0.5,
      y: 1.0,
    };
    this._tips = [];
    this._extraBright = 0;
    for (let i = 0; i < this._amount; i++) {
      this._tips.push(
        new Tip(p, p.random(0.25, 0.75), p.random(0.2, 0.7), 0.001)
      );
    }
  }
  get amount() {
    return this._amount;
  }
  get tips() {
    return this._tips;
  }

  get base() {
    return this._base;
  }
  set base(o) {
    this._base = o;
  }

  get extraBright() {
    return this._extraBright;
  }
  set extraBright(i) {
    this._extraBright = i;
  }

  drawA(p) {
    this._tips.forEach((t) => {
      (t.color[0] = t.color[0] + p.random([-1, 1])), 0, 255;
      (t.color[1] = t.color[1] + p.random([-1, 1])), 0, 255;
      (t.color[2] = t.color[2] + p.random([-1, 1])), 0, 255;
      t.move(1);
      t.draw(p, this._base, this._extraBright);
    });
  }
  drawB(p, atCloud) {
    this._tips.forEach((t) => {
      if (atCloud) {
        (t.color[0] = t.color[0] + p.random([-1, 1])), 0, 255;
        (t.color[1] = t.color[1] + p.random([-1, 1])), 0, 255;
        (t.color[2] = t.color[2] + p.random([-1, 1])), 0, 255;
      } else {
        if (
          Math.round(t.color[0]) === Math.round(t.color[1]) &&
          Math.round(t.color[1]) === Math.round(t.color[2])
        ) {
          //do nothing, colors are good!
        } else {
          const avg = (t.color[0] + t.color[1] + t.color[2]) / 3;
          t.color.forEach((c, i) => {
            t.color[i] = c - (c - avg) / 100;
          });
        }
      }
      t.move();
      t.draw(p, this._base, this._extraBright);
    });
  }

  drawC(p, pos, timeSinceClick, speed) {
    this._tips.forEach((t) => {
      let deviation = 0;
      if (pos) {
        if (timeSinceClick < 2000) {
          const completed = timeSinceClick / 2000;
          if (completed < 0.1) {
            deviation = (t.pos.x - pos.x) * (completed * 4);
          } else {
            deviation = (t.pos.x - pos.x) * (1 - completed) * 0.5;
          }
          t.moveAway(p, pos, 0.1);
        }
      }
      t.move(speed);
      t.drawC(p, this._base, deviation * speed);
    });
  }

  drawD(p, yPos, time) {
    const x = p.sin(time * 0.0002) * 0.25 + 0.5;
    this._tips.forEach((t, i) => {
      t.follow(p, { x: x, y: yPos[i] }, 0.001);
      if (
        Math.round(t.color[0]) === Math.round(t.color[1]) &&
        Math.round(t.color[1]) === Math.round(t.color[2])
      ) {
        //do nothing, colors are greyscale!
      } else {
        const avg = (t.color[0] + t.color[1] + t.color[2]) / 3;
        t.color.forEach((c, i) => {
          t.color[i] = c - (c - avg) / 100;
        });
      }
      t.draw(p, this._base, this._extraBright);
    });
  }

  drawE(p) {
    this._tips.forEach((t, i) => {
      t.color[0] = t.color[0] + p.random([-1, 1]);
      t.color[1] = t.color[1] + p.random([-1, 1]);
      t.color[2] = t.color[2] + p.random([-1, 1]);
      t.move();
      t.draw(p, this._base, this._extraBright);
    });
  }
}

export default Coral;
