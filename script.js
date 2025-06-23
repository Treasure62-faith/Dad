// ==============================
// Background & Vibes
console.log("Happy Father's Day! 🚀");

// Stars Canvas
const starCanvas = document.getElementById("stars");
const starCtx = starCanvas.getContext("2d");
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;
let stars = Array.from({length:200}, () => ({
  x: Math.random() * starCanvas.width,
  y: Math.random() * starCanvas.height,
  r: Math.random() * 1.2,
  s: Math.random() * 0.5 + 0.2
}));
function drawStars(){
  starCtx.clearRect(0,0,starCanvas.width,starCanvas.height);
  starCtx.fillStyle = "white";
  stars.forEach(st=> {
    starCtx.beginPath();
    starCtx.arc(st.x, st.y, st.r, 0, Math.PI*2);
    starCtx.fill();
    st.y += st.s;
    if(st.y > starCanvas.height){st.y=0; st.x=Math.random()*starCanvas.width;}
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Emoji Canvas
const emojiCanvas = document.getElementById("emojiCanvas");
const emojiCtx = emojiCanvas.getContext("2d");
emojiCanvas.width = window.innerWidth;
emojiCanvas.height = window.innerHeight;
let emojisArr = ["💙","✨","👑","🥇","🛸","😎","💪","🦸‍♂️"];
let emojiParts = [];
function createEmoji(){
  emojiParts.push({e: emojisArr[Math.floor(Math.random()*emojisArr.length)],
    x:Math.random()*emojiCanvas.width,
    y:emojiCanvas.height+20, size:Math.random()*24+16, s:Math.random()*2+1
  });
}
function drawEmojis(){
  emojiCtx.clearRect(0,0,emojiCanvas.width,emojiCanvas.height);
  emojiParts.forEach((p,i) => {
    emojiCtx.font = `${p.size}px Arial`;
    emojiCtx.fillText(p.e, p.x, p.y);
    p.y -= p.s;
    if(p.y < -50) emojiParts.splice(i,1);
  });
  requestAnimationFrame(drawEmojis);
}
setInterval(createEmoji, 300);
drawEmojis();

// Click Fireworks
document.addEventListener("click", e => {
  for(let i=0;i<20;i++){
    const dot = document.createElement("div");
    dot.className="firework";
    document.body.appendChild(dot);
    dot.style.left=`${e.clientX}px`; dot.style.top=`${e.clientY}px`;
    let destX=(Math.random()-.5)*200, destY=(Math.random()-.5)*200;
    dot.style.setProperty('--dest-x',destX+'px');
    dot.style.setProperty('--dest-y',destY+'px');
    setTimeout(()=>dot.remove(),1000);
  }
});

// DadBot Terminal
const botLines = [
  "> DadBot Active 🧠","...Scanning Awesomeness",
  "Confidence: 9999%","Strength: Legendary",
  "Wisdom: Infinite","Love Level: OVERFLOW",
  "You are greatness.","Dad = MVP",
  "Shutdown sequence: Human dad superior."
];
let li=0;
function printLines(){
  if(li<botLines.length){
    let p=document.createElement("p");
    p.textContent=botLines[li++];
    document.getElementById("terminal").appendChild(p);
    setTimeout(printLines,1000);
  }
}
setTimeout(printLines,1500);

// TTS
function speakMessage(){
  let msg=new SpeechSynthesisUtterance(
    "Hi Dad, Happy Father's Day! Thank you for being my hero..."
  );
  msg.lang='en-US'; msg.rate=1; msg.pitch=1.2;
  speechSynthesis.speak(msg);
}

// Music toggle
function toggleMusic(){
  const m=document.getElementById("bg-music");
  m.paused ? m.play() : m.pause();
}

// Dad Quotes
const quotes=[ "Son, always show up...","Kindness is strength","Never stop learning",
  "Quiet strength speaks","Fear regret, not failure","Real > perfect","Step by step"];
function generateQuote(){
  document.getElementById("dad-quote").textContent=quotes[Math.floor(Math.random()*quotes.length)];
}

// ===================================
// 🎮 RPG — Core Logic & Upgrades

// Preload assets
const imgs = {
  player: new Image(), ascend: new Image(),
  clone: new Image(), slash: new Image()
};
imgs.player.src="assets/player.png";
imgs.ascend.src="assets/player_ascend.png";
imgs.clone.src="assets/clone.png";
imgs.slash.src="assets/slash.png";
const enemyImgs = ["assets/enemy1.png","assets/enemy2.png","assets/boss.png"]
  .map(p => {let i=new Image();i.src=p; return i;});

// State vars
let currentWave=0, level=1, xp=0, nextLvXp=100, isAsc=false;
let playerHP=100, enemyHP=0;

// Intro dialog
const introLines=["This Father's Day...","A war begins.","Dad must rise."];
let introIdx=0;
function showIntro(){
  const ov=document.getElementById("introOverlay"), txt=document.getElementById("introText");
  ov.style.display="flex"; txt.textContent=introLines[introIdx++];
  ov.onclick = ()=>{
    if(introIdx<introLines.length) txt.textContent=introLines[introIdx++];
    else{ ov.style.display="none"; startRPGGame(); }
  };
}
window.onload=showIntro;

// UI setup
function setupUI(){
  document.getElementById("skills").style.display="block";
  ["summonBtn","potionBtn","ascendBtn"].forEach(id=>{
    document.getElementById(id).onclick = ()=>useSkill(id);
  });
}

// Start
function startRPGGame(){
  document.getElementById("rpg-game").style.display="block";
  document.getElementById("rpgMusic").play();
  setupUI(); nextWave(); initRPG();
}

// Start waves
function nextWave(){
  enemyHP=50 + currentWave*50;
  document.getElementById("xpBar").max = nextLvXp;
  alert(`Wave ${(currentWave+1)}: Fight the ${
    ["Chore Imp","Laundry Lord","Shadow of Doubt"][currentWave]
  }!`);
  currentWave++;
}

// Skill handler
function useSkill(id){
  if(enemyHP<=0||playerHP<=0) return;
  let dmg=0;
  if(id=="summonBtn"){ dmg=30; xp+=30; }
  else if(id=="potionBtn"){ playerHP=Math.min(playerHP+50,100+20*(level-1)); alert("Healed!"); }
  else if(id=="ascendBtn" && !isAsc){ isAsc=true; alert("💠 Ascended!"); }
  checkXP(); enemyHP-=dmg;
}

// XP & Level
function checkXP(){
  xp = Math.max(0,xp);
  document.getElementById("xpBar").value=xp;
  if(xp >= nextLvXp){
    xp-=nextLvXp; level++; nextLvXp+=50;
    playerHP+=20; alert(`Level Up! Lv ${level}`);
  }
}

// Main loop
function initRPG(){
  const c=document.getElementById("rpgCanvas"), ctx=c.getContext("2d");
  c.onclick = ()=>{
    if(enemyHP<=0||playerHP<=0) return;
    const baseDmg = isAsc ? rand(30,50) : rand(15,25);
    enemyHP-=baseDmg; playerHP-=rand(5,15); xp+=10;
    checkXP();
    if(enemyHP<=0){
      if(currentWave<3) nextWave();
      else alert("🏆 Final Victory! Dad's Legacy Secured!");
    }
  };
  setInterval(()=>{
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle="#111"; ctx.fillRect(0,0,c.width,c.height);
    const img = isAsc ? imgs.ascend : imgs.player;
    ctx.drawImage(img,50,150,80,80);
    ctx.drawImage(enemyImgs[Math.min(currentWave-1,2)],600,150,80,80);
    ctx.drawImage(imgs.slash,600,150,80,80);
    // HP bars
    ctx.fillStyle="#0f0"; ctx.fillRect(50,130,playerHP,10);
    ctx.fillStyle="#f00"; ctx.fillRect(600,130,enemyHP,10);
    ctx.fillStyle="#fff"; ctx.font="16px Arial";
    ctx.fillText(`Lvl ${level}`,50,120);
  },1000/30);
}
function rand(a,b){return Math.floor(Math.random()*(b-a)+a);}

// … (all earlier code stays) …

// Voice lines
const voiceLines = {
  attack: new Audio('assets/voice_attack.mp3'),
  clone: new Audio('assets/voice_clone.mp3'),
  ascend: new Audio('assets/voice_ascend.mp3'),
  finalBoss: new Audio('assets/voice_finalboss.mp3')
};

// Final boss music & cinematic
const finalBossTheme = new Audio('assets/final_boss_theme.mp3');

// In nextWave(), before alert on wave 3:
function nextWave(){
  enemyHP = 50 + currentWave*50;
  document.getElementById("xpBar").max = nextLvXp;
  if(currentWave === 2){
    finalBossTheme.play();
    voiceLines.finalBoss.play();
    showCinematic("⚔️ Final Boss Approaching… Brace yourself!");
  }
  alert(`Wave ${currentWave+1}: Fight the ${
    ["Chore Imp","Laundry Lord","Shadow of Doubt"][currentWave]
  }!`);
  currentWave++;
}

// Cinematic display:
function showCinematic(text){
  const ov = document.getElementById("cinematicOverlay");
  ov.style.display = "flex";
  ov.firstElementChild.textContent = text;
  setTimeout(()=> ov.style.display = "none", 3000);
}

// Modify useSkill() to play voice:
function useSkill(id){
  if(enemyHP<=0||playerHP<=0) return;
  if(id=="summonBtn"){
    enemyHP-=30; xp+=30;
    voiceLines.clone.play();
  }
  else if(id=="potionBtn"){
    playerHP=Math.min(playerHP+50,100+20*(level-1));
    alert("Healed!"); voiceLines.attack.play();
  }
  else if(id=="ascendBtn" && !isAsc){
    isAsc=true;
    voiceLines.ascend.play();
    alert("💠 Ascended!");
  }
  checkXP(); enemyHP-=0;
}

// In canvas click (attack)
c.onclick = ()=>{
  if(enemyHP<=0||playerHP<=0) return;
  const dmg = isAsc ? rand(30,50) : rand(15,25);
  enemyHP -= dmg; playerHP -= rand(5,15);
  xp += 10; checkXP();
  voiceLines.attack.play();
  if(enemyHP<=0){
    // …
  }
};

// rand() etc continues…
