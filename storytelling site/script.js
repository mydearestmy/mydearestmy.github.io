const title = document.getElementById("fade-text");
const text = title.textContent;
title.textContent = "";

[...text].forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.animationDelay = `${i * 0.2}s`;
  title.appendChild(span);
});
