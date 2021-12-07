startStory1();

function startStory1() {
  let body = document.body;
  let navbar = document.getElementById(`mn`);
  let graphics = document.getElementById(`1-g`);
  let navbarHeight = navbar.offsetHeight;
  let vh = Math.max(document.documentElement.clientHeight || 0,
      window.innerHeight || 0); // Taken from: https://stackoverflow.com/a/8876069
  let navbarTransitionTime = `1000ms`;
  let bodyTransitionTime = `5000ms`;
  let currentGraphicsPos = undefined;
  let currentTop = undefined;

  // Add transitions
  navbar.style.transition = `background-color ${navbarTransitionTime} linear`;
  body.style.transition = `background-color ${bodyTransitionTime} linear`;

  document.addEventListener(`scroll`, () => {
    // Get current graphics position and current top
    currentGraphicsPos = graphics.getBoundingClientRect();
    currentTop = Math.round(currentGraphicsPos.top) - navbarHeight;

    // When the image comes halfway through the viewport, we see the change of colour
    if (currentTop < vh / 2) {
      navbar.classList.remove(`bg-dark`);
      navbar.style.backgroundColor = `#fbc02d`; // yellow darken-2
      body.style.backgroundColor = `#fff9c4`; // yellow lighten-4
    } else {
      body.style.backgroundColor = ``;
      navbar.style.backgroundColor = ``;
      navbar.classList.add(`bg-dark`);
    }
  });
}
