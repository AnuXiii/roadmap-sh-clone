import "./components/IframeMode";
import newToast from "./components/Toast";
import "./utils/FormController";
import ProjectController from "./utils/ProjectController";

const URL = "/src/data/projects.json";
const cards = document.querySelector("[data-grid-layout]");

async function getProjects() {
	cards.innerHTML = "";

	const res = await fetch(URL);
	const projects = await res.json();

	try {
		if (!res.ok) {
			newToast("Failed to get Projects", "bg-primary-500");
			return;
		}

		if (projects.length) return projects;
	} catch (error) {
		console.log(error.message);
		newToast("Failed to load Projects", "bg-primary-500");
	}
}

async function initProjects() {
	const projects = await getProjects();

	const html = projects
		.map(({ id, title, thumbnail, preview, difficulty, badges, description, repository }) => {
			return /*html*/ `
            			<article
						
                                data-project="${id}"
								data-project-title="${title}"
                                data-project-image="${thumbnail}"
								data-project-preview="${preview}"
								data-project-category="${difficulty}"
								role="tabpanel"
								tabindex="0"
								class="card fade-in">
								<header class="card-header">
									<span
										data-difficulty="${difficulty}"
										class="card-badge"
										>${difficulty}</span
									>
									<div class="project-techs">
                                        ${badges
																					.map(
																						(badge) => /*html*/ `
                                           <span class="card-badge card-badge--tech">${badge}</span>
                                            `,
																					)
																					.join("")}
									</div>
								</header>

								<div class="card-info">
									<h3 class="card-title">${title}</h3>
									<p class="card-desc">
										${description}
									</p>
								</div>

								<footer class="card-footer">
									<div data-btn-holder>
										<a
                                            href="${repository}"
                                            target="_blank"
											aria-label="open project on frame"
											class="btn-primary">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="lucide lucide-github-icon lucide-github">
												<path
													d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
												<path d="M9 18c-4.51 2-5-2-7-2" />
											</svg>
										</a>
									</div>
									<div data-btn-holder>
										<a
                                            href="${preview}"
                                            target="_blank"
											aria-label="open project on frame"
											class="btn-primary">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
												<path d="M7 7h10v10" />
												<path d="M7 17 17 7" />
											</svg>
										</a>
									</div>
								</footer>
						</article>
        `;
		})
		.join("");

	cards.innerHTML = html;
}

await initProjects();

/* ************************************************************************* */

new ProjectController("[data-grid-layout] article");
