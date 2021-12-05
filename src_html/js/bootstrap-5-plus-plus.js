let images = document.getElementsByTagName(`img`);
let unloadedDivs = document.getElementsByClassName(`oteeddho-unloaded-div`);
let spinner = document.getElementById(`oteeddho-spinner`);

let interval = setInterval(() => {
  if (hasAllTheImagesBeenLoaded()) {
    for (let div of unloadedDivs) {
      div.classList.remove(`oteeddho-unloaded-div`);
    }
    spinner.classList.add(`oteeddho-unloaded-div`);
    clearInterval(interval);
  }
}, 100);

function hasAllTheImagesBeenLoaded() {
  for (let image of images) {
    if (!image.complete) return false;
  }
  return true;
}
