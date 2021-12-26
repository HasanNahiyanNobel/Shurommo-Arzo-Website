startBeta();

function startBeta() {
  let testDiv = document.getElementById(`test-div`);

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
