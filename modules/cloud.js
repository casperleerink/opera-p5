export default class Cloud {
  constructor(p, img, scale) {
    this._img = img;
    this._scale = scale;
    this._imgHeight =
      (this._scale * this._img.height * p.width) / this._img.width;
    this._x = 0.2;
    this._y = 20 + this._imgHeight / 2;
    this._w = this._scale * p.width;
    this._extraBright = 0;
  }

  draw(p, timeSinceStart, timeSinceClick, glow) {
    this._imgHeight =
      (this._scale * this._img.height * p.width) / this._img.width;
    this._x = 0.2 * p.width;
    this._y = 20 + this._imgHeight / 2;
    this._w = this._scale * p.width;
    const sinTime = p.sin(timeSinceStart * 0.001 - p.HALF_PI) + 1;
    p.push();
    p.tint(255, sinTime * 60 + this._extraBright);
    p.image(this._img, this._x, this._y, this._w, this._imgHeight);
    if (timeSinceClick > 1000 && glow) {
      p.stroke(224, 249, 255, ((timeSinceClick - 1000) / 10000) * 200);
      p.strokeWeight(2);
      p.noFill();
      p.rect(this._x, this._y, this._w + 2, this._imgHeight + 2, 5);
    }
    p.pop();
  }

  withinBounds(x, y) {
    const distX = Math.abs(x - this._x);
    const distY = Math.abs(y - this._y);
    if (distX < this._w * 0.5 && distY < this._imgHeight * 0.5) {
      return true;
    } else {
      return false;
    }
  }
  onClick(x, y, callback) {
    if (this.withinBounds(x, y)) {
      typeof callback === "function" && callback();
    }
  }
  onHover(x, y, on, off) {
    if (this.withinBounds(x, y)) {
      this._extraBright = 50;
      typeof on === "function" && on();
    } else {
      this._extraBright = 0;
      typeof off === "function" && off();
    }
  }
}
