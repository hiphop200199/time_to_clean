class General {
  cozyMP3;
  dingSFX;
  popSFX;
  boomSFX;
  noSFX;
  timeUpSFX;
  entry;
  game;
  backModal;
  desk;
  trashZone;
  holderZone;
  pencilsZone;
  basketZone;
  backpackZone;
  entryButton;
  backButton;
  time;
  score;
  totalScore;
  scoreNum;
  interval;
  round;
  init() {
    this.cozyMP3 = new Audio("music/cozy.mp3");
    this.dingSFX = new Audio("sfx/ding.mp3");
    this.popSFX = new Audio("sfx/pop.mp3");
    this.boomSFX = new Audio("sfx/boom.mp3");
    this.noSFX = new Audio("sfx/no.mp3");
    this.timeUpSFX = new Audio("sfx/time-up.mp3");
    this.entry = document.getElementById("entry");
    this.game = document.getElementById("game");
    this.backModal = document.getElementById("back-modal");
    this.desk = document.getElementById("desk");
    this.trashZone = document.getElementById("trash-zone");
    this.holderZone = document.getElementById("holder-zone");
    this.pencilsZone = document.getElementById("pencils-zone");
    this.basketZone = document.getElementById("basket-zone");
    this.backpackZone = document.getElementById("backpack-zone");
    this.entryButton = document.getElementById("start");
    this.backButton = document.getElementById("back-entry");
    this.time = document.getElementById("time");
    this.score = document.getElementById("score");
    this.scoreNum = document.getElementById("score-num");
    this.interval = null;
    this.round = null;
    this.totalScore = 0;

    this.trashZone.addEventListener("dragover", (e) => e.preventDefault());
    this.holderZone.addEventListener("dragover", (e) => e.preventDefault());
    this.pencilsZone.addEventListener("dragover", (e) => e.preventDefault());
    this.basketZone.addEventListener("dragover", (e) => e.preventDefault());
    this.backpackZone.addEventListener("dragover", (e) => e.preventDefault());

    this.trashZone.addEventListener("drop", (e) =>
      this.handleDrop(e, "trash-zone")
    );
    this.holderZone.addEventListener("drop", (e) =>
      this.handleDrop(e, "holder-zone")
    );
    this.pencilsZone.addEventListener("drop", (e) =>
      this.handleDrop(e, "pencils-zone")
    );
    this.basketZone.addEventListener("drop", (e) =>
      this.handleDrop(e, "basket-zone")
    );
    this.backpackZone.addEventListener("drop", (e) =>
      this.handleDrop(e, "backpack-zone")
    );

    this.entryButton.addEventListener("click", () => {
      this.dingSFX.pause();
      this.dingSFX.currentTime = 0;
      this.dingSFX.play();
      setTimeout(() => {
        this.entry.style.display = "none";
        this.totalScore = 0;
        this.score.innerText = 0;
        this.time.innerText = "";
        this.round = null;
        this.round = new Round(
          this.cozyMP3,
          this.boomSFX,
          this.popSFX,
          this.noSFX,
          this.timeUpSFX,
          this.backModal,
          this.desk,
          this.time,
          this.score,
          this.scoreNum
        );
        this.interval = null;
        this.interval = this.round.getInterval();
        this.totalScore = this.round.getTotalScore();
        this.cozyMP3.pause();
        this.cozyMP3.currentTime = 0;
        this.cozyMP3.play();
      }, 2000);
    });

    this.backButton.addEventListener("click", () => {
      this.entry.style.display = "flex";
      this.cozyMP3.pause();
      this.cozyMP3.currentTime = 0;
      this.popSFX.pause();
      this.popSFX.currentTime = 0;
      this.popSFX.play();
      this.backModal.close();
    });
  }
  handleDrop(e, place) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.desk == "true") {
      this.cozyMP3.pause();
      clearInterval(this.interval.interval);
      this.time.innerText = 0;
      this.boomSFX.pause();
      this.boomSFX.currentTime = 0;
      this.boomSFX.play();
      this.scoreNum.innerText = this.totalScore.totalScore;
      this.backModal.showModal();
    } else if (data.desk == "false" && data.place == place) {
      let object = document.getElementById(data.id);
      object.style.display = "none";
      e.target.appendChild(object);
      this.popSFX.pause();
      this.popSFX.currentTime = 0;
      this.popSFX.play();
      this.totalScore.totalScore++;
      this.round.setTotalScore(this.totalScore.totalScore);
      this.score.innerText = this.totalScore.totalScore;
      this.scoreNum.innerText = this.totalScore.totalScore;
    } else {
      let object = document.getElementById(data.id);
      console.log(object);

      object.style.animation = "no 1 linear  0.7s";
      this.noSFX.pause();
      this.noSFX.currentTime = 0;
      this.noSFX.play();
      setTimeout(() => {
        object.style.animation = "none";
      }, 700);
    }
  }
}
