startBeta();

function startBeta() {
  drawCircles();
  drawAnimatedRectangle();

  function drawCircles() {
    // Calculate vw and vh. Taken from: https://stackoverflow.com/a/8876069
    let vw = Math.max(document.documentElement.clientWidth || 0,
        window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0);

    if (vw < vh) {
      console.log(`Mobile view`);
    } else {
      console.log(`Desktop view`);
    }

    // Get the div of circle
    let circleDiv = document.getElementById(`beta-circle-div`);

    // Create image elements
    let circle = document.createElement(`img`);
    circle.src = `images/circles-beta-01.svg`;
    circle.width = vh * .8;

    // Append images to the document
    circleDiv.append(circle);
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
