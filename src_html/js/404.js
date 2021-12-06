start404();

function start404() {
  // Add transition to body
  let bodyStyle = document.body.style;
  bodyStyle.transition = `color 10s linear`;

  // Schedule timeouts
  setTimeout(() => {
    bodyStyle.color = `#FFF`;
  }, 1);
  setTimeout(() => {
    window.location.href = `index.html`;
  }, 12000);
}
