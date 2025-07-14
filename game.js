const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// === Control ===
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// === Gambar ===
const playerImg = new Image();
playerImg.src = "rapa.png";

const enemyImg = new Image();
enemyImg.src = "badawang.png";

// === Objek ===
let player = {
  x: 100,
  y: 100,
  speed: 3,
  size: 64,
};

let enemy = {
  x: 400,
  y: 300,
  speed: 1.5,
  size: 64,
};

// === Update Loop ===
function update() {
  // Kontrol Rapa
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Gerakin Badawang ke arah Rapa
  let dx = player.x - enemy.x;
  let dy = player.y - enemy.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 1) {
    enemy.x += (dx / dist) * enemy.speed;
    enemy.y += (dy / dist) * enemy.speed;
  }
}

// === Gambar Loop ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Latar
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gambar karakter
  ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.size, enemy.size);
}

// === Game Loop ===
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
