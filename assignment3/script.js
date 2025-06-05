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
  const typeSound = document.getElementById("typeSound");

  if (typeSound) {
    typeSound.currentTime = 0;
    typeSound.play().catch((e) => console.log("Sound error:", e));
  }

  function type() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      cursor.style.display = "none";
      if (typeSound) {
        typeSound.pause();
        typeSound.currentTime = 0;
      }
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

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const hoverSound = document.getElementById("hoverSound");

  boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch((e) => console.log("Playback error:", e));
    });

    box.addEventListener("mouseleave", () => {
      hoverSound.pause();
      hoverSound.currentTime = 0;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("backgroundMusic");
  bgMusic.volume = 0.1;
});
