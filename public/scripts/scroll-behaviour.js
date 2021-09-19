const body = document.body;
// const html = document.documentElement;

// const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); // বিপদের দিনে এই জিনিস হয়তো সাহায্য করতে পারে। :3
// const pageHeight = body.offsetHeight;

const navbar = document.getElementById(`main-navbar`);
const navbarHeight = navbar.offsetHeight;

const navWrapper = document.getElementById(`main-nav-wrapper`);

const graphics = document.getElementById(`graphics-main`);
// const graphicsStartPos = graphics.offsetTop - navbarHeight;
// const graphicsHeight = graphics.offsetHeight;

/*console.log(`Graphics start: ${graphicsStartPos}`);
console.log(`Graphics end: ${graphicsStartPos + graphicsHeight}`);
console.log(`Page height: ${body.offsetHeight}`);*/

window.onscroll = function() {
	let graphicsPos = graphics.getBoundingClientRect();
	let currentTop = Math.round(graphicsPos.top) - navbarHeight;
	// let currentBottom = Math.round(graphicsPos.bottom) - navbarHeight;

	// console.log(`Current: ${currentTop}, ${currentBottom}`);

	if (currentTop < 0) {
		navWrapper.style.backgroundColor = `#fbc02d`; // yellow darken-2
		body.style.backgroundColor = `#fff9c4`; // yellow lighten-4
	}
};

window.onscroll(undefined);
