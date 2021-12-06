startMain();

function startMain() {
  let images = document.getElementsByTagName(`img`);
  let mainDiv = document.getElementById(`md`);
  let spinner = document.getElementById(`ms`);

  let interval = setInterval(() => {
    if (hasAllTheImagesBeenLoaded()) {
      spinner.classList.add(`d-none`);
      mainDiv.classList.remove(`d-none`);
      clearInterval(interval);
    }
  }, 100);

  function hasAllTheImagesBeenLoaded() {
    for (let image of images) {
      if (!image.complete) return false;
    }
    return true;
  }

}
