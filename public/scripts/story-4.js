// Constants and variables
const image = document.getElementById(`image`);
const postImage = document.getElementById(`post-image`);
const navbar = document.getElementById(`navbar`);

const imageTransformation = `-8vw`;
const postImageTransformation = `-12vw`;
const transitionTimeBG = `10s`;
const transitionTimeText = `8s`;

const bgColour = `#0e1e2a`;

image.style.transform = `translate(0, ${imageTransformation})`;
postImage.style.transform = `translate(0, ${postImageTransformation})`;

navbar.style.transition = `background-color ${transitionTimeBG}, color ${transitionTimeText}`;
document.body.style.transition = `background-color ${transitionTimeBG}, color ${transitionTimeText}`;

setTimeout(() => {
  navbar.classList.remove(`bg-dark`);
  navbar.style.background = bgColour;
  document.body.style.backgroundColor = bgColour;
  document.body.classList.add(`text-light`);
}, 0);
