const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");

const rapaImg = new Image(); rapaImg.src = "assets/rapa.png";
const badawangImg = new Image(); badawangImg.src = "assets/badawang.png";
const apelImg = new Image(); apelImg.src = "assets/apel.png";
const fireImg = new Image(); fireImg.src = "assets/fire.png";

const eatSound = new Audio("assets/eat.mp3");
const hitSound = new Audio("assets/hit.mp3");

let player = { x:50, y:50, w:32, h:32, hp:100 };
let enemy = { x:300, y:200, w:32, h:32, hp:100 };
let apple = { x:150, y:120, active:true };
let fire = { x:220, y:180, active:false };

let keys = {};
document.addEventListener("keydown", e=>keys[e.key]=true);
document.addEventListener("keyup", e=>keys[e.key]=false);

function attackEnemy(){ /* ... */ }
function eatFood(){ /* ... */ }
function makeFire(){ /* ... */ }

function gameLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(rapaImg, player.x, player.y, player.w, player.h);
  ctx.drawImage(badawangImg, enemy.x, enemy.y, enemy.w, enemy.h);
  if(apple.active) ctx.drawImage(apelImg, apple.x, apple.y, 32,32);
  if(fire.active) ctx.drawImage(fireImg, fire.x, fire.y, 32,32);

  // tombol arah
  if(keys["ArrowUp"]) player.y-=2;
  if(keys["ArrowDown"]) player.y+=2;
  if(keys["ArrowLeft"]) player.x-=2;
  if(keys["ArrowRight"]) player.x+=2;

  requestAnimationFrame(gameLoop);
}

// start game loop after semua picture loaded
let imagesLoaded = 0, totalImages = 4;
[rapaImg,badawangImg,apelImg,fireImg].forEach(img=>{
  img.onload = ()=>{ imagesLoaded++; if(imagesLoaded===totalImages) gameLoop(); }
});
