import Toastify from "toastify-js";

function newToast(msg, type) {
	Toastify({
		text: msg,
		duration: 3000,
		gravity: "top",
		position: "left",
		className: type,
	}).showToast();
}

export default newToast;
