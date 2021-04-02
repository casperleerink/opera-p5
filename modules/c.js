import Storm from "./storm.js";
import D from "./d.js";

export default function C(p) {
  this.story;
  this.sound;
  this.storm;
  this.currentCue = 0;
  this.lightning = false;
  this.lightningStrength = 150;
  this.cloudLost = true;

  this.textFollow;

  this.setup = () => {
    this.story = this.sceneManager.story;
    this.story.index = 0;
    this.story.pos = { x: 0.5, y: 0.5 };
    this.startTime = p.millis();
    this.clickedTime = p.millis() - 10000;

    //sound setup
    this.sound = p.loadSound("assets/audio/storm.mp3", () => {
      this.sound.play();
      this.sound.onended(() => {
        this.sound.disconnect();
        this.soundEnded = p.millis();
      });
    });

    //video setup
    this.storm = new Storm(
      p,
      document.getElementById("stream-container"),
      "423811183"
    );
    this.storm.play();

    //start coral moving again
    this.sceneManager.coral.tips.forEach((t) => {
      t.baseVel = 0.001;
    });
    this.textFollow = p.random(this.sceneManager.coral.tips).pos;
    this.sceneManager.cnv.mousePressed(() => {
      this.clickFunction(p.mouseX / p.width, p.mouseY / p.height);
    });

    //DEBUG ONLY
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.addEventListener("click", () => {
      nextBtn.removeEventListener("click", this);
      this.sound.disconnect();
      this.storm.pause();
      this.storm.destroy();
      this.sceneManager.showScene(D);
    });
  };
  //MOUSEPRESS FUNCTION
  this.clickFunction = (x, y) => {
    this.story.onClick(p, x, y, () => {
      this.clickedTime = p.millis();
      this.story.index++;
      if (this.story.index >= this.story.c.length) {
        this.storyEnded = true;
        document.body.style.cursor = "auto";
      } else {
        this.storyEnded = false;
        this.textFollow = p.random(this.sceneManager.coral.tips).pos;
      }
      this.lightning = { x, y };
      setTimeout(() => {
        this.lightning = undefined;
      }, 2000);
    });
  };

  //DRAW
  this.draw = () => {
    const currentTime = p.millis();
    const songProgress = this.sound.isLoaded()
      ? this.sound.currentTime() / this.sound.duration()
      : 0;

    //clear and draw background
    p.clear();
    if (this.soundEnded) {
      const timeSinceEnd = currentTime - this.soundEnded;
      if (timeSinceEnd < 2000) {
        this.fadeProgress = timeSinceEnd / 2000;
        p.background(0, this.fadeProgress * 255);
      } else {
        if (!this.fadedOut) {
          this.sound.disconnect();
          this.storm.pause();
          this.storm.destroy();
        }
        this.fadedOut = true;
        p.background(0);
        if (timeSinceEnd < 8000) {
          //Show Inside Pantheon text
        } else {
          this.sceneManager.showScene(D);
        }
      }
    } else {
      if (this.storyEnded) {
        p.background(0, 0);
      } else {
        this.lightning
          ? p.background(0, 255 - this.lightningStrength)
          : p.background(0, 255 - p.random(songProgress * 30));
      }
    }

    //Move Coral down a bit at the beginning
    if (currentTime - this.startTime < 20000) {
      this.sceneManager.coral.tips.forEach((t) => {
        const vel = 0.001 * (0.8 - t.pos.y) * Math.random();
        t.pos = {
          x: t.pos.x,
          y: t.pos.y + vel,
        };
      });
    }
    //draw Coral!
    this.sceneManager.coral.drawC(
      p,
      this.lightning,
      currentTime - this.clickedTime,
      this.soundEnded ? (1 - this.fadeProgress) * 3.5 : songProgress * 3 + 0.5
    );

    //Draw Text!
    if (!this.soundEnded) {
      if (!this.storyEnded) {
        this.story.follow(p, this.textFollow, 0.02);
        this.story.drawC(p);
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
        this.story.follow(p, this.textFollow, 0.15);
        this.story.drawCloudLostFound(p, this.cloudLost);
        if (currentTime % Math.round(Math.random() * 400) === 0) {
          this.cloudLost = !this.cloudLost;
          this.textFollow = p.random(this.sceneManager.coral.tips).pos;
        }
      }
    } else {
      this.story.insidePantheon(p, this.fadeProgress);
    }
  };
}
