// Core memory interaction logic begins once the DOM is loaded.
// Clicking on a memory "box" will expand it — this visual zoom mimics emotionally accessing a thought.
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      e.stopPropagation();
      boxes.forEach((b) => b.classList.remove("expanded")); // Ensures only one memory can be open at a time.
      box.classList.add("expanded"); // Expands the selected memory for focused reading — like zooming in on emotion.
    });
  });
  // Clicking outside closes any open memories — encourages quiet reflection and moment-by-moment attention.
  document.addEventListener("click", () => {
    boxes.forEach((b) => b.classList.remove("expanded"));
  });
});
// Function that simulates text being typed out.
// This creates a sense of presence — as if a memory is being reassembled live.
// The slight delay between letters adds emotional pacing and vulnerability.
function typeWriter(element, text, speed = 40) {
  let i = 0;
  element.innerHTML =
    '<span class="typed-text"></span><span class="cursor">|</span>';
  const typedText = element.querySelector(".typed-text");
  const cursor = element.querySelector(".cursor");
  const typeSound = document.getElementById("typeSound");
  // Audio feedback starts when typing begins, adding emotional texture.
  if (typeSound) {
    typeSound.currentTime = 0;
    typeSound.play().catch((e) => console.log("Sound error:", e));
  }
  // Recursive function types one character at a time.
  function type() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed); // Delay between each character = mood pacing.
    } else {
      cursor.style.display = "none"; // Cursor disappears once memory is fully revealed.
      if (typeSound) {
        typeSound.pause();
        typeSound.currentTime = 0;
      }
    }
  }

  type(); // Start the typewriter effect.
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
// Hover sound gives a sense of spatial presence to memory nodes.
// This reinforces the idea that these aren’t just UI elements — they’re fragments waiting to be felt.
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
// Background ambient music starts on user interaction (to avoid autoplay blocking).
// Volume is low to feel like a soft emotional undertone, not a "soundtrack" — enhancing atmosphere.
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("backgroundMusic");
  bgMusic.volume = 0.1;
});
// First user interaction (any click) triggers the ambient music, respecting browser autoplay policies.
// This links music with intentional discovery — it plays only when the user is "ready."
window.addEventListener("click", () => {
  const bgMusic = document.getElementById("backgroundMusic");
  if (bgMusic.paused) {
    bgMusic.play().catch((e) => console.log("Autoplay blocked:", e));
  }
});
