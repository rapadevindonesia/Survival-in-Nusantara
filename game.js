const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");

// === GAMBAR ===
const rapaImg = new Image();
rapaImg.src = "assets/rapa.png";

const badawangImg = new Image();
badawangImg.src = "assets/badawang.png";

const apelImg = new Image();
apelImg.src = "assets/apel.png";

const fireImg = new Image();
fireImg.src = "assets/fire.png";

// === SUARA ===
const eatSound = new Audio("assets/eat.mp3");
const hitSound = new Audio("assets/hit.mp3");

// === OBJEK ===
const player = { x: 50, y: 50, size: 32 };
const enemy = { x: 200, y: 100, size: 32 };
const apple = { x: 150, y: 150, size: 24, active: true };
const fire = { x: 100, y: 200, size: 32 };

// === TOMBOL GERAK ===
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// === DETEKSI TABRAKAN ===
function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

// === UPDATE GAME ===
function updateGame() {
  if (keys["ArrowUp"]) player.y -= 2;
  if (keys["ArrowDown"]) player.y += 2;
  if (keys["ArrowLeft"]) player.x -= 2;
  if (keys["ArrowRight"]) player.x += 2;

  if (apple.active && isColliding(player, apple)) {
    eatSound.play();
    apple.active = false;
  }

  if (isColliding(player, enemy)) {
    hitSound.play();
  }
}

// === DRAW ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar semua objek
  ctx.drawImage(rapaImg, player.x, player.y, player.size, player.size);
  ctx.drawImage(badawangImg, enemy.x, enemy.y, enemy.size, enemy.size);
  ctx.drawImage(fireImg, fire.x, fire.y, fire.size, fire.size);

  if (apple.active) {
    ctx.drawImage(apelImg, apple.x, apple.y, apple.size, apple.size);
  }

  updateGame();
  requestAnimationFrame(draw);
}

draw();
