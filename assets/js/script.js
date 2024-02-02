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

function myBlogs(){
	let container = document.getElementById("blogs_container");
	if("blogs" in localStorage){
		if(localStorage['blogs'].length > 3){
			let blogs = JSON.parse(localStorage['blogs']);
			blogs.forEach(blog => {
				let item = `
					<div class="blog">
						<div class="picture">
							<img src="${blog.blog_cover}" alt="Project" class="fit-width" />
						</div>
						<div class="details">
							<p class="p-name greener">${blog.blog_title}</p>
							<p class="p-desc">
								${blog.blog_desc}
							</p>
						</div>
						<div class="visit">
							<a href="blog.html?id=${blog.blog_id}" rel="noopener noreferrer">Read More
								&nbsp;<i class="fa fa-arrow-right"></i></a>
						</div>
					</div>
				`;
				container.innerHTML += item;
			});
		}
		else{
			container.innerHTML = "<h2 class='greener'>There are no blogs, come back later</h2>";
		}
	}
}

function getBlog() {
	let title = document.getElementById("blog_title");
	let content = document.getElementById("blog_content");
	let found = false;
	if (typeof(id) == undefined) {
		window.location = "blogs.html";
	} else {
		let blogs = JSON.parse(localStorage["blogs"]);
		blogs.forEach((blog) => {
			if (blog.blog_id == id) {
				found = true;
				title.innerHTML = blog.blog_title;
				content.innerHTML = blog.blog_content;
			}
		});
	}
	if(!found){
		window.location = 'blogs.html';
	}
}
function getComments(id){
	if ("comments" in localStorage && localStorage['comments'].length > 3) {
		let allComments = JSON.parse(localStorage['comments']);
		let container = document.getElementById("comments");
		allComments.forEach(comment => {
			if(comment.blog_id == id && comment.approved){
				item = `
					        <div class="comment">
                                <strong class="green">${comment.name}</strong>
                                <p>
									${comment.comment}
                                </p>
                            </div>
				`;
				container.innerHTML += item;
			}
		});
	}
}

// Projects

function myProjects() {
	let container = document.getElementById("projects");
	container.innerHTML = "";
	if ("projects" in localStorage) {
		if (localStorage["projects"].length > 3) {
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
		}
	}
}