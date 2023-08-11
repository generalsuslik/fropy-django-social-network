const optionsButton = document.querySelector('.options-button');
const optionsMenu = document.querySelector('.options-menu');

optionsButton.addEventListener('click', function() {
  optionsMenu.classList.toggle('show');
});

window.addEventListener('click', function(event) {
  if (!event.target.matches('.options-button')) {
    const optionsMenus = document.querySelectorAll('.options-menu');
    for (let i = 0; i < optionsMenus.length; i++) {
      const optionsMenu = optionsMenus[i];
      if (optionsMenu.classList.contains('show')) {
        optionsMenu.classList.remove('show');
      }
    }
  }
});

function votePost(postSlug){
  $.ajax({
        url: '/post/' + postSlug +'/vote/',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            $('#post-' + postSlug + '-likes').text(data.likes);
        }
    });
    return false
}
