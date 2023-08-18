// function processPosts(){
//     let postsContainer = document.querySelector(".fropy");
//     let posts = postsContainer.getElementsByClassName("post");
//     const maxHeight = "400px";
//
//     for (let i = 0; i < posts.length; i++){
//         let post = posts[i];
//
//         let postContent = post.getElementsByClassName("post-content");
//         postContent.style.maxHeight = maxHeight;
//
//         const menuButton = post.getElementById("menuButton");
//         const menu = post.getElementById("menu");
//         menuButton.addEventListener("click", function (){
//             menu.classList.toggle("hidden");
//         });
//     }
//
// }


const postElements = document.querySelectorAll(".post");
const maxHeight = "400px";

postElements.forEach(postElement => {

  const title = postElement.querySelector('.post-title').textContent;
  const postContent = postElement.querySelector(".post-content");
  postContent.style.maxHeight = maxHeight;
  postContent.style.overflow = "hidden";

  const menuButton = postElement.querySelector(".menuButton");
  const menu = postElement.querySelector(".menu");
  menuButton.addEventListener("click", function (){
      menu.classList.toggle("hidden");
  });

  console.log(`Title: ${title}`);
});

