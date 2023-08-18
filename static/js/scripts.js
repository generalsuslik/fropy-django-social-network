function processPosts(){
  const postElements = document.querySelectorAll(".post");
  const maxHeight = "400px";

  postElements.forEach(postElement => {

    const postContent = postElement.querySelector(".post-content");
    postContent.style.maxHeight = maxHeight;
    postContent.style.overflow = "hidden";

    const menuButton = postElement.querySelector(".menuButton");
    const menu = postElement.querySelector(".menu");
    menuButton.addEventListener("click", function (){
        menu.classList.toggle("hidden");
    });
  });
}




