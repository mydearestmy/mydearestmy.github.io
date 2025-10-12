const planet = document.getElementById("planet");
const moon = document.getElementById("moon");
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Randomize colors
const planetHue = Math.floor(Math.random() * 360);
const moonHue = Math.floor(Math.random() * 360);
document.documentElement.style.setProperty(
  "--planet-color",
  `hsl(${planetHue}, 80%, 50%)`
);
document.documentElement.style.setProperty(
  "--moon-color",
  `hsl(${moonHue}, 80%, 60%)`
);

// Randomize oscillator type
const waveTypes = ["sine", "square", "triangle", "sawtooth"];
const oscType = waveTypes[Math.floor(Math.random() * waveTypes.length)];
const baseFreq = 200 + Math.random() * 400;

// Planet center
const planetX = window.innerWidth / 2;
const planetY = window.innerHeight / 2;

// Audio setup
const osc = audioCtx.createOscillator();
const panNode = audioCtx.createStereoPanner();
const gainNode = audioCtx.createGain();

osc.type = oscType;
osc.frequency.value = baseFreq;
gainNode.gain.value = 0.2;

osc.connect(panNode).connect(gainNode).connect(audioCtx.destination);
osc.start();

let isDragging = false;

moon.style.left = `${planetX + 150}px`;
moon.style.top = `${planetY}px`;

moon.addEventListener("mousedown", async () => {
  isDragging = true;
  moon.style.cursor = "grabbing";
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  moon.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const x = e.clientX;
  const y = e.clientY;

  moon.style.left = `${x}px`;
  moon.style.top = `${y}px`;

  // Distance from planet
  const dx = x - planetX;
  const dy = y - planetY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Angle for stereo pan
  const angle = Math.atan2(dy, dx); // radians
  const pan = Math.sin(angle); // -1 to 1

  // Map distance to playback rate
  const rate = 0.5 + Math.min(distance / 300, 1.5);
  osc.frequency.value = baseFreq * rate;
  panNode.pan.value = pan;
});
