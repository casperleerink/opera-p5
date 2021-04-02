class Pantheon {
  constructor(startAmount, color) {
    this._amount = startAmount;
    this._color = color;
  }
  get amount() {
    return this._amount;
  }
  set amount(a) {
    this._amount = a;
  }

  drawRect(p, x, y, size, opacity) {
    p.push();
    p.noStroke();
    this._color.setAlpha(opacity * 255);
    p.fill(this._color);
    p.rect(x * p.width, y * p.height, size * p.width, size * p.width);
    p.pop();
  }

  //general function to draw all rectangles
  //p = p5
  //progress = timing, 0 is start, 1 is end
  draw(p, progress) {
    for (let i = 0; i < this._amount; i++) {
      this.drawRect(
        p,
        (i / this._amount) * 0.3 + 0.05,
        i / this._amount + 0.05,
        0.04 + Math.random() * 0.01,
        (p.sin(progress * 20 + i * 2 + 1) + 1.0) * 0.2 * (1 - progress)
      );
    }
    for (let i = 0; i < this._amount; i++) {
      this.drawRect(
        p,
        (i / this._amount) * 0.3 + 0.75,
        i / this._amount + 0.1,
        0.04 + Math.random() * 0.01,
        (p.sin(progress * 20 + i * 2 - 1) + 1.0) * 0.2 * (1 - progress)
      );
    }
  }
}

export default Pantheon;
