function loader(parent, isLoading = false) {
	const existingLoader = parent.querySelector(".loader");

	if (!isLoading) {
		if (existingLoader) {
			existingLoader.remove();
		}
		// Reset parent styles to original values
		parent.style.position = "";
		parent.style.overflow = "";
		return;
	}

	if (existingLoader) return;

	const loader = document.createElement("div");
	loader.className = "loader absolute inset-0 bg-black/80 flex justify-center items-center rounded-[inherit] z-50";
	loader.innerHTML = `<div class="animate-spin size-12 border-3 border-solid border-primary-500 rounded-full border-r-transparent"></div>`;

	const parentStyles = getComputedStyle(parent);

	if (parentStyles.position !== "absolute" && parentStyles.position !== "static" && parentStyles.position !== "fixed") {
		parent.style.position = "relative";
		parent.style.overflow = "hidden";
	}

	parent.append(loader);
}

export default loader;
