class Round {
  initialCount = Math.ceil(Math.random() * 10 + 15);
  timeCount = 30;
  totalScore = 0;
  objectArray = [];
  interval = null;
  isTouch = false;
  constructor(
    cozyMP3,
    boomSFX,
    popSFX,
    noSFX,
    timeUpSFX,
    backModal,
    desk,
    time,
    score,
    scoreNum
  ) {
    let chartCount = Math.round(Math.random() *2);
    for (let i = 0; i < chartCount; i++) {
      this.objectArray.push(new Chart());
    }
    this.initialCount -= chartCount;

    for (let i = 0; i < this.initialCount; i++) {
      let randomNum = Math.random();
      if (randomNum < 0.2) {
        this.objectArray.push(new Pen());
      } else if (randomNum >= 0.2 && randomNum < 0.4) {
        this.objectArray.push(new Folder());
      } else if (randomNum >= 0.4 && randomNum < 0.6) {
        this.objectArray.push(new Wallet());
      } else if (randomNum >= 0.6 && randomNum < 0.8) {
        this.objectArray.push(new Candy());
      } else {
        this.objectArray.push(new Wastepaper());
      }
    }

    for (let i = 0; i < this.objectArray.length; i++) {
      let object = document.createElement("img");
      object.classList.add('item');
      object.src = "image/" + this.objectArray[i].image + ".png";
      let id;
      switch (this.objectArray[i].placeShouldPut) {
        case "pencils-zone":
          id = "p-" + i;
          break;
        case "holder-zone":
          id = "f-" + i;
          break;
        case "backpack-zone":
          id = "wal-" + i;
          break;
        case "basket-zone":
          id = "ca-" + i;
          break;
        case "trash-zone":
          id = "was-" + i;
          break;
        default:
          id = "ch-" + i;
          break;
      }
      object.id = id;
      object.dataset.id = id;
      object.dataset.place = this.objectArray[i].placeShouldPut
        ? this.objectArray[i].placeShouldPut
        : "";
      object.dataset.desk = this.objectArray[i].shouldKeepOnDesk;
      object.dataset.sound = this.objectArray[i].putCorrectPlaceSound
        ? this.objectArray[i].putCorrectPlaceSound
        : this.objectArray[i].putWrongPlaceSound;
      object.draggable = true;
      object.style.position = "absolute";
      let horizontalPosition = Math.round(Math.random() * 70);
      let verticalPosition = Math.round(Math.random() * 60+15);
      object.style.left =
        horizontalPosition >= 80
          ? `calc(${horizontalPosition}% - 50px)`
          : horizontalPosition + "%";
      object.style.top =
        verticalPosition >= 80
          ? `calc(${verticalPosition}% - ${this.objectArray[i].height})`
          : verticalPosition + "%";
      object.style.width = this.objectArray[i].width;
      object.style.height = this.objectArray[i].height;
      object.ondragstart = function (e) {
        e.dataTransfer.setData("text/plain", JSON.stringify(object.dataset));
      };
      object.ontouchstart = (e) => {
        if (e.cancelable) e.preventDefault();
        object.dataset.originX = object.style.left;
        object.dataset.originY = object.style.top;

        this.isTouch = true;
      };

      object.ontouchmove = (e) => {
        if (e.cancelable) e.preventDefault();

        let w = object.getBoundingClientRect().width;
        let h = object.getBoundingClientRect().height;

        if (this.isTouch) {
          object.style.left = e.changedTouches[0].pageX - w / 2 + "px";
          object.style.top = e.changedTouches[0].pageY - h / 2 + "px";
        }
      };

      object.ontouchend = (e) => {
        if (e.cancelable) e.preventDefault();

        let objectX = object.getBoundingClientRect().x;
        let objectY = object.getBoundingClientRect().y;
        let target = !this.objectArray[i].placeShouldPut
          ? null
          : document.getElementById(this.objectArray[i].placeShouldPut);
        let targetX = target ? target.getBoundingClientRect().x : null;
        let targetY = target ? target.getBoundingClientRect().y : null;

        if (!target) {
          object.style.left = object.dataset.originX;
          object.style.top = object.dataset.originY;
          cozyMP3.pause();
          clearInterval(this.interval);
          time.innerText = 0;
          boomSFX.pause();
          boomSFX.currentTime = 0;
          boomSFX.play();
          scoreNum.innerText = this.totalScore;
          backModal.showModal();
        } else if (
          target &&
          Math.abs(targetX - objectX) <= 50 &&
          Math.abs(targetY - objectY) <= 50
        ) {
          object.style.display = "none";
          object.remove();
          popSFX.pause();
          popSFX.currentTime = 0;
          popSFX.play();
          this.totalScore++;
          score.innerText = this.totalScore;
        } else {
          object.style.left = object.dataset.originX;
          object.style.top = object.dataset.originY;
          object.style.animation = "none";
          object.style.animation = "no 1 linear  0.7s";
          noSFX.pause();
          noSFX.currentTime = 0;
          noSFX.play();
          setTimeout(() => {
            object.style.animation = "none";
          }, 700);
        }
        this.isTouch = false;
      };
      desk.appendChild(object);
    }

    this.interval = setInterval(() => {
      this.timeCount--;
      let nodeCount = document.querySelectorAll('.item').length
      if (this.timeCount == 0) {
        time.innerText = 0;
        clearInterval(this.interval);
        cozyMP3.pause();
        timeUpSFX.pause();
        timeUpSFX.currentTime = 0;
        timeUpSFX.play();
        scoreNum.innerText = this.totalScore;
        backModal.showModal();
      } else if (!nodeCount) {
        time.innerText = 0;
        clearInterval(this.interval);
        cozyMP3.pause();
        timeUpSFX.pause();
        timeUpSFX.currentTime = 0;
        timeUpSFX.play();
        scoreNum.innerText = this.totalScore;
        backModal.showModal();
      } else {
        time.innerText = this.timeCount;
      }
    }, 1000);
  }
  getInterval() {
    return { interval: this.interval };
  }
  getTotalScore() {
    return {totalScore:this.totalScore}
  }
  setTotalScore(num){
    this.totalScore = num
  }
}
