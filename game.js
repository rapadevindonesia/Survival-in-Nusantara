// === GAME STATE === const canvas = document.getElementById("gc"); const ctx = canvas.getContext("2d");

const playerImg = new Image(); playerImg.src = "assets/rapa.png";

const enemyImg = new Image(); enemyImg.src = "assets/badawang.png";

const appleImg = new Image(); appleImg.src = "assets/apple.png";

const fireImg = new Image(); fireImg.src = "assets/fire.png";

let player = { x: 50, y: 50, w: 32, h: 32, hp: 100 }; let enemy = { x: 300, y: 200, w: 32, h: 32, hp: 100 }; let apple = { x: 150, y: 120, active: true }; let fire = { x: 220, y: 180, active: false };

const keys = {};

document.addEventListener("keydown", (e) => (keys[e.key] = true)); document.addEventListener("keyup", (e) => (keys[e.key] = false));

function movePlayer() { if (keys["ArrowUp"]) player.y -= 2; if (keys["ArrowDown"]) player.y += 2; if (keys["ArrowLeft"]) player.x -= 2; if (keys["ArrowRight"]) player.x += 2; }

function drawSprite(img, x, y, w = 32, h = 32) { ctx.drawImage(img, x, y, w, h); }

function drawGame() { ctx.clearRect(0, 0, canvas.width, canvas.height); drawSprite(playerImg, player.x, player.y); drawSprite(enemyImg, enemy.x, enemy.y); if (apple.active) drawSprite(appleImg, apple.x, apple.y); if (fire.active) drawSprite(fireImg, fire.x, fire.y);

// HP Bar ctx.fillStyle = "lime"; ctx.fillRect(10, 10, player.hp * 2, 10); ctx.strokeStyle = "white"; ctx.strokeRect(10, 10, 200, 10); }

function gameLoop() { movePlayer(); drawGame(); requestAnimationFrame(gameLoop); }

requestAnimationFrame(gameLoop);

// === ACTION BUTTONS === function attackEnemy() { const dx = Math.abs(player.x - enemy.x); const dy = Math.abs(player.y - enemy.y); if (dx < 40 && dy < 40 && enemy.hp > 0) { enemy.hp -= 10; console.log("Serangan berhasil! HP musuh:", enemy.hp); } else { console.log("Terlalu jauh untuk menyerang!"); } }

function eatFood() { const dx = Math.abs(player.x - apple.x); const dy = Math.abs(player.y - apple.y); if (apple.active && dx < 32 && dy < 32) { player.hp = Math.min(player.hp + 20, 100); apple.active = false; console.log("Makan apel! HP sekarang:", player.hp); } else { console.log("Gak ada apel di dekatmu!"); } }

function makeFire() { const dx = Math.abs(player.x - fire.x); const dy = Math.abs(player.y - fire.y); if (!fire.active && dx < 40 && dy < 40) { fire.active = true; console.log("Api unggun dinyalakan!"); } else { console.log("Udah nyala atau kamu terlalu jauh!"); } }

