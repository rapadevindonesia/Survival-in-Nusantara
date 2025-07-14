const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Load images
const playerImg = new Image();
playerImg.src = "rapa.png";
const enemyImg = new Image();
enemyImg.src = "badawang.png";
const fireImg = new Image();
fireImg.src = "fire.png";

// Player
let player = {
  x: 100,
  y: 100,
  speed: 2.5,
  width: 64,
  height: 64,
  inventory: [],
  hunger: 100,
  nearFire: false,
};

// Musuh (Badawang)
let enemy = {
  x: 400,
  y: 300,
  speed: 1.0,
  width: 64,
  height: 64,
};

// Api unggun
let fire = {
  x: 200,
  y: 200,
  active: true,
};

// Waktu
let time = 0;
let isNight = false;

function update() {
  // Gerak Rapa
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Gerak Badawang ke arah Rapa
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const distance = Math.hypot(dx, dy);
  if (distance > 1) {
    enemy.x += (dx / distance) * enemy.speed;
    enemy.y += (dy / distance) * enemy.speed;
  }

  // Hunger berkurang
  if (time % 100 === 0) player.hunger -= 1;
  if (player.hunger <= 0) player.hunger = 0;

  // Cek dekat api
  player.nearFire = (
    player.x < fire.x + 50 &&
    player.x + player.width > fire.x &&
    player.y < fire.y + 50 &&
    player.y + player.height > fire.y
  );

  // Siang malam
  time++;
  if (time % 1000 === 0) isNight = !isNight;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = isNight ? "#00111a" : "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Api unggun
  if (fire.active) {
    ctx.drawImage(fireImg, fire.x, fire.y, 50, 50);
  }

  // Gambar Rapa & Badawang
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);

  // UI
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Hunger: " + player.hunger, 20, 30);
  ctx.fillText("Time: " + (isNight ? "Night" : "Day"), 20, 50);
  if (player.nearFire) ctx.fillText("Near Fire: Warm", 20, 70);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
