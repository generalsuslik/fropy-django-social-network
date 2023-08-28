function main(){
    processPosts();
  }
  
  
function processPosts(){
  const postElements = document.querySelectorAll(".post");

  postElements.forEach(postElement => {

    const postContent = postElement.querySelector(".post-content");
    truncatePost(postContent);
    // addColorToNumber(postElement);
    // changeButtonColor(postElement);

    addMenuButton(postElement);
  });
}


function truncatePost(element) {
  let height = element.offsetHeight;
  if (height > 400) {
    element.style.maxHeight = '400px';
    element.style.overflow = 'hidden';
    // let gradient = 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2) 50px)';
    // element.style.backgroundImage = gradient;
    // element.style.filter = 'brightness(0.7)';
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


//Adding color to total_votes_number
function addColorToNumber(postElement){
  const total_votes_block = postElement.querySelector(".total_votes");
  let total_votes_number = Number(total_votes_block.innerHTML);
  if (Number(total_votes_number) > 0){
    total_votes_block.style.color = 'green';
  }
  else if (Number(total_votes_number) < 0){
    total_votes_block.style.color = 'red';
  }
}


function changeButtonColor(postElement){
  const upvoteButton = postElement.querySelector(".up-vote");
  if (upvoteButton.style.backgroundColor  !== 'green'){
    upvoteButton.style.backgroundColor  = 'green';
  } else {
    upvoteButton.style.backgroundColor  = 'white';
  }
}


export default processPosts;
  