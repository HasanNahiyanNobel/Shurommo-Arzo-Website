startBeta();

function startBeta() {
  drawCircles();
  drawAnimatedRectangle();

  function drawCircles() {
    // Get the div of circle
    // noinspection DuplicatedCode
    let circleDiv = document.getElementById(`beta-circle-div`);

    // Get vh and vw. Taken from: https://stackoverflow.com/a/8876069
    let vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0);
    let vw = Math.max(document.documentElement.clientWidth || 0,
        window.innerWidth || 0);

    // Define pseudo constants
    let width = vw / 4;
    console.log(width);
    let colour1 = `rgba(0, 133, 176, 0.5)`;
    let colour2 = `rgba(176, 0, 0, 0.5)`;
    let colour3 = `rgba(0, 176, 41, 0.5)`;

    let circle1 = getCircleAsString(width, colour1);
    let circle2 = getCircleAsString(width, colour2);
    let circle3 = getCircleAsString(width, colour3);

    circleDiv.innerHTML += circle1;
    circleDiv.innerHTML += circle2;
    circleDiv.innerHTML += circle3;

    function getCircleAsString(radiusInVW, colour) {
      return `<i class="bi bi-circle-fill"
                style="font-size: ${radiusInVW}vw; color: ${colour};">
              </i>`;
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
