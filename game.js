
const canvas = document.getElementById("gc"); const ctx = canvas.getContext("2d"); canvas.width = 300; canvas.height = 200;

// === GAME STATE === let keys = {};

const player = { x: 50, y: 50, size: 32, hp: 100 }; const enemy = { x: 200, y: 100, size: 32, hp: 100 }; const apple = { x: 150, y: 150, size: 24, active: true }; const fire = { x: 100, y: 180, size: 32, active: false };

// === IMAGES === const rapaImg = new Image(); rapaImg.src = "assets/rapa.png"; const badawangImg = new Image(); badawangImg.src = "assets/badawang.png"; const apelImg = new Image(); apelImg.src = "assets/apel.png"; const fireImg = new Image(); fireImg.src = "assets/fire.png";

// === AUDIO === const eatSound = new Audio("assets/eat.mp3"); const hitSound = new Audio("assets/hit.mp3"); const pickupSound = new Audio("assets/pickup.mp3");

// === UTILS === function isColliding(a, b) { return a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y; }

function attackEnemy() { if (isColliding(player, enemy) && enemy.hp > 0) { enemy.hp -= 10; hitSound.play(); } }

function eatFood() { if (apple.active && isColliding(player, apple)) { player.hp = Math.min(100, player.hp + 20); apple.active = false; eatSound.play(); } }

function makeFire() { if (!fire.active) { fire.x = player.x; fire.y = player.y; fire.active = true; pickupSound.play(); } }

// === TOUCHSCREEN CONTROLS === ["up", "down", "left", "right"].forEach(dir => { const btn = document.getElementById(dir); btn.addEventListener("touchstart", () => { keys["Arrow" + dir.charAt(0).toUpperCase() + dir.slice(1)] = true; }); btn.addEventListener("touchend", () => { keys["Arrow" + dir.charAt(0).toUpperCase() + dir.slice(1)] = false; }); });

document.getElementById("attack").addEventListener("click", attackEnemy); document.getElementById("eat").addEventListener("click", eatFood); document.getElementById("fire").addEventListener("click", makeFire);

// === GAME LOOP === function gameLoop() { ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw objects ctx.drawImage(rapaImg, player.x, player.y, player.size, player.size); if (enemy.hp > 0) ctx.drawImage(badawangImg, enemy.x, enemy.y, enemy.size, enemy.size); if (apple.active) ctx.drawImage(apelImg, apple.x, apple.y, apple.size, apple.size); if (fire.active) ctx.drawImage(fireImg, fire.x, fire.y, fire.size, fire.size);

// Draw HP Bar ctx.fillStyle = "lime"; ctx.fillRect(10, 10, player.hp * 2, 10); ctx.strokeStyle = "white"; ctx.strokeRect(10, 10, 200, 10);

// Movement logic if (keys["ArrowUp"]) player.y -= 2; if (keys["ArrowDown"]) player.y += 2; if (keys["ArrowLeft"]) player.x -= 2; if (keys["ArrowRight"]) player.x += 2;

// Enemy AI: follow player if (enemy.hp > 0) { if (enemy.x < player.x) enemy.x += 1; if (enemy.x > player.x) enemy.x -= 1; if (enemy.y < player.y) enemy.y += 1; if (enemy.y > player.y) enemy.y -= 1; }

requestAnimationFrame(gameLoop); }

// === LOAD SEMUA GAMBAR === let loadedImages = 0; const images = [rapaImg, badawangImg, apelImg, fireImg]; images.forEach(img => { img.onload = () => { loadedImages++; if (loadedImages === images.length) gameLoop(); }; img.onerror = () => console.error("Gagal load gambar:", img.src); });

  
