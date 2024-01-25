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