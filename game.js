// === LOAD GAMBAR ===
const rapaImg = new Image();
rapaImg.src = "assets/rapa.png";

const enemyImg = new Image();
enemyImg.src = "assets/badawang.png";

const appleImg = new Image();
appleImg.src = "assets/apel.png";

// === LOAD SUARA ===
const eatSound = new Audio("assets/eat.mp3");
const hitSound = new Audio("assets/hit.mp3");

// === PLAYER, MUSUH, APEL ===
const player = { x: 50, y: 50, size: 32 };
const enemy = { x: 200, y: 100, size: 32 };
const apple = { x: 150, y: 150, size: 24, active: true };

// === COLLISION FUNCTION ===
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
  // Cek tabrakan dengan apel
  if (apple.active && isColliding(player, apple)) {
    eatSound.play();
    apple.active = false;
  }

  // Cek tabrakan dengan musuh
  if (isColliding(player, enemy)) {
    hitSound.play();
  }
}

// === GAMBAR ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(rapaImg, player.x, player.y, player.size, player.size);
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.size, enemy.size);
  if (apple.active) {
    ctx.drawImage(appleImg, apple.x, apple.y, apple.size, apple.size);
  }

  updateGame();
  requestAnimationFrame(draw);
}

draw();

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let player = { x:100, y:100, size:30, color:"lime", speed:2, health:100, hunger:100, inventory:0 };
let apple = { x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, size:20, color:"red" };
let enemies = [];
let fire = { on:false, x:0, y:0, life:0 };

let time = 0, isAttacking=false;
const keys = {};

["left","right","up","down"].forEach(dir=>{
  document.getElementById(dir).addEventListener("touchstart",()=> keys["Arrow"+dir.charAt(0).toUpperCase()+dir.slice(1)] = true);
  document.getElementById(dir).addEventListener("touchend",()=> keys["Arrow"+dir.charAt(0).toUpperCase()+dir.slice(1)] = false);
});
document.getElementById("attack").addEventListener("click",()=> isAttacking=true);
document.getElementById("eat").addEventListener("click",()=>{
  if(player.inventory>0 && player.hunger<100){ player.hunger+=30; player.inventory--; }
});
document.getElementById("fire").addEventListener("click",()=>{
  fire.on=true; fire.x=player.x; fire.y=player.y; fire.life=300;
});

function spawnEnemy(){
  const ex = Math.random()*window.innerWidth;
  const ey = Math.random()*window.innerHeight;
  enemies.push({ x:ex, y:ey, size:30, speed:1, alive:true });
}
setInterval(spawnEnemy, 3000);

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  time++;
  if(time%60===0){
    player.hunger--; if(player.hunger<0){ player.health--; player.hunger=0; }
    localStorage.setItem("save", JSON.stringify(player));
  }
  if(keys.ArrowRight) player.x+=player.speed;
  if(keys.ArrowLeft) player.x-=player.speed;
  if(keys.ArrowUp) player.y-=player.speed;
  if(keys.ArrowDown) player.y+=player.speed;

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = apple.color;
  ctx.beginPath();
  ctx.arc(apple.x, apple.y, apple.size/2, 0, Math.PI*2);
  ctx.fill();

  enemies.forEach(e=>{
    if(!e.alive) return;
    const dx=player.x-e.x, dy=player.y-e.y;
    const dist=Math.hypot(dx,dy);
    e.x+=dx/dist*e.speed; e.y+=dy/dist*e.speed;
    ctx.fillStyle="purple";
    ctx.fillRect(e.x,e.y,e.size,e.size);
    if(dist<(player.size+e.size)/2){
      player.health-=0.5;
    }
    if(isAttacking && dist<40){
      e.alive=false;
      player.inventory++;
    }
  });
  isAttacking=false;

  if(fire.on && fire.life-->0){
    ctx.fillStyle="orange";
    ctx.beginPath();
    ctx.arc(fire.x,fire.y,25,0,2*Math.PI);
    ctx.fill();
    enemies.forEach(e=>{
      if(e.alive && Math.hypot(player.x-e.x, player.y-e.y)<50){
        e.alive=false; player.health+=1;
      }
    });
  } else fire.on=false;

  ctx.fillStyle="white";
  ctx.fillRect(10,10,player.health*2,10);
  ctx.fillStyle="orange";
  ctx.fillRect(10,30,player.hunger*2,10);
  ctx.fillStyle="white";
  ctx.fillText("🍎:"+player.inventory,10,60);

  const shade = Math.abs(Math.sin(time/500))*0.5;
  ctx.fillStyle = `rgba(0,0,0,${shade})`;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  requestAnimationFrame(draw);
}

const save = localStorage.getItem("save");
if(save){
  const p = JSON.parse(save);
  player.health=p.health; player.hunger=p.hunger; player.inventory=p.inventory;
}
draw();
