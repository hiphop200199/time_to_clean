class General {
  cozyMP3;
  dingSFX;
  popSFX;
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
  restartButton;
  interval;
  round;
  init() {
    this.cozyMP3 = new Audio("music/cozy.mp3");
    this.dingSFX = new Audio("sfx/ding.mp3");
    this.popSFX = new Audio("sfx/pop.mp3");
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
    this.restartButton = document.getElementById("restart");
    this.interval = null;
    this.round = null;
   
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
        this.round = null;
        this.round = new Round(
          this.cozyMP3,
          this.popSFX,
          this.noSFX,
          this.timeUpSFX,
          this.backModal,
          this.desk,
        );
        this.backModal.close();
        this.interval = null;
        this.interval = this.round.getInterval();
        this.cozyMP3.pause();
        this.cozyMP3.currentTime = 0;
        this.cozyMP3.play();
      }, 2000);
    });

    this.restartButton.addEventListener("click", () => {
      this.entryButton.click();
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
   if (data.place == place) {
      let object = document.getElementById(data.id);
      object.style.display = "none";
      object.remove();
      this.popSFX.pause();
      this.popSFX.currentTime = 0;
      this.popSFX.play();
    } else {
      let object = document.getElementById(data.id);
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
