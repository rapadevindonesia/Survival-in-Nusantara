const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");

// === ASSETS ===
const rapaImg = new Image(); rapaImg.src = "assets/rapa.png";
const badawangImg = new Image(); badawangImg.src = "assets/badawang.png";
const apelImg = new Image(); apelImg.src = "assets/apel.png";
const fireImg = new Image(); fireImg.src = "assets/fire.png";

const eatSound = new Audio("assets/eat.mp3");
const hitSound = new Audio("assets/hit.mp3");

// === ENTITY ===
let player = { x: 50, y: 50, w: 32, h: 32, hp: 100 };
let enemy = { x: 300, y: 200, w: 32, h: 32, hp: 100 };
let apple = { x: 150, y: 120, active: true };
let fire = { x: 220, y: 180, active: false };

// === INPUTS ===
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// === ACTIONS ===
function attackEnemy() {
  const dx = Math.abs(player.x - enemy.x);
  const dy = Math.abs(player.y - enemy.y);
  if (dx < 40 && dy < 40 && enemy.hp > 0) {
    enemy.hp -= 10;
    hitSound.play();
  }
}

function eatFood() {
  const dx = Math.abs(player.x - apple.x);
  const dy = Math.abs(player.y - apple.y);
  if (apple.active && dx < 32 && dy < 32) {
    player.hp = Math.min(player.hp + 20, 100);
    apple.active = false;
    eatSound.play();
  }
}

function makeFire() {
  const dx = Math.abs(player.x - fire.x);
  const dy = Math.abs(player.y - fire.y);
  if (!fire.active && dx < 40 && dy < 40) {
    fire.active = true;
  }
}

// === GAME LOOP ===
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(rapaImg, player.x, player.y, player.w, player.h);
  if (enemy.hp > 0) ctx.drawImage(badawangImg, enemy.x, enemy.y, enemy.w, enemy.h);
  if (apple.active) ctx.drawImage(apelImg, apple.x, apple.y, 32, 32);
  if (fire.active) ctx.drawImage(fireImg, fire.x, fire.y, 32, 32);

  // HP BAR
  ctx.fillStyle = "lime";
  ctx.fillRect(10, 10, player.hp * 2, 10);
  ctx.strokeStyle = "white";
  ctx.strokeRect(10, 10, 200, 10);

  // MOVEMENT
  if (keys["ArrowUp"]) player.y -= 2;
  if (keys["ArrowDown"]) player.y += 2;
  if (keys["ArrowLeft"]) player.x -= 2;
  if (keys["ArrowRight"]) player.x += 2;

  requestAnimationFrame(gameLoop);
}

// === TOUCHSCREEN BUTTONS ===
document.getElementById("up").onclick = () => player.y -= 5;
document.getElementById("down").onclick = () => player.y += 5;
document.getElementById("left").onclick = () => player.x -= 5;
document.getElementById("right").onclick = () => player.x += 5;

document.getElementById("attack").onclick = attackEnemy;
document.getElementById("eat").onclick = eatFood;
document.getElementById("fire").onclick = makeFire;

// === LOAD IMAGE BARU JALANKAN GAME ===
let imagesLoaded = 0;
const totalImages = 4;
[rapaImg, badawangImg, apelImg, fireImg].forEach(img => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) gameLoop();
  };
});
