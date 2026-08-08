/* ============================================================
   QTIEN // PROFILE — script.js
   Sửa các giá trị trong CONFIG bên dưới để tuỳ chỉnh nội dung.
   ============================================================ */

const CONFIG = {
  name: "Qtien",
  typedLines: [
    "vibe coder // game enthusiast",
    "16 tuổi, quê ở Quảng Nam",
    "đang học cách biến ý tưởng thành code"
  ],
  skills: [
    { label: "CODE",     value: 10 },
    { label: "DESIGNER", value: 5  },
    { label: "DEBUG",    value: 20 },
    { label: "Ý_TƯỞNG",  value: 65 },
    { label: "VIBE_CODE",value: 99 }
  ],

  /* Danh sách script hiển thị ở khu SCRIPT.
     title = tên game/tên script (hiện ở đầu thẻ)
     content = dán NGUYÊN VĂN nội dung script vào giữa cặp dấu `...`
     Thêm script mới: copy 1 khối { title:..., content:`...` } bên dưới, sửa lại, thêm dấu phẩy. */
  scripts: [
    {
      title: "Roblox Speed Script",
      content: `local player = game.Players.LocalPlayer
local char = player.Character or player.CharacterAdded:Wait()
local humanoid = char:WaitForChild("Humanoid")

humanoid.WalkSpeed = 50

print("Speed boost activated!")`
    },
    {
      title: "Minecraft Auto Farm",
      content: `function autoFarm() {
  const crops = ["wheat", "carrot", "potato"];
  crops.forEach(crop => {
    harvest(crop);
    replant(crop);
  });
}

setInterval(autoFarm, 5000);`
    },
    {
      title: "Web Scraper Cơ Bản",
      content: `import requests
from bs4 import BeautifulSoup

url = "https://example.com"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

titles = soup.find_all("h2")
for t in titles:
    print(t.get_text())`
    }
  ],

  contact: [
    { label: "GMAIL",   value: "lequoctienbtm@gmail.com", href: "mailto:lequoctienbtm@gmail.com" },
    { label: "DISCORD", value: "tienzzzz_",                href: null }
  ]
};

/* ---------------- BOOT SEQUENCE ---------------- */

const bootLog = document.getElementById('boot-log');
const bootBtn = document.getElementById('boot-btn');
const bootScreen = document.getElementById('boot');

const bootLines = [
  { text: `> BOOTING PROFILE_OS v2.0...`, cls: 'dim' },
  { text: `> LOADING USER: ${CONFIG.name.toUpperCase()}`, cls: '' },
  { text: `> DECRYPTING PERSONAL_DATA.enc`, cls: 'dim' },
  { text: `> MOUNTING /skills /interests /scripts /contact`, cls: 'dim' },
  { text: `> ACCESS GRANTED`, cls: 'ok' }
];

async function typeLine(line){
  return new Promise(resolve=>{
    const p = document.createElement('div');
    if(line.cls) p.className = line.cls;
    bootLog.appendChild(p);
    let i = 0;
    const speed = 18;
    const timer = setInterval(()=>{
      p.textContent = line.text.slice(0, i+1);
      i++;
      if(i >= line.text.length){
        clearInterval(timer);
        setTimeout(resolve, 180);
      }
    }, speed);
  });
}

(async function runBoot(){
  for(const line of bootLines){
    await typeLine(line);
  }
  bootBtn.classList.remove('hidden');
})();

bootBtn.addEventListener('click', ()=>{
  bootScreen.classList.add('done');
  document.body.classList.add('unlocked');
  startAudio();
  setTimeout(initHeroTyping, 400);
  document.removeEventListener('keydown', onBootKey);
});

function onBootKey(e){
  if(e.key === 'Enter' && !bootBtn.classList.contains('hidden')){
    bootBtn.click();
  }
}
document.addEventListener('keydown', onBootKey);

/* ---------------- MATRIX RAIN (monochrome) ---------------- */

const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
let cols, drops;
const chars = "01アイウエオカキクケコ0101QTIEN101010";

function resizeRain(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 16);
  drops = new Array(cols).fill(0).map(()=> Math.random() * -50);
}
resizeRain();
window.addEventListener('resize', resizeRain);

function drawRain(){
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px "JetBrains Mono", monospace';
  for(let i=0;i<cols;i++){
    const char = chars[Math.floor(Math.random()*chars.length)];
    const x = i*16;
    const y = drops[i]*16;
    ctx.globalAlpha = Math.random()*0.5 + 0.15;
    ctx.fillText(char, x, y);
    ctx.globalAlpha = 1;
    if(y > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(drawRain);
}
drawRain();

/* ---------------- MENU ---------------- */

const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('menu-open');
});
document.querySelectorAll('#menu a').forEach(a=>{
  a.addEventListener('click', ()=> document.body.classList.remove('menu-open'));
});

/* ---------------- AUDIO ---------------- */

const audio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');

function startAudio(){
  audio.volume = 0.5;
  audio.play().catch(()=>{
    audioToggle.classList.add('muted');
  });
}
audioToggle.addEventListener('click', ()=>{
  if(audio.paused){
    audio.play().catch(()=>{});
    audioToggle.classList.remove('muted');
  } else {
    audio.pause();
    audioToggle.classList.add('muted');
  }
});

/* ---------------- HERO TYPED TEXT ---------------- */

function initHeroTyping(){
  const el = document.getElementById('typed');
  let lineIdx = 0, charIdx = 0, deleting = false;

  function tick(){
    const current = CONFIG.typedLines[lineIdx];
    if(!deleting){
      el.textContent = current.slice(0, charIdx+1);
      charIdx++;
      if(charIdx === current.length){
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx-1);
      charIdx--;
      if(charIdx === 0){
        deleting = false;
        lineIdx = (lineIdx+1) % CONFIG.typedLines.length;
      }
    }
    setTimeout(tick, deleting ? 22 : 42);
  }
  tick();
}

/* ---------------- SKILLS: LIST + RADAR CHART ---------------- */

function renderSkillsList(){
  const ul = document.getElementById('skills-list');
  CONFIG.skills.forEach(s=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="skill-top"><span>${s.label}</span><span class="val">${s.value}/100</span></div>
      <div class="skill-bar"><i style="width:0%" data-target="${s.value}"></i></div>
    `;
    ul.appendChild(li);
  });
}
renderSkillsList();

function drawRadar(progress){
  const canvas = document.getElementById('radar');
  const dpr = window.devicePixelRatio || 1;
  const size = canvas.clientWidth || 520;
  canvas.width = size*dpr; canvas.height = size*dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);

  const cx = size/2, cy = size/2;
  const radius = size*0.36;
  const n = CONFIG.skills.length;
  const levels = 4;

  ctx.clearRect(0,0,size,size);

  // grid rings
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 1;
  for(let l=1; l<=levels; l++){
    const r = radius * (l/levels);
    ctx.beginPath();
    for(let i=0;i<=n;i++){
      const angle = (Math.PI*2*i/n) - Math.PI/2;
      const x = cx + r*Math.cos(angle);
      const y = cy + r*Math.sin(angle);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
  }

  // axes + labels
  ctx.fillStyle = 'rgba(244,244,244,0.85)';
  ctx.font = `${size*0.026}px 'JetBrains Mono', monospace`;
  for(let i=0;i<n;i++){
    const angle = (Math.PI*2*i/n) - Math.PI/2;
    const x = cx + radius*Math.cos(angle);
    const y = cy + radius*Math.sin(angle);
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x,y); ctx.stroke();

    const lx = cx + (radius+size*0.075)*Math.cos(angle);
    const ly = cy + (radius+size*0.075)*Math.sin(angle);
    ctx.textAlign = Math.abs(Math.cos(angle))<0.15 ? 'center' : (Math.cos(angle)>0?'left':'right');
    ctx.textBaseline = Math.abs(Math.sin(angle))<0.15 ? 'middle' : (Math.sin(angle)>0?'top':'bottom');
    ctx.fillText(CONFIG.skills[i].label, lx, ly);
  }

  // data polygon (animated by progress 0..1)
  ctx.beginPath();
  CONFIG.skills.forEach((s,i)=>{
    const angle = (Math.PI*2*i/n) - Math.PI/2;
    const r = radius * (s.value/100) * progress;
    const x = cx + r*Math.cos(angle);
    const y = cy + r*Math.sin(angle);
    i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // vertex dots
  CONFIG.skills.forEach((s,i)=>{
    const angle = (Math.PI*2*i/n) - Math.PI/2;
    const r = radius * (s.value/100) * progress;
    const x = cx + r*Math.cos(angle);
    const y = cy + r*Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x,y,3,0,Math.PI*2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });
}

let radarAnimated = false;
function animateRadarIn(){
  if(radarAnimated) return;
  radarAnimated = true;
  const duration = 1100;
  const start = performance.now();
  function frame(now){
    const t = Math.min(1, (now-start)/duration);
    const eased = 1 - Math.pow(1-t, 3);
    drawRadar(eased);
    if(t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  document.querySelectorAll('.skill-bar i').forEach(bar=>{
    requestAnimationFrame(()=>{ bar.style.width = bar.dataset.target + '%'; });
  });
}
drawRadar(1); // static initial paint before animation trigger
window.addEventListener('resize', ()=> drawRadar(radarAnimated?1:0));

/* ---------------- SCROLL REVEALS ---------------- */

const revealTargets = document.querySelectorAll(
  '.about-grid, .skills-grid, .interest-grid, .contact-links, .section-head'
);
revealTargets.forEach(el=> el.classList.add('reveal'));

const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      if(entry.target.classList.contains('skills-grid')){
        animateRadarIn();
      }
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

revealTargets.forEach(el=> io.observe(el));

/* ---------------- SCRIPT SHOWCASE ---------------- */
/* Nội dung lấy thẳng từ CONFIG.scripts ở trên — không fetch file ngoài,
   nên mở bằng cách nào (double-click hay GitHub Pages) cũng hiện đủ. */

function loadScripts(){
  const track = document.getElementById('scripts-track');

  if(!CONFIG.scripts || CONFIG.scripts.length === 0){
    track.innerHTML = `<p class="scripts-empty">// chưa có script nào — thêm vào mảng CONFIG.scripts trong script1.js</p>`;
    return;
  }

  track.innerHTML = '';

  const cardObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); cardObserver.unobserve(e.target); }
    });
  }, { threshold: 0.15 });

  CONFIG.scripts.forEach(script=>{
    const card = document.createElement('div');
    card.className = 'script-card';

    card.innerHTML = `
      <div class="script-card-head">
        <span class="script-card-title">${escapeHtml(script.title)}</span>
        <button class="script-copy-btn" type="button">COPY</button>
      </div>
      <div class="script-card-body"><pre>${escapeHtml(script.content)}</pre></div>
    `;

    const copyBtn = card.querySelector('.script-copy-btn');
    copyBtn.addEventListener('click', ()=> copyToClipboard(script.content, copyBtn));

    track.appendChild(card);
    cardObserver.observe(card);
  });
}

function escapeHtml(str){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

async function copyToClipboard(text, btn){
  try{
    await navigator.clipboard.writeText(text);
  }catch(err){
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  const original = btn.textContent;
  btn.textContent = 'ĐÃ_SAO_CHÉP';
  btn.classList.add('copied');
  setTimeout(()=>{
    btn.textContent = original;
    btn.classList.remove('copied');
  }, 1600);
}

loadScripts();

/* ---------------- CONTACT ---------------- */

function renderContact(){
  const wrap = document.getElementById('contact-links');
  CONFIG.contact.forEach(c=>{
    const row = document.createElement('div');
    row.className = 'contact-row';
    const valueHtml = c.href
      ? `<a href="${c.href}">${escapeHtml(c.value)}</a>`
      : escapeHtml(c.value);

    row.innerHTML = `
      <div class="contact-row-main">
        <span class="contact-row-label">${c.label}</span>
        <span class="contact-row-value">${valueHtml}</span>
      </div>
      <button class="contact-copy-btn" type="button">COPY</button>
    `;
    row.querySelector('.contact-copy-btn').addEventListener('click', (e)=> copyToClipboard(c.value, e.target));
    wrap.appendChild(row);
  });
}
renderContact();
