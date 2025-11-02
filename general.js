class General {
  init() {
    let cozyMP3 = new Audio('music/cozy.mp3');
    let dingSFX = new Audio("sfx/ding.mp3");
    let popSFX = new Audio("sfx/pop.mp3");
    let boomSFX = new Audio("sfx/boom.mp3");
    let noSFX = new Audio("sfx/no.mp3");
    let timeUpSFX = new Audio("sfx/time-up.mp3");
    let entry = document.getElementById("entry");
    let game = document.getElementById("game");
    let backModal = document.getElementById('back-modal')
    let desk = document.getElementById("desk");
    let trashZone = document.getElementById("trash-zone");
    let holderZone = document.getElementById("holder-zone");
    let pencilsZone = document.getElementById("pencils-zone");
    let basketZone = document.getElementById("basket-zone");
    let backpackZone = document.getElementById("backpack-zone");
    let entryButton = document.getElementById("start");
    let backButton = document.getElementById('back-entry');
    let time = document.getElementById('time')
    let interval;
    let round;

    trashZone.addEventListener("dragover", (e) => e.preventDefault());
    holderZone.addEventListener("dragover", (e) => e.preventDefault());
    pencilsZone.addEventListener("dragover", (e) => e.preventDefault());
    basketZone.addEventListener("dragover", (e) => e.preventDefault());
    backpackZone.addEventListener("dragover", (e) => e.preventDefault());

    trashZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.desk == "true") {
     cozyMP3.pause()
        boomSFX.pause();
        boomSFX.currentTime = 0;
        boomSFX.play();
        backModal.showModal()
        clearInterval(interval.interval)
        time.innerText = 0
      } else if (data.desk == "false" && data.place == "trash-zone") {
        let object = document.getElementById(data.id);
        object.style.display = "none";
        e.target.appendChild(object);
        popSFX.pause();
        popSFX.currentTime = 0;
        popSFX.play();
      } else {
      let object = document.getElementById(data.id);
        object.style.animation = 'no 1 linear  0.7s';
        noSFX.pause();
        noSFX.currentTime = 0;
        noSFX.play();
        setTimeout(() => {
          object.style.animation = 'none';
        }, 700);
      }
    });

    holderZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.desk == "true") {
      cozyMP3.pause()
        boomSFX.pause();
        boomSFX.currentTime = 0;
        boomSFX.play();
        backModal.showModal()
        clearInterval(interval.interval)
        time.innerText = 0
      } else if (data.desk == "false" && data.place == "holder-zone") {
        let object = document.getElementById(data.id);
        object.style.display = "none";
        e.target.appendChild(object);
        popSFX.pause();
        popSFX.currentTime = 0;
        popSFX.play();
      } else {
       let object = document.getElementById(data.id);
        object.style.animation = 'no 1 linear  0.7s';
        noSFX.pause();
        noSFX.currentTime = 0;
        noSFX.play();
        setTimeout(() => {
          object.style.animation = 'none';
        }, 700);
      }
    });

    pencilsZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.desk == "true") {
         cozyMP3.pause()
        boomSFX.pause();
        boomSFX.currentTime = 0;
        boomSFX.play();
        backModal.showModal()
        clearInterval(interval.interval)
        time.innerText = 0
      } else if (data.desk == "false" && data.place == "pencils-zone") {
        let object = document.getElementById(data.id);
        object.style.display = "none";
        e.target.appendChild(object);
        popSFX.pause();
        popSFX.currentTime = 0;
        popSFX.play();
      } else {
       let object = document.getElementById(data.id);
        object.style.animation = 'no 1 linear  0.7s';
        noSFX.pause();
        noSFX.currentTime = 0;
        noSFX.play();
        setTimeout(() => {
          object.style.animation = 'none';
        }, 700);
      }
    });

    basketZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.desk == "true") {
        cozyMP3.pause()
        boomSFX.pause();
        boomSFX.currentTime = 0;
        boomSFX.play();
        backModal.showModal()
        clearInterval(interval.interval)
        time.innerText = 0
      } else if (data.desk == "false" && data.place == "basket-zone") {
        let object = document.getElementById(data.id);
        object.style.display = "none";
        e.target.appendChild(object);
        popSFX.pause();
        popSFX.currentTime = 0;
        popSFX.play();
      } else {
        let object = document.getElementById(data.id);
        object.style.animation = 'no 1 linear  0.7s';
        noSFX.pause();
        noSFX.currentTime = 0;
        noSFX.play();
        setTimeout(() => {
          object.style.animation = 'none';
        }, 700);
      }
    });

    backpackZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.desk == "true") {
        cozyMP3.pause()
        boomSFX.pause();
        boomSFX.currentTime = 0;
        boomSFX.play();
        backModal.showModal()
        clearInterval(interval.interval)
        time.innerText = 0
      } else if (data.desk == "false" && data.place == "backpack-zone") {
        let object = document.getElementById(data.id);
        object.style.display = "none";
        e.target.appendChild(object);
        popSFX.pause();
        popSFX.currentTime = 0;
        popSFX.play();
      } else {
        let object = document.getElementById(data.id);
        object.style.animation = 'no 1 linear  0.7s';
        noSFX.pause();
        noSFX.currentTime = 0;
        noSFX.play();
        setTimeout(() => {
          object.style.animation = 'none';
        }, 700);
      }
    });

    entryButton.addEventListener("click", () => {
      dingSFX.pause();
      dingSFX.currentTime = 0;
      dingSFX.play();
      setTimeout(()=>{
        entry.style.display = 'none'
        time.innerText = ''
        round = null
        round = new Round(cozyMP3,timeUpSFX,backModal)
        interval = null
        interval = round.getInterval()
        cozyMP3.pause()
        cozyMP3.currentTime = 0
        cozyMP3.play()
      },2000)
    });

    backButton.addEventListener('click',()=>{
      entry.style.display = 'flex'
      cozyMP3.pause()
      cozyMP3.currentTime = 0
      popSFX.pause()
      popSFX.currentTime = 0
      popSFX.play()
      backModal.close()
    })

    return {
      cozyMP3,
      dingSFX,
      popSFX,
      boomSFX,
      noSFX,
      timeUpSFX,
      entry,
      game,
      backModal,
      desk,
      trashZone,
      holderZone,
      pencilsZone,
      basketZone,
      backpackZone,
      entryButton,
      interval,
      time
    };
  }
}
