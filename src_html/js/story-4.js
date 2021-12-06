startStory4();

function startStory4() {
  // Define variables
  let navbar = document.getElementsByTagName(`nav`)[0];
  let body = document.body;
  let navbarTransitionTime = `4000ms`;
  let bodyTransitionTime = navbarTransitionTime;
  let transitionSpeedCurve = ``; // `ease` by default
  let changedBackgroundColour = `#1f2a33`;

  // Add transitions
  navbar.style.transition = `background-color ${navbarTransitionTime} ${transitionSpeedCurve}`;
  body.style.transition = `background-color ${bodyTransitionTime} ${transitionSpeedCurve}, color ${bodyTransitionTime} ${transitionSpeedCurve}`;

  // Add scroll listener
  document.addEventListener(`scroll`, scrollListener);

  // Implement scroll listener
  function scrollListener() {
    navbar.classList.remove(`bg-dark`);
    navbar.style.backgroundColor = changedBackgroundColour;
    body.style.backgroundColor = changedBackgroundColour;
    body.style.color = `#fff`;
    document.removeEventListener(`scroll`, scrollListener);
  }
}
