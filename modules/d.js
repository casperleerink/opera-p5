import { setGradientCashe, clip } from "./util.js";
// import Pantheon from "./pantheon.js";
import E from "./e.js";
export default function D(p) {
  this.startTime;
  this.sound;
  this.soundEnded;
  this.gradientLeft;
  this.gradientRight;
  this.gradientPos = [-0.2, 1.2];
  this.coral;
  this.yPos = [];

  this.setup = () => {
    //TIME
    this.startTime = p.millis();
    //GRADIENT (PANTHEON)
    this.gradientLeft = p.createGraphics(p.width * 0.4, p.height);
    this.gradientRight = p.createGraphics(p.width * 0.4, p.height);
    setGradientCashe(
      p,
      "VERTICAL",
      p.width * 0.4,
      p.height,
      p.color(170),
      p.color(0),
      this.gradientLeft
    );
    setGradientCashe(
      p,
      "VERTICAL",
      p.width * 0.4,
      p.height,
      p.color(0),
      p.color(170),
      this.gradientRight
    );

    //CORAL
    this.coral = this.sceneManager.coral;
    this.coral.tips.forEach((t) => {
      this.yPos.push(p.random(0.7, 0.97));
      t.baseVel *= 0.7;
      // t.pos = {
      //     x: clip(t.pos.x, 0.2, 0.8),
      //     y: clip(t.pos.y, 0.2, 0.8),
      // }
      // t.boundaries = [0.2, 0.8];
    });

    //SOUND
    this.sound = new Howl({
      src: ["assets/audio/part4.mp3"],
      html5: true,
      autoplay: false,
      loop: false,
      onend: () => {
        this.soundEnded = p.millis();
        this.yPos.length = 0;
        this.coral.tips.forEach((t) => {
          this.yPos.push(p.random(0.2, 0.7));
        });
      },
    });
    setTimeout(() => {
      this.sound.play();
    }, 10000);
    // this.sound = p.loadSound("assets/audio/part4.mp3", () => {
    //   setTimeout(() => {
    //     this.sound.play();
    //   }, 10000);
    //   this.sound.onended(() => {
    //     this.soundEnded = p.millis();
    //     this.yPos.length = 0;
    //     this.coral.tips.forEach((t) => {
    //       this.yPos.push(p.random(0.2, 0.7));
    //     });
    //   });
    // });

    this.story = this.sceneManager.story;

    //Pantheon yellow rectangles
    // this.pantheon = new Pantheon(3, p.color(255, 247, 164));

    const nextBtn = document.getElementById("nextBtn");
    const me = this;
    nextBtn.addEventListener("click", function () {
      me.sound.stop();
      me.sound.unload();
      me.sceneManager.showScene(E);
      nextBtn.removeEventListener("click", this);
    });
  };

  //DRAW
  this.draw = () => {
    //clear and draw background
    p.clear();
    p.background(0);
    const currentTime = p.millis();

    //gradient background (pantheon)
    const deltaStartTime = currentTime - this.startTime;
    if (deltaStartTime < 60000) {
      this.gradientPos[0] = p.map(deltaStartTime, 0, 60000, -0.2, 0.2);
      this.gradientPos[1] = p.map(deltaStartTime, 0, 60000, 1.2, 0.8);
      p.strokeWeight(p.map(deltaStartTime, 0, 60000, 1.0, 0.5));
    }
    if (this.soundEnded) {
      const delta = currentTime - this.soundEnded;
      if (delta < 5000) {
        this.gradientPos[0] = p.map(delta, 0, 4000, 0.2, -0.2);
        this.gradientPos[1] = p.map(delta, 0, 4000, 0.8, 1.2);
      } else {
        this.sound.unload();
        this.sceneManager.showScene(E);
      }
    }
    p.image(
      this.gradientLeft,
      this.gradientPos[0] * p.width,
      p.height * 0.5,
      p.width * 0.4,
      p.height
    );
    p.image(
      this.gradientRight,
      this.gradientPos[1] * p.width,
      p.height * 0.5,
      p.width * 0.4,
      p.height
    );

    // //draw yellow rectangles
    // if (deltaStartTime > 10000 && deltaStartTime < 80000) {
    //   //p5 and progress
    //   // this.pantheon.draw(p, deltaStartTime / 80000);
    // }

    //coral to yPos
    this.coral.drawD(p, this.yPos, deltaStartTime);

    //begin text
    if (deltaStartTime <= 25000) {
      this.story.drawDbegin(p, deltaStartTime);
    }
  };
}
