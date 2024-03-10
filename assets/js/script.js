function showLoader() {
	let loader = document.getElementById("loader");
	loader.classList.toggle("visible");
}
var counter = 0;
function loginpage(n){
	counter += n;
	console.log(counter);
	if(counter == -9){
		window.location = 'secure-login.html';
	}
}

let hidden = document.getElementById("hidden");
let brand = document.getElementById("brand");

if(hidden != null){
	hidden.addEventListener("dblclick", function (e) {
		loginpage(-3);
	});
}
if (brand != null) {
	brand.addEventListener("click", function (e) {
		window.location = '.';
	});
}

// Projects

function myProjects() {
	let container = document.getElementById("projects");
	container.innerHTML =
		"<h3 class='align-center'><i style='font-size: 30px' class='fa fa-robot'></i><br><br>No projects available yet</h3>";
	if ("projects" in localStorage) {
		/* if (localStorage["projects"].length > 3) {
			let projects = JSON.parse(localStorage["projects"]);
			projects.forEach((item) => {
				let project = `
					<div class="project">
						<div class="picture">
							<img src="${item.project_cover}" alt="Project" class="fit-width" />
						</div>
						<div class="details">
							<p class="p-name greener">${item.project_name}</p>
							<div class="p-desc">
								${item.project_desc}
							</div>
						</div>
						<div class="visit">
							<a href="${item.external_link}" target="_blank" rel="noopener noreferrer">Visit Project
								&nbsp;<i class="fa fa-arrow-right"></i></a>
						</div>
					</div>
				`;
				container.innerHTML += project;
			});
		} else {
			container.innerHTML =
				"<h2 class='greener'>There are no projects to visit, come back later</h2>";
		}*/
	}
}