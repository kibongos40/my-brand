let loading = `
	<div class="loader">
		<div class="load"></div>
	</div>
`;

var blog_edit_id = 0;

function blogDelete(index){
	if(!confirm("Do you want to delete this blog?")){
		return "error";
	}
	if("blogs" in localStorage){
		let blogs = JSON.parse(localStorage['blogs']);
		if(blogs.length > index){
			let title = blogs.splice(index,1);
			window.alert(title[0].blog_title + " Deleted successfully");
			localStorage['blogs'] = JSON.stringify(blogs);
		}
	}
	loadBlogs();
}

function editBlog() {
	let blog_id = Number(form.blog_id.value);
	let blog_title = form.blog_title.value;
	let blog_content = form.blog_content.value;
	if ("blogs" in localStorage) {
		let blogs = JSON.parse(localStorage["blogs"]);
		let new_blog = { blog_title: blog_title, blog_content: blog_content };
		blogs[blog_id] = new_blog;
		localStorage["blogs"] = JSON.stringify(blogs);
	}
	loader("blogs");
}

function addBlog() {
	let blog_title = form.blog_title.value;
	let blog_content = form.blog_content.value;
	if("blogs" in localStorage){
		let blogs = JSON.parse(localStorage["blogs"]);
		let new_blog = { blog_title: blog_title, blog_content: blog_content };
		blogs.push(new_blog);
		localStorage["blogs"] = JSON.stringify(blogs);
	}
	else{
		let blogs = [];
		blogs[0] = { "blog_title":blog_title,"blog_content":blog_content};
		localStorage['blogs'] = JSON.stringify(blogs);
	}
	loader('blogs');
}
function blogEdit(n){
	blog_edit_id = n;
	loader('editBlog');
}
function loadBlogs() {
	let bc = document.getElementById("blogs");
	bc.innerHTML = "";
	let i = 0;
	if ("blogs" in localStorage) {
		let blogs = JSON.parse(localStorage["blogs"]);
		console.log(blogs.length);
		if(blogs.length == 0){
			content = `
				<tr>
					<td>No blogs Found</td>
					<td>0</td>
					<td class="actions">
						<button 
							class="buttons" 
							onclick="loader('newBlog')">
							<i class="fa fa-plus"></i> New article</button>
					</td>
				</tr>
			`;
			bc.innerHTML += content;
		}
		else{
			blogs.forEach((element) => {
				let title = element.blog_title;
				content = `
			<tr>
				<td>${title}</td>
				<td>0</td>
				<td class="actions">
					<button onclick="blogEdit(${i})">Edit</button>
					<button onclick="blogDelete(${i})">Delete</button>
				</td>
			</tr>
		`;
				bc.innerHTML += content;
				i++;
			});
		}
	}
	else{
		content = `
		<tr>
			<td>No blogs Found</td>
			<td>0</td>
			<td class="actions">
				<button class="buttons" onclick="loader('newBlog')"><i class="fa fa-plus"></i> New article</button>
			</td>
		</tr>
	`;
	bc.innerHTML += content;
	}
}
async function loader(page) {
	let content = document.getElementById("content");
	let pages = {
		about: "pages/about.html",
		blogs: "pages/blogs.html",
		newBlog: "pages/new-blog.html",
		editBlog: "pages/edit-blog.html"
	};
	let active = {
		about: "about",
		blogs: "blog",
		newBlog: "blog",
		editBlog: "blog"
	};
	let all = document.querySelectorAll(".link");
	all.forEach(item => {
		item.classList.remove("active");
	});
	let al = document.getElementById(active[page]);
	al.classList.add('active');
	let url = pages[page];
	let res = await fetch(url);
	let ans = await res.text();
	content.innerHTML = loading;
	setTimeout(function () {
		content.innerHTML = ans;
			if (page == "blogs") {
				loadBlogs();
			}
			if (page == "editBlog") {
				if ("blogs" in localStorage) {
					let blogs = JSON.parse(localStorage["blogs"]);
					if (blogs.length > blog_edit_id) {
						let blog_title = blogs[blog_edit_id].blog_title;
						let blog_content = blogs[blog_edit_id].blog_content;
						form.blog_title.innerHTML = blog_title;
						form.blog_content.innerHTML = blog_content;
						form.blog_id.value = blog_edit_id;
					}
				}
			}
	}, 1500);
}