"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let loading = `
	<div class="loader">
		<div class="load"></div>
	</div>
`;

async function blogDelete(id){
    let token = sessionStorage["token"];
    if(confirm("Are you sure to delete this article?")){
        let req = await fetch("https://kibongo.com/api/v1/blogs/"+id,{
            method: 'delete',
            headers:{
                "Authorization": `Beaer ${token}`
            }
        });
        let res = await req.json();
        if(res.status == 'success'){
            loader("blogs");
        }
        else{
            window.alert("Try again please");
        }
    }
}
async function commentDelete(id) {
	let token = sessionStorage["token"];
	if (confirm("Are you sure to delete this comment?")) {
		let req = await fetch("https://kibongo.com/api/v1/comments/" + id, {
			method: "delete",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let res = await req.json();
		if (res.status == "success") {
			loader("comments");
		} else {
			window.alert("Try again please");
		}
	}
}
async function messageDelete(id) {
	let token = sessionStorage["token"];
	if (confirm("Are you sure to delete this message?")) {
		let req = await fetch("https://kibongo.com/api/v1/messages/" + id, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let res = await req.json();
		if (res.status == "success") {
			loader("messages");
		} else {
			console.log(res)
		}
	}
}
async function commentToggle(id) {
	let token = sessionStorage["token"];
	if (confirm("Are you sure to toggle this comment?")) {
		let req = await fetch("https://kibongo.com/api/v1/comments/" + id, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let res = await req.json();
		if (res.status == "success") {
			loader("comments");
		} else {
			window.alert("Try again please");
		}
	}
}
async function loadComments() {
	let container = document.getElementById("comment");
	let token = sessionStorage["token"];
	let req = await fetch("https://kibongo.com/api/v1/comments");
	let res = await req.json();
	if (res.status == "success") {
		let comments = res.message;
		comments.forEach((comment) => {
            let item = `
				<tr>
					<td>
					<i 
						class="${comment.approved ? "greener" : "red"} 
						fa fa-${comment.approved ? "check" : "x"}"></i> ${comment.userName}
						<br>
						<br>
						<strong>On:</strong> Not implemented yet
					</td>
					<td>${comment.comment}</td>
					<td class="actions">
						<button onclick="commentToggle('${comment._id}')">${
							comment.approved ? "Deny" : "Approve"
						}</button>
						<button onclick="commentDelete('${comment._id}')" class="delete">Delete</button>
					</td>
				</tr>
			`;
			container.innerHTML += item;
		});
        if(comments.length == 0){
                let one = `
					<tr>
						<td>
                            No comments yet Sir, your blogs aren't interesting
						</td>
						<td>
						</td>
						<td>
						</td>
					</tr>`;
								container.innerHTML += one;
        }
	}
}

function blogEdit(id){
	localStorage['edit'] = id;
	loader('editBlog');
}

async function loadBlogs() {
    let container = document.getElementById("blogs");
    let token = sessionStorage['token'];
    let req = await fetch("https://kibongo.com/api/v1/blogs");
    let res = await req.json();
    if(res.status == 'success'){
        let blogs = res.message;
        blogs.forEach(blog => {
            let content = `
                <tr>
                    <td>${blog.title}</td>
                    <td>${blog.createdAt.substring(0, 10)}</td>
                    <td class="actions">
                        <button onclick="blogEdit('${blog._id}')">Edit</button>
                        <button class="delete" onclick="blogDelete('${
													blog._id
												}')">Delete</button>
                    </td>
                </tr>
            `;
            container.innerHTML += content;
        })
        if (blogs.length == 0) {
					let one = `
					<tr>
						<td>
                            No blogs yet, create one Sir
						</td>
						<td>
						</td>
						<td>
						</td>
					</tr>`;
					container.innerHTML += one;
        }
    }
	console.log(res);
}
async function loadMessages() {
	let container = document.getElementById("message");
	let token = sessionStorage["token"];
	let req = await fetch("https://kibongo.com/api/v1/messages",{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
	let res = await req.json();
	if (res.status == "success") {
		let messages = res.message;
		messages.forEach((message) => {
                let one = `
					<tr>
						<td>
							${message.name}
						</td>
						<td>
							${message.email}
						</td>
						<td>
							${message.message}
						</td>
						<td class="actions">
							<button onclick="messageDelete('${message._id}')" class="delete">Delete</button>
						</td>
					</tr>`;
			container.innerHTML += one;
		});
    }
        if(res.status == "fail"){
                let one = `
					<tr>
						<td>
							No messages yet, no spammers Sir
						</td>
						<td>
						</td>
						<td>
						</td>
						<td>
						</td>
					</tr>`;
                container.innerHTML += one;
        }
}

async function loadBlog(){
	let id = localStorage['edit'];
	let form = editBlogForm;
	form.title.value = "Loading...";
	form.description.value = "Loading...";
	form.content.value = "Loading...";
	form.id.value = id;
	let req = await fetch("https://kibongo.com/api/v1/blogs/"+id);
	let res = await req.json();
	if(res.status == 'success'){
		form.title.value = res.message.title;
		form.description.value = res.message.description;
		form.content.value = res.message.content;
	}
	console.log(res);
}

function loader(page, timer = 1500) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = document.getElementById("content");
        let pages = {
            about: "pages/about.html",
            blogs: "pages/blogs.html",
            newBlog: "pages/new-blog.html",
            editBlog: "pages/edit-blog.html",
            messages: "pages/messages.html",
            comments: "pages/comments.html",
            projects: "pages/projects.html",
            newProject: "pages/new-project.html",
        };
        let active = {
            about: "about",
            blogs: "blog",
            newBlog: "blog",
            editBlog: "blog",
            messages: "messages",
            comments: "comments",
            projects: "mywork",
            newProject: "mywork",
        };
        let all = document.querySelectorAll(".link");
        all.forEach((item) => {
            item.classList.remove("active");
        });
        let al = document.getElementById(active[page]);
        al.classList.add("active");
        let date = new Date();
        let url = pages[page] + "?cache=" + date.getTime();
        let res = yield fetch(url);
        let ans = yield res.text();
        content.innerHTML = loading;
        setTimeout(function () {
            content.innerHTML = ans;
            page == "blogs" ? loadBlogs() : 0;
            page == "newBlog" ? editor() : 0;
            page == "messages" ? loadMessages() : 0;
            page == "comments" ? loadComments() : 0;
            page == "projects" ? loadProjects() : 0;
            if (page == "editBlog") {
				loadBlog();
            }
        }, timer);
    });
}

// Adding a blog

async function addBlog(){
    let token = sessionStorage['token'];
    let form = newBlogForm;
    let title = form.title.value;
    let description = form.description.value;
    let picture = form.picture.files[0];
    let content = form.content.value;
	let formData = new FormData();
	console.log(title)
	formData.append("title", title);
	formData.append("description", description);
	formData.append("picture", picture);
	formData.append("content", content);
    let send = await fetch("https://kibongo.com/api/v1/blogs/",{
		method: 'POST',
        headers:{
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
    let res = await send.json();
	if(res.status == "success"){
		loader('blogs');
	}
	if(res.status == "fail"){
		window.alert(res.message);
	}
}
async function editBlog() {
	let token = sessionStorage["token"];
	let form = editBlogForm;
	let id = form.id.value;
	let title = form.title.value;
	let description = form.description.value;
	let picture = form.picture.files[0];
	let content = form.content.value;
	let formData = new FormData();
	console.log(title);
	formData.append("title", title);
	formData.append("description", description);
	formData.append("picture", picture);
	formData.append("content", content);
	let send = await fetch("https://kibongo.com/api/v1/blogs/"+id, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});
	let res = await send.json();
	if (res.status == "success") {
		loader("blogs");
	}
	if (res.status == "fail") {
		window.alert(res.message);
	}
}

// Editor

        function editor() {
					$(".summernote").summernote({
						placeholder: "Blog content goes here",
						tabsize: 2,
						height: 120,
						toolbar: [
							["style", ["style"]],
							["font", ["bold", "underline", "clear"]],
							["color", ["color"]],
							["para", ["ul", "ol", "paragraph"]],
							["table", ["table"]],
							["insert", ["link", "picture", "video"]],
							["view", ["fullscreen", "codeview", "help"]],
						],
					});
				}