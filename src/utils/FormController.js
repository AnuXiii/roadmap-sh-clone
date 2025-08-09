import emailjs from "@emailjs/browser";
import { show, hide } from "./AnimationUtils";
import newToast from "../components/Toast";
import loader from "../components/Loader";

const EMAIL_JS_PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
const EMAIL_JS_SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const EMAIL_JS_TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;

const openSubmitIdeaModalBtn = document.querySelector("[data-open-modal]");
const submitIdeaModal = document.querySelector("[data-submit-idea-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");

const submitIdeaForm = document.querySelector('[data-form="submit-project-idea"]');
const inputs = document.querySelectorAll(".input");
const placeholders = document.querySelectorAll(".placeholder");

emailjs.init({
	publicKey: EMAIL_JS_PUBLIC_KEY,
});

const openSubmitIdeaModal = () => {
	document.body.classList.add("overflow-hidden");
	show(submitIdeaModal, "fade-in", "fade-out");
};

function closeSubmitIdeaModal(e, manual = false) {
	if (!manual) {
		if (e.target.classList.contains("modal") || e.target.closest(".btn-danger")) {
			hide(submitIdeaModal, "fade-in", "fade-out");
			document.body.classList.remove("overflow-hidden");
		}
	} else {
		hide(submitIdeaModal, "fade-in", "fade-out");
		document.body.classList.remove("overflow-hidden");
	}
}

/* ******************************************************************** */

placeholders.forEach((elm) => {
	elm.innerHTML = elm.textContent
		.split("")
		.map((word, index) => `<span style="transition-delay:${index * 10}ms">${word}</span>`)
		.join("");
});

inputs.forEach((input) => {
	input.addEventListener("focus", () => {
		input.nextElementSibling.classList.add("active");
	});

	input.addEventListener("blur", () => {
		if (input.value.trim() === "") {
			input.nextElementSibling.classList.remove("active");
		}
	});
});

/* ******************************************************************** */

function successSubmit() {
	inputs.forEach((inp) => inp.nextElementSibling.classList.remove("active"));
	submitIdeaForm.reset();
	closeSubmitIdeaModal("", true);
	newToast("Your Idea Submitted Successfully", "bg-success");
}

async function submitIdea() {
	const isEmpty = [...inputs].some((inp) => inp.value.trim() === "");

	if (isEmpty) {
		newToast("Pleaes fill out all inputs", "bg-primary-500");
		return;
	}

	const formData = new FormData(submitIdeaForm);
	const data = Object.fromEntries(formData.entries());

	loader(submitIdeaForm, true);

	try {
		await emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, data);
		successSubmit();
	} catch (error) {
		console.error(error.message);
		newToast("Failed to submit", "bg-primary-500");
	} finally {
		loader(submitIdeaForm, false);
	}
}

/* ******************************************************************** */

openSubmitIdeaModalBtn.addEventListener("click", openSubmitIdeaModal);
submitIdeaModal.addEventListener("click", (e) => closeSubmitIdeaModal(e, false));
closeModalBtn.addEventListener("click", (e) => closeSubmitIdeaModal(e, false));
submitIdeaForm.addEventListener("submit", submitIdea);
