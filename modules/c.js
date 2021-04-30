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
    const timeSinceStart = currentTime - this.startTime;
    const songProgress = this.sound.isLoaded()
      ? this.sound.currentTime() / this.sound.duration()
      : null;

    //clear and draw background
    p.clear();
    if (!songProgress) {
      p.background(0);
    }
    if (songProgress && songProgress < 0.85) {
      //beginning of song
      if (this.storyEnded) {
        //user has clicked through the whole story
        p.background(0, 0);
      } else {
        this.lightning
          ? p.background(0, 255 - this.lightningStrength)
          : p.background(0, 255 - p.random(songProgress * 30));
      }
    } else if (songProgress && songProgress >= 0.85) {
      //ending of song, soft violin, inside pantheon text with fade
      this.fadeProgress = (songProgress - 0.85) / 0.15;
      p.background(0, this.fadeProgress * 255);
    }

    //Move Coral tips down a bit at the beginning
    if (currentTime - this.startTime < 20000) {
      this.sceneManager.coral.tips.forEach((t) => {
        const vel = 0.0015 * (0.8 - t.pos.y) * Math.random();
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
      songProgress >= 0.85 ? (1 - this.fadeProgress) * 4.5 : songProgress * 4
    );

    if (timeSinceStart > 15000 && songProgress < 0.85) {
      if (!this.storyEnded) {
        //allow user interactivity by clikcing through the main text of c.
        this.story.follow(p, this.textFollow, 0.07);
        if (timeSinceStart < 25000) {
          this.story.helperText(
            p,
            "(click on the text to advance the storm)",
            { x: 0.5, y: 0.5 },
            timeSinceStart - 15000
          );
        }
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
        //alternate between random texts when user clicked through text
        this.story.follow(p, this.textFollow, 0.15);
        this.story.drawCloudLostFound(p, this.cloudLost);
        if (currentTime % Math.round(Math.random() * 400) === 0) {
          this.cloudLost = !this.cloudLost;
          this.textFollow = p.random(this.sceneManager.coral.tips).pos;
        }
      }
    } else if (songProgress >= 0.85) {
      //later part of the song show pantheon
      //calc fade in and out of text realtive to time.
      let opacity = 1;
      if (this.fadeProgress < 0.2) {
        opacity = this.fadeProgress * 5;
      }
      if (this.fadeProgress > 0.8) {
        opacity = 1 - (this.fadeProgress - 0.8) * 5;
      }
      //draw text
      this.story.insidePantheon(p, opacity);
    }
    if (this.soundEnded) {
      //cleanup and to next scene at pantheon...
      this.sound.disconnect();
      this.storm.pause();
      this.storm.destroy();
      this.sceneManager.showScene(D);
    }
  };
}
