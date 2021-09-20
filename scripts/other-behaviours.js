const html = document.documentElement;
const nothingGotCopiedMessage = `কিছুই কপি হয়নি! :3`;

/**
 * Listener to prevent copying texts.
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
 */
html.addEventListener(`copy`, event => {
	// const selection = document.getSelection();
	swal({
		title: `😒`,
		text: `এত সহজে কপি করা যায়?`,
		button: false,
	});
	event.clipboardData.setData(`text/plain`, nothingGotCopiedMessage);
	event.preventDefault();
});

/**
 * Listener to prevent copy by dragging.
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event
 */
document.addEventListener(`dragstart`, event => {
	event.dataTransfer.setData(`text`, nothingGotCopiedMessage);
});
