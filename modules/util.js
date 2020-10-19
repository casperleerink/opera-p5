


export const drawGradient = (p, x, y, c1, c2, radius) => {
    p.push();
    p.noFill();
    for (let i = radius; i > 0; i--) {
        p.stroke(p.lerpColor(c1, c2, 1 - i/radius));
        p.ellipse(x, y, i, i);
    }
    p.pop();
  }

export const setGradient = (p, x, y, w, h, c1, c2, axis) => {
    p.push();
    p.noFill();
  
    if (axis === 1) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = p.map(i, y, y + h, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(x, i, x + w, i);
        }
    } else if (axis === 2) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = p.map(i, x, x + w, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(i, y, i, y + h);
        }
    }
    p.pop();
}

export const setGradientCashe = (p, axis, w, h, c1, c2, pg) => {
    const x = 0;
    const y = 0;
    pg.noFill();
    if (axis === "HORIZONTAL") {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = p.map(i, y, y + h, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            pg.stroke(c);
            pg.line(x, i, x + w, i);
        }
    } else if (axis === "VERTICAL") {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = p.map(i, x, x + w, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            pg.stroke(c);
            pg.line(i, y, i, y + h);
        }
    }
}


export const clip = (num, min, max) => {
    return Math.max(min, Math.min(num, max));
}