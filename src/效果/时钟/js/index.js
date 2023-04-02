function initClock() {
  const clock = document.querySelector('.clock');
  const { hours, minutes, seconds } = getCurrentTime();
  clock.style.setProperty('--seconds', seconds);
  clock.style.setProperty('--minutes', minutes + seconds / 60);
  clock.style.setProperty('--hours', hours + minutes / 60 + seconds / 3600);
}

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { hours, minutes, seconds };
}

initClock();
