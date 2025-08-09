import { hide, show } from "../utils/AnimationUtils";
import loader from "./Loader";

const cards = document.querySelector("[data-grid-layout]");

const iframeModal = document.querySelector("[data-iframe-modal]");
const ProjectIframe = iframeModal.querySelector("iframe");
const iframeModalTitle = iframeModal.querySelector(".project-title");
const closeIframeBtn = iframeModal.querySelector("[data-close-iframe]");

function openIframeModal(e) {
	const invalidTarget = e.target.closest(".btn-primary");
	const validTarget = e.target.closest(".card");

	if (invalidTarget) return;

	if (!validTarget) return;

	const projectUrl = validTarget.dataset.projectPreview;
	const projectTitle = validTarget.dataset.projectTitle;

	show(iframeModal, "fade-in", "fade-out");
	getProjectURL(projectUrl);
	getProjectTitle(projectTitle);

	document.body.classList.add("overflow-hidden");
}

function closeIframeModal() {
	hide(iframeModal, "fade-in", "fade-out");

	ProjectIframe.src = "";

	document.body.classList.remove("overflow-hidden");
}

function getProjectURL(url) {
	loader(iframeModal, true);

	ProjectIframe.onload = () => loader(iframeModal, false);

	ProjectIframe.onerror = () => {
		console.error("Failed to load project URL:", url);
		ProjectIframe.src = "";
		loader(iframeModal, false);
	};

	ProjectIframe.src = url;
}

const getProjectTitle = (title) => (iframeModalTitle.textContent = title);

/* ******************************************************************** */

cards.addEventListener("click", openIframeModal);
closeIframeBtn.addEventListener("click", closeIframeModal);
