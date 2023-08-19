function processPosts(){
  const postElements = document.querySelectorAll(".post");

  postElements.forEach(postElement => {

    const postContent = postElement.querySelector(".post-content");
    truncatePost(postContent)

    addMenuButton(postElement);
  });
}


function truncatePost(element) {
  let height = element.offsetHeight;
  if (height > 400) {
    element.style.maxHeight = '400px';
    element.style.overflow = 'hidden';
    let gradient = 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 350px)';
    element.style.backgroundImage = gradient;
  }
}


// Adding menu ... button to post
function addMenuButton(postElement){
  const menuButton = postElement.querySelector(".menuButton");
  const menu = postElement.querySelector(".menu");
  menuButton.addEventListener("click", function (){
        menu.classList.toggle("hidden");
    });
}



