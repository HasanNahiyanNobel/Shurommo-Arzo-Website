startStory4();

function startStory4() {
  // Define variables
  let navbar = document.getElementsByTagName(`nav`)[0];
  let body = document.body;
  let graphics = document.getElementById(`4-graphics`);
  let navbarHeight = navbar.offsetHeight;
  let navbarTransitionTime = `3000ms`;
  let bodyTransitionTime = navbarTransitionTime;
  let changedBackgroundColour = `#17222d`;

  // Add transitions
  navbar.style.transition = `background-color ${navbarTransitionTime} linear`;
  body.style.transition = `background-color ${bodyTransitionTime} linear, color ${bodyTransitionTime} linear`;

  window.onscroll = function() {
    let graphicsPos = graphics.getBoundingClientRect();
    let currentTop = Math.round(graphicsPos.top) - navbarHeight;

    // When image touches the navbar, initiate the change of colour
    if (currentTop < 0) {
      navbar.classList.remove(`bg-dark`);
      navbar.style.backgroundColor = changedBackgroundColour;
      body.style.backgroundColor = changedBackgroundColour;
      body.style.color = `#fff`;
    }
  };
}
