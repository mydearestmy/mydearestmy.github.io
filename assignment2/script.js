document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const playlist = document.querySelectorAll(".playlist-item");
  const musicName = document.getElementById("music-name");
  const progressBar = document.querySelector(".progress-bar");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const repeatBtn = document.getElementById("repeat-btn");
  const vinyl = document.querySelector(".vinyl");
  const tonearm = document.querySelector(".tonearm");
  let currentTrack = 0;
  let isRepeating = false;
  let isPlaying = false;

  function loadTrack(index) {
    const src = playlist[index].getAttribute("data-src");
    audioPlayer.src = src;
    musicName.textContent = playlist[index].textContent;
    console.log("Loading track:", src);
  }
  // Switches icons when playing/pausing
  function updatePlayPauseIcon() {
    const playPauseImg = document.getElementById("play-pause-img");
    if (audioPlayer.paused) {
      playPauseImg.src = "icons8-play-40.png";
      playPauseImg.alt = "Play Button";
    } else {
      playPauseImg.src = "icons8-pause-40.png";
      playPauseImg.alt = "Pause Button";
    }
  }

  function updateProgressBar() {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBarFill.style.width = `${percentage}%`;
  }
  // Click-to-seek functionality on progress bar
  function seek(event) {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    audioPlayer.currentTime = percentage * audioPlayer.duration;
  }
  // Starts vinyl spinning + rotates tonearm (visual metaphor for engagement)
  function startVinylAnimation() {
    vinyl.style.animationPlayState = "running";
    tonearm.style.transform = "rotate(20deg)";
  }
  // Stops vinyl when paused, returning to rest state
  function stopVinylAnimation() {
    vinyl.style.animationPlayState = "paused";
    tonearm.style.transform = "rotate(0deg)";
  }

  document
    .getElementById("play-pause-btn")
    .addEventListener("click", function () {
      if (audioPlayer.paused) {
        audioPlayer.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        musicName.style.display = "flex"; // Only show current track when audio is active
        startVinylAnimation();
      } else {
        audioPlayer.pause();
        stopVinylAnimation();
      }
      updatePlayPauseIcon();
    });
  // Previous/Next controls enable linear navigation — ideal for curated playlists
  document
    .getElementById("previous-btn")
    .addEventListener("click", function () {
      currentTrack = currentTrack > 0 ? currentTrack - 1 : playlist.length - 1;
      loadTrack(currentTrack);
      audioPlayer.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      updatePlayPauseIcon();
      musicName.style.display = "flex";
      startVinylAnimation();
    });

  document.getElementById("next-btn").addEventListener("click", function () {
    currentTrack = currentTrack < playlist.length - 1 ? currentTrack + 1 : 0;
    loadTrack(currentTrack);
    audioPlayer.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    updatePlayPauseIcon();
    musicName.style.display = "flex";
    startVinylAnimation();
  });

  document
    .getElementById("mute-unmute-btn")
    .addEventListener("click", function () {
      audioPlayer.muted = !audioPlayer.muted;
      const muteUnmuteImg = document.getElementById("mute-unmute-img");
      if (audioPlayer.muted) {
        muteUnmuteImg.src = "icons8-no-audio-40.png";
        muteUnmuteImg.alt = "Unmute Button";
      } else {
        muteUnmuteImg.src = "icons8-audio-40.png";
        muteUnmuteImg.alt = "Mute Button";
      }
    });
  // Repeat mode adds user control — icon change indicates state
  repeatBtn.addEventListener("click", function () {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle("active", isRepeating);
    const repeatImg = document.getElementById("repeat-img");
    if (isRepeating) {
      repeatImg.src = "icons8-repeat-40 (1).png";
      repeatImg.alt = "Repeat On";
    } else {
      repeatImg.src = "icons8-repeat-40.png";
      repeatImg.alt = "Repeat Off";
    }
  });
  // Auto-play next track or loop depending on repeat mode
  audioPlayer.addEventListener("ended", function () {
    if (isRepeating) {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    } else {
      document.getElementById("next-btn").click();
    }
  });

  audioPlayer.addEventListener("timeupdate", updateProgressBar);

  progressBar.addEventListener("click", seek);
  // Enables clicking on track title to play it — intuitive interaction
  for (let i = 0; i < playlist.length; i++) {
    playlist[i].addEventListener("click", function () {
      currentTrack = i;
      loadTrack(currentTrack);
      audioPlayer.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      updatePlayPauseIcon();
      musicName.style.display = "flex";
      startVinylAnimation();
    });
  }

  musicName.style.display = "none";

  if (playlist.length > 0) {
    loadTrack(currentTrack);
    musicName.style.display = "none";
  }

  audioPlayer.addEventListener("canplay", function () {
    console.log("Audio can play:", audioPlayer.src);
  });

  audioPlayer.addEventListener("play", function () {
    console.log("Audio is playing:", audioPlayer.src);
  });

  audioPlayer.addEventListener("pause", function () {
    console.log("Audio is paused:", audioPlayer.src);
  });

  audioPlayer.addEventListener("error", function (e) {
    console.error("Error loading audio:", e);
  });

  audioPlayer.addEventListener("timeupdate", function () {
    console.log("Current time:", audioPlayer.currentTime);
  });
});
