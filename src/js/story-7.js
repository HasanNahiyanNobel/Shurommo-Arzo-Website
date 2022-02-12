startStory7();

function startStory7() {

  // Trigger the modal of info
  setTimeout(() => {
    // document.getElementById(`7-mt`).click(); // TODO: Uncomment this
  }, 150);


  // Define pseudo-constants
  let bgColor = `#e8e0d2`;
  let transitionTime = `2s`;
  let transitionSpeedCurve = `linear`; // `ease` by default
  let isBGColoured = false;


  // Get document elements
  let body = document.body;
  let hiddenSpan = document.getElementById(`8-ht`);


  // Ensure that the background and hidden text has the same colours
  body.style.backgroundColor = `#fff`;
  hiddenSpan.style.color = `#fff`;


  // Add transitions
  body.style.transition = `background-color ${transitionTime} ${transitionSpeedCurve}`;
  hiddenSpan.style.transition = `color ${transitionTime} ${transitionSpeedCurve}`;


  // Change the colours
  setInterval(() => {
    switchColours();
  }, 2000);


  // Function to switch the colours
  function switchColours() {
    if (isBGColoured) {
      body.style.backgroundColor = `#fff`;
      hiddenSpan.style.color = `#fff`;
    } else {
      body.style.backgroundColor = bgColor;
      hiddenSpan.style.color = bgColor;
    }
    isBGColoured = !isBGColoured;
  }

}
