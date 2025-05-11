const reset = document.querySelector(".reset-container");
const start = document.querySelector(".start-container");
const textElement = start.querySelector(".btn-text");
const time = document.querySelector(".time-stamp-container");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");
const timeList = document.querySelector('.time-stamp-list');

const btns = document.querySelectorAll(".btn");

const themeBtn = document.getElementById("theme-btn");
const body = document.body;

let isRunning = false;
let timerInterval;
let elapsedTime = 0;
let startTime = 0;

function startBtn() {
  const imgElement = document.querySelector(".start-container > img");

  if (isRunning) {
    clearInterval(timerInterval);
    imgElement.src = "./images/start.svg";
    textElement.textContent = 'Start';
    isRunning = false;
    elapsedTime += Date.now() - startTime;
  } else {
    imgElement.src = "./images/pause.svg";
    textElement.textContent = 'Pause';
    isRunning = true;
    
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      const now = Date.now();
      let elapsed = now - startTime; 

      let ms = Math.floor((elapsed % 1000) / 10); 
      let secs = Math.floor((elapsed / 1000) % 60);
      let mins = Math.floor((elapsed / (1000 * 60)) % 60);
      let hrs = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

      hours.textContent = String(hrs).padStart(2, '0');
      minutes.textContent = String(mins).padStart(2, '0');
      seconds.textContent = String(secs).padStart(2, '0');
      milliseconds.textContent = String(ms).padStart(2, '0');
    }, 10);
  }
}

function resetBtn() {
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
  milliseconds.textContent = '00';
  timeList.innerHTML = '';

  clearInterval(timerInterval); 
  isRunning = false;
  elapsedTime = 0; 

  const imgElement = document.querySelector(".start-container > img");
  imgElement.src = "./images/start.svg";
}

function timeBtn() {
  const div = document.createElement('div');
  div.style.margin = '1rem';
  div.style.padding = '1rem';
  div.style.border = 'solid 1px #00ffff71';
  div.style.borderRadius = '.5rem';

  const hSpan = document.createElement('span');
  hSpan.textContent = hours.textContent;
  
  const mSpan = document.createElement('span');
  mSpan.textContent = minutes.textContent;
  
  const sSpan = document.createElement('span');
  sSpan.textContent = seconds.textContent;
  
  const msSpan = document.createElement('span');
  msSpan.textContent = milliseconds.textContent;
  
  const sep1 = document.createElement('span');
  sep1.textContent = ' : ';
  const sep2 = document.createElement('span');
  sep2.textContent = ' : ';
  const sep3 = document.createElement('span');
  sep3.textContent = ' : ';
  
  div.appendChild(hSpan);
  div.appendChild(sep1);
  div.appendChild(mSpan);
  div.appendChild(sep2);
  div.appendChild(sSpan);
  div.appendChild(sep3);
  div.appendChild(msSpan);
  
  timeList.appendChild(div);
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnType = btn.className.split(" ")[1].split("-")[0];

    if (btnType === "reset") {
      resetBtn();
    } else if (btnType === "start") {
      startBtn();
    } else if (btnType === "time") {
      timeBtn();
    }
  });
});

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    themeBtn.textContent = "🌙";
  } else {
    themeBtn.textContent = "☀️"; 
  }
});
