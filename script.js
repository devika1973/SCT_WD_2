let [ms, sec, min, hr] = [0, 0, 0, 0];
let timer = null;

const timerDisplay = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

const sounds = {
  start: document.getElementById("start-sound"),
  pause: document.getElementById("pause-sound"),
  stop: document.getElementById("stop-sound"),
  lap: document.getElementById("lap-sound"),
  reset: document.getElementById("reset-sound")
};

function playSound(sound) {
  if (!sound) return;
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch((err) => {
    console.warn("Audio playback blocked:", err);
  });
}

function updateDisplay() {
  let h = hr < 10 ? "0" + hr : hr;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let mill = ms < 10 ? "0" + ms : ms;
  timerDisplay.innerText = `${h}:${m}:${s}:${mill}`;
}

function stopwatch() {
  ms++;
  if (ms === 100) {
    ms = 0;
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
      if (min === 60) {
        min = 0;
        hr++;
      }
    }
  }
  updateDisplay();
}

function startStop() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 10);
  playSound(sounds.start);
}

function pause() {
  clearInterval(timer);
  timer = null;
  playSound(sounds.pause);
}

function stop() {
  pause();
  [ms, sec, min, hr] = [0, 0, 0, 0];
  updateDisplay();
  playSound(sounds.stop);
}

function reset() {
  stop();
  clearLaps();
  playSound(sounds.reset);
}

function lap() {
  if (timer === null) return;
  const li = document.createElement("li");
  li.innerText = `Lap ${lapsContainer.children.length + 1}: ${timerDisplay.innerText}`;
  lapsContainer.appendChild(li);
  playSound(sounds.lap);
}

function clearLaps() {
  lapsContainer.innerHTML = "";
}

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    toggleBtn.innerText = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.innerText = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  }
}

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
    toggleBtn.innerText = "🌙 Dark Mode";
  } else {
    toggleBtn.innerText = "☀️ Light Mode";
  }
};
document.getElementById("start-sound").play().catch(console.error)

const buttons = document.querySelectorAll(".buttons button");
function playSound(sound) {
  if (!sound) return;
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(e => console.log("Sound error:", e));
}

function setActiveButton(activeBtn) {
  buttons.forEach(btn => {
    if (btn === activeBtn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function startStop() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 10);
  setActiveButton(document.querySelector(".buttons button:nth-child(1)")); // Start button
  sounds.start.play();
}

function pause() {
  clearInterval(timer);
  timer = null;
  setActiveButton(document.querySelector(".buttons button:nth-child(2)")); // Pause button
  sounds.pause.play();
}

function stop() {
  pause();
  [ms, sec, min, hr] = [0, 0, 0, 0];
  updateDisplay();
  setActiveButton(document.querySelector(".buttons button:nth-child(3)")); // Stop button
  sounds.stop.play();
}

function reset() {
  stop();
  clearLaps();
  setActiveButton(document.querySelector(".buttons button:nth-child(4)")); // Reset button
  sounds.reset.play();
}
