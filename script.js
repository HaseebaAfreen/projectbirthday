function playMusic() {
  document.getElementById("bdaySong").play();
  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 8 + 2,
      speedY: Math.random() * 3 + 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fill();
      p.y += p.speedY;
      if (p.y > canvas.height) p.y = 0;
    }
    requestAnimationFrame(draw);
  }

  draw();
}

// 🎠 Carousel logic
const images = ["images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg"];
let index = 0;
const imgTag = document.getElementById("carouselImage");

setInterval(() => {
  index = (index + 1) % images.length;
  imgTag.style.opacity = 0;
  setTimeout(() => {
    imgTag.src = images[index];
    imgTag.style.opacity = 1;
  }, 300);
}, 3000);

// ⏳ Countdown to birthday
const countdown = document.getElementById("countdown");
const unlockMessage = document.getElementById("unlockMessage");

// 🎂 Set your birthday date here:
const birthdayDate = new Date("2025-06-25T00:00:00").getTime();

const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = birthdayDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.innerHTML = `⏳ ${days}d ${hrs}h ${mins}m ${secs}s until your day!`;
  } else {
    clearInterval(x);
    countdown.innerHTML = "🎂 It's your birthday!";
    unlockMessage.classList.remove("hidden");
  }
}, 1000);
