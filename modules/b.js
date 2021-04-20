import Cloud from "./cloud.js";
import C from "./c.js";

function B(p) {
  this.coral;
  this.gradient;
  this.cloud;
  this.startTime;
  this.clickTime;
  this.deltaClickTime = 0;
  this.clickEnabled = true;
  this.locations = [];
  this.soundEnded;
  this.glow = true;
  //SETUP
  this.setup = () => {
    this.coral = this.sceneManager.coral;
    this.gradient = this.sceneArgs.gradient;
    this.cloud = new Cloud(p, this.sceneManager.cloud, 0.2);

    this.startTime = p.millis();
    this.clickTime = p.millis();
    //sound
    this.sound = p.loadSound("assets/audio/part-b-collapsed.mp3", () => {
      this.startTime = p.millis();
      this.sound.play();
    });
    this.sound.onended(() => {
      this.soundEnded = p.millis();
      this.sound.disconnect();
    });

    this.sceneManager.cnv.mousePressed(() => {
      this.glow = false;
      this.clickFunction(p.mouseX / p.width, p.mouseY / p.height);
    });

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.addEventListener("click", () => {
      nextBtn.removeEventListener("click", this);
      this.sound.disconnect();
      this.sceneManager.showScene(C);
    });
  };

  this.clickFunction = (x, y) => {
    if (this.clickEnabled) {
      this.cloud.onClick(x * p.width, y * p.height, () => {
        this.locations.push({
          x: x,
          y: y,
        });
        this.clickTime = p.millis();
      });
    }
  };

  //DRAW
  this.draw = () => {
    const currentTime = p.millis();
    const timeSinceStart = currentTime - this.startTime;

    //When can user click on image;
    if (this.clickTime) {
      this.deltaClickTime = currentTime - this.clickTime;
      if (
        this.locations.length < this.coral.tips.length &&
        this.deltaClickTime > 1000
      ) {
        this.clickEnabled = true;
        if (this.deltaClickTime > 10000) {
          this.clickFunction(Math.random(), Math.random());
        }
      } else {
        this.clickEnabled = false;
      }
    }
    //clear and draw background
    p.clear();
    p.background(0);

    //gradient image (move up when sound ends)
    if (this.soundEnded) {
      const delta = currentTime - this.soundEnded;
      if (delta < 5000) {
        const h = p.map(delta, 0, 5000, 0.2, -0.2, true);
        p.image(
          this.gradient,
          p.width * 0.5,
          p.height * h,
          p.width,
          p.height * 0.4
        );
      } else {
        //when gradient completed moving up start scene C
        this.sceneManager.showScene(C);
      }
    } else {
      p.image(
        this.gradient,
        p.width * 0.5,
        p.height * 0.2,
        p.width,
        p.height * 0.4
      );
    }

    let coloring = false;
    if (this.locations.length >= this.coral.tips.length || this.soundEnded) {
      coloring = true;
    }
    this.coral.drawB(p, coloring);

    //image related stuff
    this.cloud.draw(p, timeSinceStart, this.deltaClickTime, this.glow);
    if (this.clickEnabled) {
      this.cloud.onHover(
        p.mouseX,
        p.mouseY,
        () => {
          document.body.style.cursor = "pointer";
        },
        () => {
          document.body.style.cursor = "auto";
        }
      );
    } else {
      if (coloring) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "auto";
      }
    }

    this.locations.forEach((pos, i) => {
      this.coral.tips[i].follow(p, pos, 0.025);
    });
  };
}

export default B;
