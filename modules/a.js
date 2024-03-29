import { setGradientCashe } from "./util.js";
import B from "./b.js";
function A(p) {
  this.coral;
  this.story;
  this.soundBegin;
  this.soundDrone;
  this.soundClimax;
  this.gradient;
  this.climaxReached;
  this.lastClicked = 0;

  //SETUP
  this.setup = () => {
    this.startTime = p.millis();
    //coral
    this.coral = this.sceneManager.coral;

    //story
    this.story = this.sceneManager.story;

    this.sceneManager.cnv.mousePressed(() => {
      if (!this.climaxReached) {
        this.story.onClick(p, p.mouseX / p.width, p.mouseY / p.height, () => {
          if (this.story.index < this.story.a.length - 2) {
            this.story.index++;
          } else {
            this.story.index++;
            this.soundDrone.fade(1.0, 0.0, 2000);
            this.soundClimax.play();
            this.climaxReached = p.millis();
          }
        });
      }

      //extra brightness
      this.lastClicked = p.millis();
    });

    //sound
    // this.soundDrone = p.loadSound("assets/audio/part-a-drone.mp3", () => {
    //   this.soundDrone.loop();
    // });
    this.soundDrone = new Howl({
      src: ["assets/audio/part-a-drone.mp3"],
      html5: true,
      autoplay: true,
      loop: true,
    });
    // this.soundClimax = p.loadSound("assets/audio/marvel-at-her-majesty.mp3");
    this.soundClimax = new Howl({
      src: ["assets/audio/marvel-at-her-majesty.mp3"],
      html5: true,
      autoplay: false,
      loop: false,
      onend: () => {
        document.body.style.cursor = "auto";
        this.soundClimax.unload();
        this.soundDrone.unload();
        this.sceneManager.showScene(B, { gradient: this.gradient });
      },
    });
    // this.soundClimax.onended(() => {
    //   //go to next scene, disconnect old sounds to clean up memory.
    //   this.soundClimax.disconnect();
    //   this.soundDrone.disconnect();
    //   document.body.style.cursor = "auto";
    //   this.sceneManager.showScene(B, { gradient: this.gradient });
    // });
    this.gradient = p.createGraphics(p.width, p.height * 0.4);
    setGradientCashe(
      p,
      "HORIZONTAL",
      p.width,
      p.height * 0.4,
      p.color(170),
      p.color(0),
      this.gradient
    );

    const nextBtn = document.getElementById("nextBtn");
    const me = this;
    nextBtn.addEventListener("click", function () {
      document.body.style.cursor = "auto";
      me.soundClimax.unload();
      me.soundDrone.unload();
      me.sceneManager.showScene(B, { gradient: me.gradient });
      nextBtn.removeEventListener("click", this);
    });
  };

  //DRAW
  this.draw = () => {
    //clear and draw background
    p.clear();
    p.background(0);
    const currentTime = p.millis();
    const timeSinceStart = currentTime - this.startTime;

    //gradient image
    p.image(
      this.gradient,
      p.width * 0.5,
      p.height * 0.2,
      p.width,
      p.height * 0.4
    );
    const timeDiffClicked = currentTime - this.lastClicked;
    if (timeDiffClicked < 2000) {
      this.coral.extraBright = (1 - timeDiffClicked / 2000) * 50;
    }
    this.coral.drawA(p);
    if (timeSinceStart > 5000) {
      this.story.follow(p, this.coral.tips[this.story.index].pos, 0.01);
      if (timeSinceStart > 9000 && timeSinceStart < 19000) {
        this.story.helperText(
          p,
          "(click on the moving text to advance the story)",
          { x: 0.5, y: 0.5 },
          timeSinceStart - 9000
        );
      }
    }
    if (!this.climaxReached) {
      this.story.onHover(
        p,
        p.mouseX / p.width,
        p.mouseY / p.height,
        () => {
          document.body.style.cursor = "pointer";
        },
        () => {
          document.body.style.cursor = "auto";
        }
      );
    } else {
      document.body.style.cursor = "none";
      const timeSinceClimax = currentTime - this.climaxReached;
      if (timeSinceClimax < 10000) {
        this.story.brightness = (1 - timeSinceClimax / 10000) * 255;
      }
    }
    this.story.drawA(p);
  };
}

export default A;
