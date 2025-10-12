const planet = document.getElementById("planet");
const moon = document.getElementById("moon");
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Fixed color–sound pairs
const colorSoundMap = [
  { hue: 0, type: "sine", freq: 220 }, // red
  { hue: 45, type: "square", freq: 280 }, // orange
  { hue: 90, type: "triangle", freq: 340 }, // yellow-green
  { hue: 160, type: "sawtooth", freq: 400 }, // teal
  { hue: 210, type: "sine", freq: 460 }, // blue
  { hue: 270, type: "square", freq: 520 }, // purple
  { hue: 320, type: "triangle", freq: 580 }, // pink
];

// Pick one combo at random
const selected =
  colorSoundMap[Math.floor(Math.random() * colorSoundMap.length)];

// Apply moon color
document.documentElement.style.setProperty(
  "--moon-color",
  `hsl(${selected.hue}, 80%, 60%)`
);

// Use mapped sound
const oscType = selected.type;
const baseFreq = selected.freq;

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
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
// hover
document.addEventListener("mousemove", (e) => {
  const moon = document.getElementById("moon");
  const rect = moon.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 100) {
    moon.style.transform = `translate(${dx * 0.05}px, ${dy * 0.05}px)`;
  } else {
    moon.style.transform = `translate(0, 0)`;
  }
});

document.getElementById("reset-button").addEventListener("click", () => {
  location.reload();
});
