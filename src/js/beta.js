startBeta();

function startBeta() {
  drawCircles();
  drawAnimatedRectangle();

  function drawCircles() {
    // Define pseudo constants
    let numberOfCircles = 5;

    // Get document elements
    let navbar = document.getElementById(`mn`); // Main navbar
    let circleDiv = document.getElementById(`beta-circle-div`);

    // Calculate vw and vh. Taken from: https://stackoverflow.com/a/8876069
    let vw = Math.max(document.documentElement.clientWidth || 0,
        window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0);

    // Calculate width of circle
    let circleWidth;
    let isDesktopView = vw > vh;
    if (isDesktopView) {
      circleWidth = vh / numberOfCircles;
    } else {
      circleWidth = vw / numberOfCircles;
    }

    // Calculate pseudo constants
    let maxMarginLeft = vw - circleWidth - convertRemToPixels(1.5); // Fluid container has 0.75 rem margins in both left and right
    let maxMarginTop = vh - circleWidth - navbar.offsetHeight -
        convertRemToPixels(1); // Navbar has 1 rem margin at bottom

    // Draw circles
    for (let i = 0; i < numberOfCircles; i++) {
      // Create circle as an image element
      let circle = document.createElement(`img`);
      circle.src = `images/circles-beta-0${i + 1}.svg`;
      circle.width = circleWidth;
      circle.style.position = `absolute`;
      circle.style.marginLeft = `${Math.random() * maxMarginLeft}px`;
      circle.style.marginTop = `${Math.random() * maxMarginTop}px`;
      circle.style.pointerEvents = `none`;
      circle.classList.add(`noselect`);

      // Append circle to the document
      circleDiv.append(circle);
    }

    function convertRemToPixels(rem) {
      /**
       * Taken from: https://stackoverflow.com/a/42769683
       */
      return rem *
          parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
  }

  function drawAnimatedRectangle() {
    let testDiv = document.getElementById(`beta-test-div`);

    let transitionTime = 1000;
    let height = 50;
    let increment = 50;
    let maxHeight = 500;

    testDiv.style.height = `${height}px`;
    testDiv.style.backgroundColor = `#222`;
    testDiv.style.transition = `height ${transitionTime}ms linear`;

    setTimeout(callback, 200);
    setInterval(callback, transitionTime);

    function callback() {
      height = (height + increment) % maxHeight;
      testDiv.style.height = `${height}px`;
    }
  }
}
