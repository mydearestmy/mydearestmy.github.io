document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      e.stopPropagation();
      boxes.forEach((b) => b.classList.remove("expanded"));
      box.classList.add("expanded");
    });
  });

  document.addEventListener("click", () => {
    boxes.forEach((b) => b.classList.remove("expanded"));
  });
});

function typeWriter(element, text, speed = 40) {
  let i = 0;
  element.innerHTML =
    '<span class="typed-text"></span><span class="cursor">|</span>';
  const typedText = element.querySelector(".typed-text");
  const cursor = element.querySelector(".cursor");

  function type() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      cursor.style.display = "none"; // Hide cursor when done
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".box.expanded").forEach((b) => {
        b.classList.remove("expanded");
      });
      box.classList.add("expanded");

      const typewriter = box.querySelector(".typewriter-text");
      if (typewriter) {
        const text = typewriter.getAttribute("data-text");
        typeWriter(typewriter, text);
      }
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".box.expanded").forEach((b) => {
      b.classList.remove("expanded");
    });
  });
});

const hoverBox = document.getElementById("hoverBox");
const hoverSound = document.getElementById("hoverSound");

hoverBox.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0;
  hoverSound.play().catch((e) => console.log("Playback error:", e));
});

hoverBox.addEventListener("mouseleave", () => {
  hoverSound.pause();
  hoverSound.currentTime = 0;
});
