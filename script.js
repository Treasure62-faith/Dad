// Optional fun animations or interactivity
console.log("Happy Father's Day! 🚀");
// Stars background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    speed: Math.random() * 0.5 + 0.2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "Green";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Music toggle
function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

const dadBotLines = [
  "> DadBot Active 🧠",
  "> Scanning Dad’s Awesomeness...",
  "> 💯 Confidence Level: 9999%",
  "> 🦾 Strength: Legendary",
  "> 🧠 Wisdom: Infinite",
  "> ❤️ Love Level: OVERFLOW",
  "> You are the blueprint of greatness.",
  "> Dad, you're the real MVP.",
  "> DadBot shutting down. Human dad still superior 💙"
];

let lineIndex = 0;
const terminal = document.getElementById("terminal");

function printDadBotLine() {
  if (lineIndex < dadBotLines.length) {
    const p = document.createElement("p");
    p.textContent = dadBotLines[lineIndex++];
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(printDadBotLine, 1000);
  }
}

setTimeout(printDadBotLine, 1500);

function speakMessage() {
  const message = new SpeechSynthesisUtterance(
    "Hi Dad. Happy Father's Day! Just wanted to say thank you for always being there for me. You're my hero, my guide, and my forever inspiration. I love you!"
  );
  message.rate = 1;
  message.pitch = 1.2;
  message.lang = 'en-US';
  speechSynthesis.speak(message);
}

document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

const emojiCanvas = document.getElementById('emojiCanvas');
const emojiCtx = emojiCanvas.getContext('2d');
emojiCanvas.width = window.innerWidth;
emojiCanvas.height = window.innerHeight;

const emojis = ["💙", "✨", "👑", "🥇", "🛸", "😎", "💪", "🦸‍♂️", "⚽", "🏈", "🏀", "💫", "💯", "💞", "LoveU"];
let emojiParticles = [];

function createEmoji() {
  emojiParticles.push({
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    x: Math.random() * emojiCanvas.width,
    y: emojiCanvas.height + 20,
    size: Math.random() * 24 + 16,
    speed: Math.random() * 1 + 2.0,
  });
}

function drawEmojis() {
  emojiCtx.clearRect(0, 0, emojiCanvas.width, emojiCanvas.height);
  emojiParticles.forEach((particle, index) => {
    emojiCtx.font = `${particle.size}px Arial`;
    emojiCtx.fillText(particle.emoji, particle.x, particle.y);
    particle.y -= particle.speed;
    if (particle.y < -50) emojiParticles.splice(index, 1);
  });
  requestAnimationFrame(drawEmojis);
}

setInterval(createEmoji, 300);
drawEmojis();

document.addEventListener("click", function(e) {
  for (let i = 0; i < 20; i++) {
    createParticle(e.clientX, e.clientY);
  }
});

function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "firework";
  document.body.appendChild(particle);
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  const size = Math.random() * 8 + 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const destinationX = (Math.random() - 0.5) * 200;
  const destinationY = (Math.random() - 0.5) * 200;

  particle.style.setProperty('--dest-x', `${destinationX}px`);
  particle.style.setProperty('--dest-y', `${destinationY}px`);

  setTimeout(() => {
    particle.remove();
  }, 1000);
}

let input = "";
const code = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

window.addEventListener("keydown", e => {
  input += e.key;
  if (input.includes(code)) {
    alert("💥 Dad’s Legacy Unlocked: Infinite Respect Mode Activated!");
    input = "";
  }
});

const dadQuotes = [
  "Son, always show up — even when it's hard.",
  "The strongest move is kindness.",
  "Never stop learning — even old dogs do new tricks.",
  "Real strength is quiet. Let your actions speak.",
  "Don't fear failure. Fear regret.",
  "The world doesn't need perfect. It needs real.",
  "One step at a time is still moving forward."
];

function generateQuote() {
  const quote = dadQuotes[Math.floor(Math.random() * dadQuotes.length)];
  document.getElementById('dad-quote').textContent = quote;
}

// Unlocks game with secret phrase
document.addEventListener("keydown", function (e) {
  if (e.key === "g" && e.ctrlKey) {
    document.getElementById("dadGame").style.display = "block";
    alert("🎮 Dad Game Unlocked! Good luck!");
  }
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function(event) {
    let x = event.gamma; // side to side
    let y = event.beta;  // up and down

    document.body.style.backgroundPosition = `${x * 2}px ${y * 2}px`;
  });
}

const emojis = ["😂", "😎", "👑", "🥇", "💙", "🛸"];
const doubled = [...emojis, ...emojis]; // pairs
let flipped = [];
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function setupGame() {
  const grid = document.getElementById("cardGrid");
  const shuffled = shuffle(doubled);
  grid.innerHTML = "";

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerText = "";
    card.addEventListener("click", () => flipCard(card));
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.innerText = card.dataset.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    lockBoard = true;
    const [a, b] = flipped;
    if (a.dataset.emoji === b.dataset.emoji) {
      flipped = [];
      lockBoard = false;
    } else {
      setTimeout(() => {
        a.classList.remove("flipped");
        b.classList.remove("flipped");
        a.innerText = "";
        b.innerText = "";
        flipped = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

// Unlock game with Ctrl + G
document.addEventListener("keydown", function (e) {
  if (e.key === "g" && e.ctrlKey) {
    const game = document.getElementById("dadGame");
    game.style.display = "block";
    setupGame();
    alert("🎮 Dad Joke Memory Match: UNLOCKED!");
  }
});
