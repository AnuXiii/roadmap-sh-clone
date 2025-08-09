import { hide, show } from "./AnimationUtils";

class ProjectController {
	constructor(articles) {
		this.articles = document.querySelectorAll(articles);
		this.previewImage = document.querySelector("[data-project-preview-image]");
		this.categoryListsContainer = document.querySelector("[data-category-lists]");
		this.clearCategoryBtn = document.querySelector("[data-clear-category]");

		this.init();
	}

	init() {
		this.setupCategoryFiltering();
		this.setupArticleHoverEffects();
	}

	setupCategoryFiltering() {
		this.categoryListsContainer.addEventListener("click", (e) => this.getCategory(e));
		this.clearCategoryBtn.addEventListener("click", (e) => this.resetCategory(e));
	}

	setupArticleHoverEffects() {
		this.articles.forEach((card) => {
			card.addEventListener("mouseenter", () => {
				this.setThumbnail(card.dataset.projectImage);
				show(this.previewImage, "fade-in", "fade-out");
			});

			card.addEventListener("mouseleave", () => {
				hide(this.previewImage, "fade-in", "fade-out");
			});

			card.addEventListener("mousemove", (e) => {
				this.previewImage.style.transform = `translate(${e.x - 350}px, ${e.y + 30}px)`;
			});
		});
	}

	getCategory(e) {
		const validTarget = e.target.closest(".category-btn");
		if (!validTarget) return;

		this.categoryListsContainer.querySelector(".active")?.classList.remove("active");
		validTarget.classList.add("active");

		this.sortProjects(validTarget.dataset.category);
		show(this.clearCategoryBtn, "fade-in", "fade-out");
	}

	sortProjects(category) {
		this.articles.forEach((card) => (card.hidden = category !== "all" && card.dataset.projectCategory !== category));
	}

	resetCategory(e) {
		this.categoryListsContainer.querySelector(".active")?.classList.remove("active");
		hide(this.clearCategoryBtn, "fade-in", "fade-out");
		this.sortProjects("all");
		e.stopPropagation();
	}

	setThumbnail(url) {
		this.previewImage.src = url;
	}
}

export default ProjectController;
