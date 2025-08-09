function show(elm, showClass, hideClass) {
	elm.classList.remove(hideClass);
	elm.classList.add(showClass);
	elm.hidden = false;

	elm.addEventListener(
		"animationend",
		() => {
			elm.hidden = false;
		},
		{ once: true },
	);
}

function hide(elm, showClass, hideClass) {
	elm.classList.remove(showClass);
	elm.classList.add(hideClass);

	elm.addEventListener(
		"animationend",
		() => {
			elm.hidden = true;
		},
		{ once: true },
	);
}

export { show, hide };
