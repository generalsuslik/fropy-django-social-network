// menu ... button
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function (){
    menu.classList.toggle("hidden")
});


//Cutting post content if it's height > 400px
const fropy = document.querySelector(".fropy");
const postContent = document.querySelector(".post-content");
const maxHeight = "400px";
postContent.style.maxHeight = maxHeight;



