startBeta();

function startBeta() {
  drawCircles();
  drawAnimatedRectangle();

  function drawCircles() {
    let circleDiv = document.getElementById(`beta-circle-div`);

    let width = 64;
    let colour1 = `rgba(0, 133, 176, 0.5)`;
    let colour2 = `rgba(176, 0, 0, 0.5)`;

    let circle1 = getCircleAsString(width, width, width, colour1);
    let circle2 = getCircleAsString(width - width / 2, width, width, colour2);

    circleDiv.innerHTML += circle1;
    circleDiv.innerHTML += circle2;

    function getCircleAsString(cx, cy, radius, colour) {
      return `<svg xmlns="http://www.w3.org/2000/svg" 
                width="${2 * radius}" height="${2 * radius}"
                class="bi bi-circle-fill">
                <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${colour}"/>
              </svg>`;
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
