// Selector DOM
const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let colorInterval = null;

// Btn "stop" disablet
refs.stop.setAttribute('disabled', true);

// Random color function
function getRandomHexColor() {
  return (refs.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  )
    .toString(16)
    .padStart(6, 0)}`);
}
// Add an event listener
refs.start.addEventListener('click', startClick);
refs.stop.addEventListener('click', stopClick);

// Start function
function startClick() {
  refs.start.setAttribute('disabled', true);
  refs.stop.removeAttribute('disabled');
  colorInterval = setInterval(() => {
    getRandomHexColor();
  }, 1000);
}

// Stop function
function stopClick() {
  clearInterval(colorInterval);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', true);
}
