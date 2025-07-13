// game.js FINAL
const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");

// === Gambar ===
const rapaImg = new Image();
rapaImg.src = "assets/rapa.png";
const badawangImg = new Image();
badawangImg.src = "assets/badawang.png";
const apelImg = new Image();
apelImg.src = "assets/apel.png";
const fireImg = new Image();
fireImg.src = "assets/fire.png";

// === Suara ===
const eatSound = new Audio("assets/eat.mp3");
const hitSound = new Audio("assets/hit.mp3");
const pickupSound = new Audio("assets/pickup.mp3");

// === Objek ===
const player = { x: 50, y: 50, size: 32, hp: 100 };
const enemy = { x: 200, y: 100, size: 32, hp: 100 };
const apple = { x: 150, y: 150, size: 24, active: true };
const fire = { x: 100, y: 200, size: 32, active: false };

// === Tombol Keyboard ===
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// === Deteksi Tabrakan ===
function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

function attackEnemy() {
  if (isColliding(player, enemy)) {
    enemy.hp -= 10;
    hitSound.play();
  }
}

function eatFood() {
  if (apple.active && isColliding(player, apple)) {
    player.hp = Math.min(player.hp + 20, 100);
    apple.active = false;
    eatSound.play();
  }
}

function makeFire() {
  fire.x = player.x;
  fire.y = player.y;
  fire.active = true;
  pickupSound.play();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar semua objek
  ctx.drawImage(rapaImg, player.x, player.y, player.size, player.size);
  if (enemy.hp > 0) ctx.drawImage(badawangImg, enemy.x, enemy.y, enemy.size, enemy.size);
  if (apple.active) ctx.drawImage(apelImg, apple.x, apple.y, apple.size, apple.size);
  if (fire.active) ctx.drawImage(fireImg, fire.x, fire.y, fire.size, fire.size);

  // HP Bar
  ctx.fillStyle = "lime";
  ctx.fillRect(10, 10, player.hp * 2, 10);
  ctx.strokeStyle = "white";
  ctx.strokeRect(10, 10, 200, 10);

  // Movement
  if (keys["ArrowUp"]) player.y -= 2;
  if (keys["ArrowDown"]) player.y += 2;
  if (keys["ArrowLeft"]) player.x -= 2;
  if (keys["ArrowRight"]) player.x += 2;

  requestAnimationFrame(gameLoop);
}

// === Tombol Touchscreen ===
document.getElementById("up").onclick = () => player.y -= 2;
document.getElementById("down").onclick = () => player.y += 2;
document.getElementById("left").onclick = () => player.x -= 2;
document.getElementById("right").onclick = () => player.x += 2;
document.getElementById("attack").onclick = attackEnemy;
document.getElementById("eat").onclick = eatFood;
document.getElementById("fire").onclick = makeFire;

// === Jalankan game setelah gambar load ===
let imagesLoaded = 0;
const totalImages = 4;
[rapaImg, badawangImg, apelImg, fireImg].forEach(img => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) gameLoop();
  };
});
    
