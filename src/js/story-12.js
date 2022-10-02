startStory12();

function startStory12() {
  let randomMarginLeftParagraphs = Array.from(
      document.getElementsByClassName(`12-rmlp`));
  /**
   * The paragraphs having random margins are already inside a div of 7.5% margin.
   * So the if we want the largest margin to be x%, we have to set the variable
   * to x-7.5.
   */
  let largestRandomMargin = 30;

  randomMarginLeftParagraphs.forEach(para => {
    let randomLeftMargin = Math.random() * largestRandomMargin;
    para.style.marginLeft = `${randomLeftMargin}%`;
  });
}
