startStory4();

function startStory4() {
  // Define variables
  let navbar = document.getElementsByTagName(`nav`)[0];
  let body = document.body;
  let navbarTransitionTime = `4000ms`;
  let bodyTransitionTime = navbarTransitionTime;
  let transitionSpeedCurve = ``; // `ease` by default
  let changedBackgroundColour = `#19222c`;

  // Add transitions
  navbar.style.transition = `background-color ${navbarTransitionTime} ${transitionSpeedCurve}`;
  body.style.transition = `background-color ${bodyTransitionTime} ${transitionSpeedCurve}, color ${bodyTransitionTime} ${transitionSpeedCurve}`;

  window.onscroll = function() {
    navbar.classList.remove(`bg-dark`);
    navbar.style.backgroundColor = changedBackgroundColour;
    body.style.backgroundColor = changedBackgroundColour;
    body.style.color = `#fff`;
  };
}
