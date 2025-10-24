const title = document.getElementById("fade-text");
const text = title.textContent;
title.textContent = "";

[...text].forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.animationDelay = `${i * 0.2}s`;
  title.appendChild(span);
});

const scrollElements = document.querySelectorAll(".scroll-fade");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible"); // 👈 fade out when scrolling back up
    }
  });
});
scrollElements.forEach((el) => observer.observe(el));

const page4 = document.querySelector(".page4");
window.addEventListener("scroll", () => {
  const rect = page4.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  // How much of page4 is visible
  const visible = Math.max(0, windowHeight - rect.top);
  const percent = Math.min(1, visible / rect.height);
  // Interpolate from black (0) to white (255)
  const value = Math.round(percent * 255);
  const rgb = `rgb(${value}, ${value}, ${value})`;

  page4.style.backgroundColor = rgb;

  // Optional: adjust text color for contrast
  page4.style.color = value > 128 ? "#000" : "#fff";
});

const page8 = document.querySelector(".page8");

window.addEventListener("scroll", () => {
  const rect = page8.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visible = Math.max(0, windowHeight - rect.top);
  const percent = Math.min(1, visible / rect.height);

  // Interpolate from white (255) to black (0)
  const value = Math.round(255 - percent * 255);
  const rgb = `rgb(${value}, ${value}, ${value})`;

  page8.style.backgroundColor = rgb;

  // Optional: adjust text color for contrast
  const text = page8.querySelector(".content p");
  if (text) {
    text.style.color = value < 128 ? "#fff" : "#000";
  }
});
