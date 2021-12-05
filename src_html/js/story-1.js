start();

function start() {
  let body = document.body;
  let navbar = document.getElementsByTagName(`nav`)[0];
  let graphics = document.getElementById(`graphics-main-shahorik`);
  let navbarHeight = navbar.offsetHeight;
  let vh = Math.max(document.documentElement.clientHeight || 0,
      window.innerHeight || 0); // Taken from: https://stackoverflow.com/a/8876069

  window.onscroll = function() {
    let graphicsPos = graphics.getBoundingClientRect();
    let currentTop = Math.round(graphicsPos.top) - navbarHeight;
    let navbarTransitionTime = `1000ms`;
    let bodyTransitionTime = `5000ms`;

    // Add transitions
    navbar.style.transition = `background-color ${navbarTransitionTime} linear`;
    body.style.transition = `background-color ${bodyTransitionTime} linear`;

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
  };
}
