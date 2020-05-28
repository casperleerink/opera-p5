function bounceEdges(g, onBounce, left, right) {
    //all sprites bounce at the screen side edges (only x needed)
    for(let i=0; i<g.length; i++) {
        const s = g.get(i);
        if(s.position.x<left) {
            s.position.x = left + 1;
            s.velocity.x = abs(s.velocity.x);
            onBounce(s);
        }
        if(s.position.x>right) {
            s.position.x = right-1;
            s.velocity.x = -abs(s.velocity.x);
            onBounce(s);
        }
    }
}

function ramp(start, end, duration, interval, onInstance, onComplete) {
    let curr = start;
    const distance = end - start;
    const setInt = setInterval(() => {
        if (start < end) { //when ascending
            if (curr >= end) {
                typeof onComplete === 'function' && onComplete(curr);
                clearInterval(setInt);
            } else {
                curr += distance / (duration/interval);
                curr = curr > end ? end : curr;
                typeof onInstance === 'function' && onInstance(curr);
                // onInstance(curr);
            }
        } else { //when descending
            if (curr <= end) {
                typeof onComplete === 'function' && onComplete(curr);
                clearInterval(setInt);
            } else {
                curr += distance / (duration/interval);
                curr = curr < end ? end : curr;
                typeof onInstance === 'function' && onInstance(curr);
            }
        }

    }, interval);

}

function drawGradient(x, y, c1, c2, radius) {
    // for (let r = radius; r > 0; --r) {
    //   fill(h, 90, 90);
    //   ellipse(x, y, r, r);
    //   h = (h + 1) % 360;
    // }
    push();
    noFill();
    for (let i = radius; i > 0; i--) {
        stroke(lerpColor(c1, c2, 1 - i/radius));
        ellipse(x, y, i, i);
    }
    pop();
  }