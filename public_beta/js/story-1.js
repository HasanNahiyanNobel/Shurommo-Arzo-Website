// JS to show spinner until the image is loaded
let spinner = document.getElementById(`oteeddho-spinner`);
let unloadedDivs = document.getElementsByClassName(`oteeddho-unloaded-div`);
let image = document.getElementById(`graphics-main-shahorik`);

let interval = setInterval(() => {
    if (image.complete) {
        for (let aDiv of unloadedDivs) {
            aDiv.classList.remove(`oteeddho-unloaded-div`);
        }
        spinner.classList.add(`oteeddho-unloaded-div`);
        clearInterval(interval);
        handler();
    }
}, 100);

// The handler function after the image is loaded
function handler() {
    // Define constants
    const body = document.body;
    const navbar = document.getElementsByTagName(`nav`)[0];
    const graphics = document.getElementById(`graphics-main-shahorik`);
    const navbarHeight = navbar.offsetHeight;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // Taken from: https://stackoverflow.com/a/8876069
    const navbarTransitionTime = `1000ms`;
    const bodyTransitionTime = `5000ms`;

    // Add transition style to navbar and body
    navbar.style.transition = `background-color ${navbarTransitionTime} linear`;
    body.style.transition = `background-color ${bodyTransitionTime} linear`;

    window.onscroll = function () {
        let graphicsPos = graphics.getBoundingClientRect();
        let currentTop = Math.round(graphicsPos.top) - navbarHeight;

        // When the image comes halfway through the viewport, we see the change of colour
        if (currentTop < vh / 2) {
            navbar.classList.remove(`bg-dark`)
            navbar.style.backgroundColor = `#fbc02d`; // yellow darken-2
            body.style.backgroundColor = `#fff9c4`; // yellow lighten-4
        } else {
            body.style.backgroundColor = ``;
            navbar.style.backgroundColor = ``;
            navbar.classList.add(`bg-dark`);
        }
    };
}
