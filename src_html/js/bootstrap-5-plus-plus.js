startMain();

function startMain() {
  // Define variables
  let images = document.getElementsByTagName(`img`);
  let mainDiv = document.getElementById(`md`);
  let spinner = document.getElementById(`ms`);

  // Function to check whether all the images has been loaded
  function hasAllTheImagesBeenLoaded() {
    for (let image of images) {
      if (!image.complete) return false;
    }
    return true;
  }

  // Schedule the interval
  let interval = setInterval(() => {
    if (hasAllTheImagesBeenLoaded()) {
      spinner.classList.add(`d-none`);
      mainDiv.classList.remove(`d-none`);
      clearInterval(interval);
    }
  }, 100);

  // As the interval works, make all the images disabled :3
  for (let image of images) {
    image.style.pointerEvents = `none`;
  }
}
