// === INISIALISASI === const canvas = document.getElementById("gc"); const ctx = canvas.getContext("2d");

canvas.width = 300; canvas.height = 200;

let keys = {};

// === OBJEK === const player = { x: 50, y: 50, size: 32, hp: 100 }; const enemy = { x: 200, y: 100, size: 32, hp: 100 }; const apple = { x: 150, y: 150, size: 24, active: true }; const fire = { x: 100, y: 200, size: 32, active: false };

// === GAMBAR === const rapaImg = new Image(); rapaImg.src = "assets/rapa.png"; const badawangImg = new Image(); badawangImg.src = "assets/badawang.png"; const apelImg = new Image(); apelImg.src = "assets/apel.png"; const fireImg = new Image(); fireImg.src = "assets/fire.png";

// === SUARA === const eatSound = new Audio("assets/eat.mp3"); const hitSound = new Audio("assets/hit.mp3"); const pickupSound = new Audio("assets/pickup.mp3");

// === DETEKSI TABRAKAN === function isColliding(a, b) { return ( a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y ); }

// === FUNGSI TOMBOL AKSI === function attackEnemy() { if (isColliding(player, enemy)) { enemy.hp -= 10; hitSound.play(); } }

function eatFood() { if (apple.active && isColliding(player, apple)) { player.hp = Math.min(100, player.hp + 20); apple.active = false; eatSound.play(); } }

function makeFire() { if (!fire.active) { fire.x = player.x; fire.y = player.y; fire.active = true; pickupSound.play(); } }

// === LOOP GAME === function gameLoop() { ctx.clearRect(0, 0, canvas.width, canvas.height);

// Gambar objek ctx.drawImage(rapaImg, player.x, player.y, player.size, player.size); if (enemy.hp > 0) ctx.drawImage(badawangImg, enemy.x, enemy.y, enemy.size, enemy.size); if (apple.active) ctx.drawImage(apelImg, apple.x, apple.y, apple.size, apple.size); if (fire.active) ctx.drawImage(fireImg, fire.x, fire.y, fire.size, fire.size);

// HP BAR ctx.fillStyle = "lime"; ctx.fillRect(10, 10, player.hp * 2, 10); ctx.strokeStyle = "white"; ctx.strokeRect(10, 10, 200, 10);

// Gerak keyboard if (keys["ArrowUp"]) player.y -= 2; if (keys["ArrowDown"]) player.y += 2; if (keys["ArrowLeft"]) player.x -= 2; if (keys["ArrowRight"]) player.x += 2;

requestAnimationFrame(gameLoop); }

// === TOMBOL TOUCHSCREEN === ["up", "down", "left", "right"].forEach(dir => { const btn = document.getElementById(dir); btn.addEventListener("touchstart", () => { keys["Arrow" + dir.charAt(0).toUpperCase() + dir.slice(1)] = true; }); btn.addEventListener("touchend", () => { keys["Arrow" + dir.charAt(0).toUpperCase() + dir.slice(1)] = false; }); });

document.getElementById("attack").onclick = attackEnemy; document.getElementById("eat").onclick = eatFood; document.getElementById("fire").onclick = makeFire;

// === START === let imagesLoaded = 0; const totalImages = 4; [rapaImg, badawangImg, apelImg, fireImg].forEach(img => { img.onload = () => { imagesLoaded++; if (imagesLoaded === totalImages) gameLoop(); }; });

