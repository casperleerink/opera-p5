class Story {
  constructor(p) {
    this._index = 0;
    this._pos = { x: -0.2, y: 0.5 };
    this._a = p.loadStrings("assets/textA.txt");
    this._c = p.loadStrings("assets/textC.txt");
    this._d = p.loadStrings("assets/textD.txt");
    this._e = p.loadStrings("assets/textE.txt");
    this._brightness = 180;
    this._currentLine = this._a[this._index];
  }
  get index() {
    return this._index;
  }
  set index(i) {
    this._index = i;
  }
  get pos() {
    return this._pos;
  }
  set pos(o) {
    this._pos = o;
  }
  get brightness() {
    return this._brightness;
  }
  set brightness(i) {
    this._brightness = i;
  }
  get a() {
    return this._a;
  }
  get c() {
    return this._c;
  }
  get d() {
    return this._d;
  }
  get e() {
    return this._e;
  }

  follow(p, pos, speed) {
    const d = p.dist(this._pos.x, this._pos.y, pos.x, pos.y);
    const angle = p.atan2(pos.y - this._pos.y, pos.x - this._pos.x);
    const magnitude = d * speed;
    this._pos.x += p.cos(angle) * magnitude;
    this._pos.y += p.sin(angle) * magnitude;
  }

  fadeText(data) {
    //calculates fades over time
    const { time, fadeIn, fadeOut, duration } = data;
    if (fadeIn && time < fadeIn) {
      return time / fadeIn;
    }
    if (duration && fadeOut && time > duration - fadeOut) {
      return 1 - (time - (duration - fadeOut)) / fadeOut;
    }
    return 1;
  }
  helperText(p, text, pos, time) {
    const brightness = this.fadeText({
      time,
      fadeIn: 3000,
      fadeOut: 2000,
      duration: 10000,
    });
    p.push();
    p.noStroke();
    p.textStyle(p.ITALIC);
    p.textSize(p.width * 0.013);
    p.fill(255, 170 * brightness);
    p.text(text, pos.x * p.width, pos.y * p.height);
    p.pop();
  }
  drawA(p) {
    if (this._a.length > 0) {
      this._currentLine = this._a[this._index];
      p.push();
      p.noStroke();
      p.fill(255, this._brightness);
      p.textSize(p.width * 0.015);
      p.text(this._currentLine, this._pos.x * p.width, this._pos.y * p.height);
      p.pop();
    }
  }
  drawC(p) {
    if (this._c.length > 0) {
      this._currentLine = this._c[this._index];
      p.push();
      p.noStroke();
      p.fill(255, this._brightness);
      p.textSize(p.width * 0.015);
      p.text(this._currentLine, this._pos.x * p.width, this._pos.y * p.height);
      p.pop();
    }
  }
  drawCloudLostFound(p, lost) {
    p.push();
    p.noStroke();
    p.fill(255);
    p.textSize(p.width * 0.015);
    const text = lost ? "Cloud has been lost..." : "And Coral is found...";
    p.text(text, this._pos.x * p.width, this._pos.y * p.height);
    p.pop();
  }
  insidePantheon(p, brightness) {
    p.push();
    p.noStroke();
    p.fill(255, this._brightness * brightness);
    p.textSize(p.width * 0.02);
    p.text("Inside Pantheon", 0.5 * p.width, 0.4 * p.height);
    p.pop();
  }
  drawDbegin(p, time) {
    const brightness = this.fadeText({
      time,
      fadeIn: 22000,
      fadeOut: 8000,
      duration: 40000,
    });
    p.push();
    p.noStroke();
    p.fill(255, this._brightness * brightness);
    p.textSize(p.width * 0.015);
    this._d.forEach((line, idx) => {
      if (idx < 5) {
        p.text(line, 0.5 * p.width, (0.3 + idx * 0.05) * p.height);
      }
    });
    p.pop();
  }
  drawDEnd(p, time) {
    const brightness = this.fadeText({
      time,
      fadeIn: 20000,
      fadeOut: 6000,
      duration: 40000,
    });
    p.push();
    p.noStroke();
    p.fill(255, this._brightness * brightness);
    p.textSize(p.width * 0.015);
    this._d.forEach((line, idx) => {
      if (idx > 4) {
        p.text(line, 0.5 * p.width, (0.1 + (idx - 4) * 0.05) * p.height);
      }
    });
    p.pop();
  }
  onceSheDries(p, time) {
    const brightness = this.fadeText({
      time,
      fadeIn: 4000,
    });
    p.push();
    p.noStroke();
    p.fill(255, this._brightness * brightness);
    p.textSize(p.width * 0.02);
    p.text("ONCE SHE DRIES", 0.5 * p.width, 0.5 * p.height);
    p.pop();
  }

  drawE(p) {
    if (this._e.length > 0) {
      this._currentLine = this._e[this._index];
      p.push();
      p.noStroke();
      p.fill(255, this._brightness);
      p.textSize(p.width * 0.015);
      p.text(this._currentLine, this._pos.x * p.width, this._pos.y * p.height);
      p.pop();
    }
  }

  withinDist(p, x, y) {
    const distX = Math.abs(x - this._pos.x) * p.width;
    const distY = Math.abs(y - this._pos.y);
    const textWidth = p.textWidth(this._currentLine);
    if (distX < textWidth * 0.5 && distY < 0.02) {
      return true;
    } else {
      return false;
    }
  }

  onClick(p, x, y, callback) {
    if (this.withinDist(p, x, y)) {
      typeof callback === "function" && callback();
    }
  }
  onHover(p, x, y, on, off) {
    if (this.withinDist(p, x, y)) {
      this._brightness = 255;
      typeof on === "function" && on();
    } else {
      this._brightness = 180;
      typeof off === "function" && off();
    }
  }
}

export default Story;
